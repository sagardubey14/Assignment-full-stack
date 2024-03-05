import { useContext } from "react"
import UserContext from "../Context/UserContext"


function Home() {
  const {profile,setProfile} = useContext(UserContext)
  return (
    <div>
      Welcome to our Post website.
      {JSON.stringify(profile.user)}
      {profile.token}
      {" "}
      <button onClick={()=>setProfile({user:{id:1,name:'sagar'},token:'sagar'})}>context</button>
    </div>
  )
}

export default Home
