import {useState} from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children}) => {
    const [profile,setProfile] = useState({
        user:{
            name:'',
            username:'',
            email:'',
            pfp:''
        },
        sesID:'',
    })
    return(
        <UserContext.Provider value={{profile, setProfile}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider