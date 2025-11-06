import { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

export const PointsContext = createContext()

export const PointsProvider = ({ children }) => {
  const [userPoints, setUserPoints] = useState(1000)
  return (
    <PointsContext.Provider value={{ userPoints, setUserPoints }}>
      {children}
    </PointsContext.Provider>
  )
}

PointsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const usePoints = () => useContext(PointsContext)