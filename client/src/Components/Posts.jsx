import axios from "axios"
import UserContext from "../Context/UserContext"
import { useContext, useEffect, useState   } from "react"


const Posts = ()=> {
  const {profile} = useContext(UserContext)
  const [content,setContent] = useState("")
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const createPost =async ()=>{
    const headers = {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${profile.token}` 
    };
    console.log('button');
    await axios.post("http://localhost:3001/posts",{content},{headers})
    .then(res=>{
      console.log(res);
      setData(prevData => [...prevData,res.data.post])
    })
    .catch(err=>{console.log(err);})

    setContent("")
    
  }
  useEffect(()=>{
    const headers = {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${profile.token}` 
    };
    console.log(headers['authorization']);
    const fetchData = async ()=>{
        axios.get('http://localhost:3001/posts/',{headers})
        .then(res=>{
          setData(res.data)
          setLoading(false)
        })
        .catch(err=>{
          setError(err)
          setLoading(false)
        })
        
    }
    fetchData();
  },[])

  if(loading){
    return <div>Loading......</div>
  }
  if(error){
    return <div>{error}</div>
  }
  return (
    <div>
      POSTS
      {" "}
      <ul>
      {
       data.map(d =><li key={d._id}>{d.content}</li>) 
      }
      </ul>
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
