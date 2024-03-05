import {useState} from "react";

import UserContext from "./UserContext";

const UserContextProvider = ({children}) => {
    const [profile,setProfile] = useState({
        user:{},
        token:'',
    })
    return(
        <UserContext.Provider value={{profile, setProfile}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider