
import { useState,useContext } from 'react';
import { validateEmail, validatePassword } from '../utils/validation';
import axios from 'axios'
import UserContext from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const navigate = useNavigate()
  const { setProfile} = useContext(UserContext)
  const [formData, setFormData] = useState({
    email: 'first@gmail.com',
    password: '12345678',
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
    const { email, password } = formData;
    // Perform validation checks using the utility functions
    if (!validateEmail(email)) {
      console.error('Invalid email address');
      return false;
    }
    if (!validatePassword(password)) {
      console.error('Password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
