import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { editUser } from '../api/users.js'
import { useAuth } from '../contexts/AuthContexts.jsx'

export function AcountUpdate() {
  const navigate = useNavigate()
  const [token] = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const editMutation = useMutation({
    mutationFn: () => editUser(token, { username, password }),
    onSuccess: () => {
      alert('Account updated successfully!')
      navigate('/list')
    },
    onError: () => alert('Failed to update account'),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    editMutation.mutate()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Link to='/'>Back to main page</Link>
      <hr />
      <br />

      <div>
        <label htmlFor='edit-username'>New Username:</label>
        <input
          type='text'
          id='edit-username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
      </div>

      <br />

      <div>
        <label htmlFor='edit-password'>New Password:</label>
        <input
          type='password'
          id='edit-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
      </div>

      <br />

      <input
        type='submit'
        value={editMutation.isPending ? 'Updating...' : 'Update Account'}
        disabled={editMutation.isPending}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                   dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      />
    </form>
  )
}
