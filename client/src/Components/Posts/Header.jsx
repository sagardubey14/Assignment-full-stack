import { Link, useNavigate } from 'react-router-dom';
import pfp from '../../assets/pfp.jpg'
import { useState } from 'react';


const Header = ({ profile, logOut }) => {
  const navigate = useNavigate()
  const [menuVisible, setMenuVisible] = useState(false);

  const handleImage = ()=>{
    navigate("/posts/profile")
  }

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (    
<nav className="bg-gray-800 pt-0.5">
      <div className="ml-3 max-w-7xl px-2 sm:px-6 lg:px-0">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center">
          <ul className="hidden sm:flex sm:space-x-2">
            <li>
            {profile.user.pfp === '' ? <img onClick={handleImage} src={pfp} className="inline-block h-12 w-12 rounded-full ring-2 ring-white"></img> : <img onClick={handleImage} className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src={profile.user.pfp} width="150" height="150" />}
            </li>
            <li>
              <Link to="/posts" className="inline-block h-12 w-max bg-slate-700 px-3 pt-3 rounded-md text-white hover:bg-gray-700">Posts</Link>
            </li>
            <li>
              <button onClick={logOut} className="inline-block h-12 w-max bg-slate-700 px-3 py-2 rounded-md text-white hover:bg-gray-700">Logout</button>
            </li>
          </ul>
          <button onClick={toggleMenu} type="button" className="sm:hidden bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          </div>
        </div>
      </div>
      {menuVisible && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 flex  flex-col ">
            {profile.user.pfp === '' ? <img onClick={handleImage} src={pfp} className="inline-block h-12 w-12 rounded-full ring-2 ring-white"></img> : <img onClick={handleImage} className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src={profile.user.pfp} width="150" height="150" />}
            <Link to="/posts" className="inline-block h-10 w-full bg-slate-700 px-3 py-2 rounded-md text-white hover:bg-gray-700">Posts</Link>
            <button onClick={logOut} className=" text-left inline-block h-10 w-full bg-slate-700 px-3 py-2 rounded-md text-white hover:bg-gray-700">Logout</button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header;
