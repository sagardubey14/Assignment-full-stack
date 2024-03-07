import { Link} from 'react-router-dom'
function Home() {
  return (
    <div>
      <nav className='bg-gray-800 '>
      <ul className='flex flex-row-reverse'>
        <Link className='mr-2 bg-slate-700' to='/login'>Login</Link>
        <Link className='mr-1 bg-slate-700' to='/signup'>Signup</Link>
      </ul>
    </nav>
      <p className='text-center text-wrap md:text-balance capitalize pt-10'>Welcome to our Post website.</p>
    </div>
  )
}

export default Home
