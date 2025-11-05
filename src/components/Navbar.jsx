import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContexts.jsx'
import { User } from './User.jsx'
import { deleteUser } from '../api/users.js'

export function Navbar() {
  const [token, setToken] = useAuth()
  if (token) {
    const { sub } = jwtDecode(token)
    return (
      <nav className='fixed top-0 w-full z-50 transition-all duration-300 bg-slate-950/20 backdrop-blur'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-14 sm:h-16 md:h-20'>
            Logged in as <User id={sub} />
            <br />
            <button onClick={() => setToken(null)}>Logout</button>
            <button
              onClick={() => {
                deleteUser(sub, token)
                setToken(null)
              }}
            >
              Delete Account
            </button>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className='fixed top-0 w-full z-50 transition-all duration-300 bg-slate-950/20 backdrop-blur'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-14 sm:h-16 md:h-20'>
          <Link to='/login'>Login</Link> | <Link to='/signup'>Sign Up</Link>
        </div>
      </div>
    </nav>
  )
}
