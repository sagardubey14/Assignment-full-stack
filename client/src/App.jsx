import axios from 'axios'
import SignUpForm from './Components/SignupForm';
import { Link, Route, Routes } from 'react-router-dom'
import LoginForm from './Components/LoginForm';
import Posts from './Components/Posts';
import Home from './Components/Home';
import UserContextProvider from './Context/UserContextProvider';


function App() {
  const handleClick = ()=>{
    axios.get('http://localhost:3001/')
    .then(res=>{
      console.log(res);
    }
    )
    .catch(err=>{
      console.log(err);
    }

    )
  }
  return (
    <UserContextProvider>
      hello
      <button onClick={handleClick}>Call to server</button>
      <nav>
      <ul>
        <li>
        <Link to='/signup'>Signup</Link>
        </li>
        <li>
        <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
      <Routes>
      <Route path='/' element={<Home />}/>
        <Route path='/posts' element={<Posts />}/>
        <Route path='/signup' element={<SignUpForm />}/>
        <Route path='/login' element={<LoginForm />}/>
      </Routes>
    </UserContextProvider>
  )
}

export default App
