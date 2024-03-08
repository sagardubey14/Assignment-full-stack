import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState,useContext } from 'react';
import { validateEmail, validatePassword } from '../utils/validation';
import axios from 'axios'
import UserContext from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import login from '../assets/login.svg'


const LoginForm = () => {
  const navigate = useNavigate()
  const { setProfile} = useContext(UserContext)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data before submitting
    if (validateForm()) {
      try {
        const { email, password } = formData
        const response = await axios.post('http://localhost:3001/auth/signin' , {email, password})
        const {user,sesID} = response.data
        setProfile({user,sesID})
        toast.success(`Welcome ${user.email}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        navigate("/posts")
      } catch (error) {
          if (error.response && error.response.status === 404 && error.response.data === "User not found") {
            // Display error message to the user using react-toastify
            toast.error('User not found', {
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
          if (error.response && error.response.status === 400 && error.response.data === "Invalid password") {
            toast.error('Invalid password', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          }
          else {
            console.log('An error occurred:', error.message);
          }
      }
    }
    else{
      console.log('Form validation failed');
      setTimeout(() => {
        setFormErrors({
          email: '',
          password: '',
          confirmPassword: '',
        });
      }, 3000)
    }
  };


  const validateForm = () => {
    const { email, password } = formData;
    // Perform validation checks using the utility functions
    let isValid = true;
    if (!validateEmail(email)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email address',
      }));
      isValid = false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: '',
      }));
    }

    if (!validatePassword(password)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password must be at least 8 characters long',
      }));
      isValid = false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: '',
      }));
    }
    return isValid
  };

  return (
    <div className='flex flex-col sm:grid grid-cols-2 y-20 sm:m-48 sm:my-10 ' >
    <form onSubmit={handleSubmit} className=' justify-center mt-20 sm:my-auto sm:ml-88 grid'>
      <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="block w-full h-9 px-4 sm:my-3 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out hover:border-indigo-500 hover:ring-indigo-500"
      />
      {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
      <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="block w-full sm:my-3 h-9 px-4 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out hover:border-indigo-500 hover:ring-indigo-500"
      />
      {formErrors.password && <p className=" text-red-500 text-sm">{formErrors.password}</p>}
      <button type="submit" className="mt-5 h-10 bg-indigo-500 text-white font-semibold  px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">Login</button>
    </form>
    <img src={login} className='mx-auto my- sm:mr-28'></img>
    </div>
  );
};

export default LoginForm;
