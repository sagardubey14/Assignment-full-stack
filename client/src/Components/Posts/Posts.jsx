import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import UserContext from "../../Context/UserContext"
import { useContext, useEffect, useState   } from "react"
import { validateTitle, validateContent } from '../../utils/validation';
import {Route, Routes, useNavigate} from 'react-router-dom'
import Header from "./Header";
import PostList from "./PostList";
import Profile from "../Profile";


const Posts = ()=> {
  const navigate = useNavigate()
  const [pageNumber,setPageNumber] = useState(1)
  const {profile, setProfile} = useContext(UserContext)
  const [content,setContent] = useState("")
  const [title,setTitle] = useState("")
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  const headers ={
    'sesID':profile.sesID
  }
  
  const createPost =async ()=>{

    if (validatePost()) {
      await axios.post("http://localhost:3001/posts",{title,content},{headers})
      .then(res=>{
        toast.success(`Post has been Created`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
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
    setTitle("")
    
  }

  const logOut= ()=>{
    axios.post('http://localhost:3001/auth/logout')
    .then(res =>{
      toast.success(`Logged Out`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      console.log(res.data);
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
        axios.get(`http://localhost:3001/posts?page=${pageNumber}&pageSize=5`,{headers})
        .then(res=>{
          setData(prev => [...prev,...res.data.arr])
          setLoading(false)
          console.log(data);
        })
        .catch(err=>{
          setError(err)
          setLoading(false)
        })
        
    }
    if(profile.sesID == ''){
      // alert("not Allowed")
      navigate("/login")
    }
    else{
      fetchData();
    }
    
  },[pageNumber])

  const handleScroll = ()=>{
    // console.log(document.documentElement.scrollHeight);
    // console.log(document.documentElement.scrollTop);
    // console.log('Height: ',window.innerHeight);

    if(
      window.innerHeight + document.documentElement.scrollTop +1 >=
      document.documentElement.scrollHeight
    ){
      setPageNumber(prev=>prev+1)
    }
  }


  return (
    <div>
      <Header profile={profile} logOut={logOut} />
      <Routes>
        <Route path='/' element={<PostList data={data} setLoading={setLoading} handleScroll={handleScroll }title={title} setTitle={setTitle} createPost={createPost} content={content} setContent={setContent} />}/>
        <Route path='/profile' element={<Profile />}/>
      </Routes>
      
      {loading && <p className="text-gray-500 font-semibold text-lg mt-4 text-center">Loading....</p>}
      </div>
  )
}

export default Posts
