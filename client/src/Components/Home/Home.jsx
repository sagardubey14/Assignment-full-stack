import { Link} from 'react-router-dom'
import Footer from './Footer';
function Home() {
  
  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white">
        <div className="text-center">
          <p className="text-3xl font-bold leading-8 sm:text-4xl sm:leading-10">
            Welcome to our Post website.
          </p>
          <p className="mt-4 text-lg">
          Discover the latest posts, share your thoughts, and connect with others.
          </p>
          <div className="mt-8 mx-20   grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link  to="/login" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg">
              Login
            </Link>
            <Link to='/signup' className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg">
              Register
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
