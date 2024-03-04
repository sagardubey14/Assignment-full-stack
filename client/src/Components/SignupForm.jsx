import { useState } from 'react';
import { validateEmail, validatePassword } from '../utils/validation';
import axios from 'axios'

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username:'',
    email: '',
    password: '',
    confirmPassword: '',
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
        const {username, email, password } = formData
        const response = await axios.post('http://localhost:3001/auth/signup' , {username, email, password})
        console.log(response);
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
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Name"
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
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
