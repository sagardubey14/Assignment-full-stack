import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/validation';
import axios from 'axios'
import UserContext from '../Context/UserContext';

const SignUpForm = () => {
  const navigate = useNavigate()
  const {setProfile} = useContext(UserContext)
  
  const [formData, setFormData] = useState({
    name:'',
    username:'',
    email: '',
    password: '',
    confirmPassword: '',
    pfp:'',
  });

  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.pfp);
    // Validate form data before submitting
    if (validateForm()) {
      try {
        const { name, username, email, password, pfp } = formData;

        // Create a new FormData object
        const formData1 = new FormData();
        formData1.append('name', name);
        formData1.append('username', username);
        formData1.append('email', email);
        formData1.append('password', password);
        formData1.append('pfp', pfp);
        const response = await axios.post('http://localhost:3001/auth/signup' , formData1,{
          headers:{
            'Content-Type': 'multipart/form-data'
          }
        })
        const {user,sesID} = response.data
        setProfile({user,sesID})
        navigate("/posts")
      } catch (error) {
        console.log(error);
      }
    }
    else{
      console.log('not good');
    }
  };

  const validateForm = () => {
    const { email, password, confirmPassword } = formData;
    // Perform validation checks using the utility functions
    if (!validateEmail(email)) {
      console.error('Invalid email address');
      return false;
    }
    if (!validatePassword(password)) {
      console.error('Password must be at least 8 characters long');
      return false;
    }
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return false;
    }
    return true;
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-blue-900 to-purple-900 h-auto mb-0">
    <form onSubmit={handleSubmit} className="w-full max-w-md m-1 p-6 bg-white rounded-lg shadow-md">
      <h2 className="mt-2 text-base font-semibold leading-7 text-gray-900">Profile</h2>
      <p className="text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="block w-full my-5 px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out hover:border-indigo-500 hover:ring-indigo-500"
      />
      <label className="block text-sm font-medium leading-6 text-gray-900">Username</label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        className="block w-full my-5 px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out hover:border-indigo-500 hover:ring-indigo-500"
      />
      <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="block w-full my-5 px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out hover:border-indigo-500 hover:ring-indigo-500"
      />
      <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="block w-full my-5 px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out hover:border-indigo-500 hover:ring-indigo-500"
      />
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        className="block w-full my-5 px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out hover:border-indigo-500 hover:ring-indigo-500"
      />
      <label className="block text-sm font-medium leading-6 text-gray-900">
      Upload Profile Picture
      </label>
      <div 
      className="block w-full my-5 px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out hover:border-indigo-500 hover:ring-indigo-500"
      >
        <input
          type="file"
          id="file"
          name="pfp"
          onChange={(e)=>setFormData({
            ...formData,
            [e.target.name]: e.target.files[0],
          })}
          accept="image/*"
          multiple={false}
          className="appearance-none w-full px-3 py-2 focus:outline-none focus:border-indigo-500 text-gray-700"
        />
      </div>
      
      <div className="flex items-start">
          <div className="flex items-center h-5">
            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
          </div>
          <div className="ml-3 text-sm">
            <label className="text-sm font-medium leading-6 text-gray-900">Terms and conditions</label>
          </div>
      </div>

      <button type="submit" className="mt-5 bg-indigo-500 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
        Sign Up
      </button>
    </form>
    </div>
  );
};

export default SignUpForm;
