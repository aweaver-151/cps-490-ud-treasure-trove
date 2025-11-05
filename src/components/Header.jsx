import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContexts.jsx'
import { User } from './User.jsx'
import { deleteUser } from '../api/users.js'

export function Header() {
  const [token, setToken] = useAuth()
  if (token) {
    const { sub } = jwtDecode(token)
    return (
      <div>
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
        <br />
        <hr />
        <br />
      </div>
    )
  }

  return (
    <div className='bg-blue-700'>
      <button
        className='p-2 text-gray-300 hover:text-white float-right'
        onClick={() => (window.location.href = '/login')}
      >
        Login
      </button>
      <button
        className='p-2 text-gray-300 hover:text-white float-right'
        onClick={() => (window.location.href = '/signup')}
      >
        Sign Up
      </button>
      <br />
      <br />
    </div>
  )
}
