
import SignUpForm from './Components/SignupForm';
import { Route, Routes } from 'react-router-dom'
import LoginForm from './Components/LoginForm';
import Posts from './Components/Posts/Posts';
import Home from './Components/Home/Home';
import UserContextProvider from './Context/UserContextProvider';



function App() {
  return (
    <UserContextProvider>
      {/* hello
      <button onClick={handleClick}>Call to server</button> */}
      <Routes>
        <Route path='/posts' element={<Posts />}/>
        <Route path='/signup' element={<SignUpForm />}/>
        <Route path='/login' element={<LoginForm />}/>
        <Route path='/' element={<Home />}/>
      </Routes>
    </UserContextProvider>
  )
}

export default App
