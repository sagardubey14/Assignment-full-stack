import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        <Route path='/posts/*' element={<Posts />}/>
        <Route path='/signup' element={<SignUpForm />}/>
        <Route path='/login' element={<LoginForm />}/>
        <Route path='/' element={<Home />}/>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </UserContextProvider>
  )
}

export default App
