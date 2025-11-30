import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import { PointsProvider } from './contexts/PointsContext.jsx'
import { AuthContextProvider } from './contexts/AuthContexts.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <PointsProvider>
        <App />
      </PointsProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
