import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useContext, useState } from 'react'
import UserContext from '../Context/UserContext';
import {  validatePassword } from '../utils/validation';
import axios from 'axios';

function Profile() {
  const { profile} = useContext(UserContext)
  const [pass, setPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [passErr, setPassErr] = useState('')

  async function updatePassword(){
    if(check()){
    const {email} = profile.user
    await axios.post("http://localhost:3001/updpass",{email,pass,newPass})
      .then(res=>{
        console.log(res);
        toast.success("Password has been updated", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        setNewPass("")
        setPass("")
      })
      .catch(error=>{
        if (error.response && error.response.status === 400 && error.response.data === "Invalid password") {
          toast.error('Invalid password', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
        console.log(error);
      })
    }
    else{
        console.log('pass lenght');
    }

  }

  function check(){
    if (!validatePassword(newPass)) {
        console.error('Password must be at least 8 characters long');
        setPassErr('Password must be at least 8 characters long')
        return false;
    }
    return true
  }
  return (
    <div className="flex flex-col justify-center items-center mt-10">
        <div className="w-full max-w-md p-4 sm:p-8 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Profile Page</h1>
            <div className="mt-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Profile</h2>
                <div className="mt-4">
                    <label className="block text-sm sm:text-base font-medium text-gray-600">Username:</label>
                    <p className="mt-1 text-sm sm:text-base text-gray-900">{profile.user.username}</p>
                </div>
                {profile.user.name && (
                    <div className="mt-4">
                        <label className="block text-sm sm:text-base font-medium text-gray-600">Name:</label>
                        <p className="mt-1 text-sm sm:text-base text-gray-900">{profile.user.name}</p>
                    </div>
                )}
                <div className="mt-4">
                    <label className="block text-sm sm:text-base font-medium text-gray-600">Email:</label>
                    <p className="mt-1 text-sm sm:text-base text-gray-900">{profile.user.email}</p>
                </div>
            </div>
        </div>
        <div className="flex flex-col mt-8 sm:mt-2 ">
            <input
                type="password"
                name="title"
                value={pass}
                onChange={e=>setPass(e.target.value)}
                placeholder="Current Password"
                className=" w-screen max-w-md px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-400 placeholder-gray-500"
            />
            <input
                type="password"
                name="content"
                value={newPass}
                onChange={e=>setNewPass(e.target.value)}
                placeholder="New Password"
                className="w-full max-w-md px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-400 placeholder-gray-500"
            />
            {[passErr] && <p className=" text-red-500 text-sm">{passErr}</p>}
            <button onClick={updatePassword} className="w-full max-w-md px-4 py-2 text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Update Password</button>
        </div>
    </div>





  )
}

export default Profile
