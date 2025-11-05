import { Link } from 'react-router-dom'
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
    <div>
      <Link to='/login'>Login</Link> | <Link to='/signup'>Sign Up</Link>
      <br />
      <hr />
      <br />
    </div>
  )
}
