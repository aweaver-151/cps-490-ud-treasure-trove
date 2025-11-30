import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useAuth } from './AuthContexts.jsx'

const PointsContext = createContext()

export function PointsProvider({ children }) {
  const [userPoints, setUserPoints] = useState(1000)
  const [loading, setLoading] = useState(true)
  const [token] = useAuth()

  useEffect(() => {
    async function load() {
      if (!token) {
        setUserPoints(null)
        setLoading(false)
        return
      }

      console.log('Fetching from:', `${import.meta.env.VITE_BACKEND_URL}api/v1/users/me`)
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      console.log('Response status:', res.status)
      const data = await res.json()
      console.log('Response data:', data)

      if (res.ok) {
        console.log('Setting points to:', data.points)
        setUserPoints(data.points)
      } else {
        setUserPoints(null)
      }

      setLoading(false)
    }

    load()
  }, [token])

  return (
    <PointsContext.Provider value={{ userPoints, setUserPoints, loading }}>
      {children}
    </PointsContext.Provider>
  )
}

PointsProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export function usePoints() {
  return useContext(PointsContext)
}