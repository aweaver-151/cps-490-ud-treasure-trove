import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContexts.jsx'
import { User } from './User.jsx'
import { deleteUser } from '../api/users.js'

export function Header() {
  const [token, setToken] = useAuth()
  if (token) {
    const { sub } = jwtDecode(token)
    return (
      <div className='bg-blue-500'>
        Logged in as <User id={sub} />
        <button
          className='p-2 text-gray-300 hover:text-white hover:bg-blue-800 float-right rounded-lg bg-blue-700 m-1'
          onClick={() => setToken(null)}
        >
          Logout
        </button>
        <button
          className='p-2 text-gray-300 hover:text-white hover:bg-blue-800 float-right rounded-lg bg-blue-700 m-1'
          onClick={() => {
            deleteUser(sub, token)
            setToken(null)
          }}
        >
          Delete Account
        </button>
        <br />
        <br />
      </div>
    )
  }

  return (
    <div className='bg-blue-500'>
      <button
        className='p-2 text-gray-300 hover:text-white hover:bg-blue-800 float-right rounded-lg bg-blue-700 m-1'
        onClick={() => (window.location.href = '/login')}
      >
        Login
      </button>
      <button
        className='p-2 text-gray-300 hover:text-white hover:bg-blue-800 float-right rounded-lg bg-blue-700 m-1'
        onClick={() => (window.location.href = '/signup')}
      >
        Sign Up
      </button>
      <button
        className='p-2 text-gray-300 hover:text-white hover:bg-blue-800 float-right rounded-lg bg-blue-700 m-1'
        onClick={() => (window.location.href = '/list')}
      >
        Item List
      </button>
      <br />
      <br />
    </div>
  )
}
