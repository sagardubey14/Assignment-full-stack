import axios from "axios"
import UserContext from "../Context/UserContext"
import { useContext, useEffect, useState   } from "react"
import { validateTitle, validateContent } from '../utils/validation';
import '../Styles/pagination.css'
import {useNavigate} from 'react-router-dom'


const Posts = ()=> {
  const navigate = useNavigate()
  const [pageNumber,setPageNumber] = useState(1)
  const {profile, setProfile} = useContext(UserContext)
  const [content,setContent] = useState("")
  const [title,setTitle] = useState("")
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const headers ={
    'sesID':profile.sesID
  }
  
  const createPost =async ()=>{

    if (validatePost()) {
      await axios.post("http://localhost:3001/posts",{title,content},{headers})
      .then(res=>{
        if(data.length==5){
          console.log('The page size is not enough');
        }
        else{
          setData(prevData => [...prevData,res.data.post])
        }
      })
      .catch(err=>{console.log(err);})
    }
    else{
      console.log('not good');
    }
    setContent("")
    
  }

  const logOut= ()=>{
    axios.post('http://localhost:3001/auth/logout')
    .then(res =>{
      alert(res.data);
      setProfile({user:{
          name:'',
          username:'',
          email:'',
          pfp:''
      },
      sesID:'',})
      navigate("/")
    })
    .catch(err =>{
      console.error(err);
    })
  }

  function validatePost(){
    if (!validateTitle(title)) {
      console.error('Please enter the title');
      return false;
    }
    if (!validateContent(content)) {
      console.error('Content should not be empty');
      return false;
    }
    return true;
  }

  useEffect(()=>{
    const fetchData = async ()=>{
        axios.get(`http://localhost:3001/posts?page=${pageNumber}`,{headers})
        .then(res=>{
          setData(res.data.arr)
          setLoading(false)
        })
        .catch(err=>{
          setError(err)
          setLoading(false)
        })
        
    }
    if(profile.sesID == ''){
      alert("not Allowed")
      navigate("/")
    }
    else{
      fetchData();
    }
    
  },[pageNumber])


  return (
    <div>
      POSTS
      {
        <div>
        <label>{profile.user.name}</label><br />
        <label>{profile.user.username}</label>
        </div>
      }
      <button onClick={()=>logOut()}>Logout</button>
      {
        loading?
        <div>Loading......</div>:
        error?<div>{error}</div>:
        <div className="pagination">
        <ul>
        {
         data.map(d =><li key={d._id}>{d.content}</li>) 
        }
        </ul>
        <button id="prevPage" onClick={()=>setPageNumber(prevData=> prevData-1)}>Previous Page</button>
        <span id="currentPage">Page 1</span>
        <button id="nextPage" onClick={()=>setPageNumber(prevData=> prevData+1)}>Next Page</button>
      </div>
      }
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        name="content"
        value={content}
        onChange={(e)=>setContent(e.target.value)}
        placeholder="Content"
      />
      <button onClick={createPost}>Submit</button>
    </div>
  )
}

export default Posts
