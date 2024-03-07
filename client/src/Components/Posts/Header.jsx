import { Link } from 'react-router-dom';
import pfp from '../../assets/pfp.jpg'
import { useState } from 'react';


const Header = ({ profile, logOut }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <>
    <nav className="bg-black text-white grid grid-cols-12">
      <Link to="/posts" className="px-3 py-2 bg-slate-700 rounded-md text-white hover:bg-gray-700">Posts</Link>
      <Link to="/profile" className="px-3 py-2 col-start-2 col-end-3 bg-slate-700 px-3 py-2 rounded-md text-white hover:bg-gray-700">Profile</Link>
      <button onClick={logOut} className="col-start-12 col-end-13 bg-slate-700 px-3 py-2 rounded-md text-white hover:bg-gray-700">Logout</button>
    </nav>
    {/* <div className="ml-3 max-w-7xl px-2 sm:px-6 lg:px-0">
      <div className="relative flex h-16 items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center">
        <ul className="hidden sm:grid sm:grid-cols-12 ">
          <li>
            <Link to="/posts" className="col-start-1 col-end-2 bg-slate-700 px-3 py-2 rounded-md text-white hover:bg-gray-700">Posts</Link>
          </li>
          <li>
            <Link to="/profile" className="col-start-2 col-end-3 bg-slate-700 px-3 py-2 rounded-md text-white hover:bg-gray-700">Profile</Link>
          </li>
          <li>
            <button onClick={logOut} className="col-start-12 col-end-13 bg-slate-700 px-3 py-2 rounded-md text-white hover:bg-gray-700">Logout</button>
          </li>
        </ul>
        <button onClick={toggleMenu} type="button" className="sm:hidden bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        </div>
      </div>
    </div> */}
    {menuVisible && (
      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/login" className="bg-slate-700 block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Login</Link>
          <Link to="/signup" className="bg-slate-700 block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Signup</Link>
        </div>
      </div>
    )}
      </>
  );
}

export default Header;
