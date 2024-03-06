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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
      />
      <label htmlFor="file">Upload images</label>
      <input
        type="file"
        name="pfp"
        onChange={(e)=>setFormData({
          ...formData,
          [e.target.name]: e.target.files[0],
        })}
        accept="image/*"
        multiple
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
