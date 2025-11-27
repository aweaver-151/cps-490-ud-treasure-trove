import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContexts.jsx'
import { ItemsList } from './pages/ItemsList.jsx'
import { Home } from './pages/Home.jsx'
import { Signup } from './pages/Signup.jsx'
import { Login } from './pages/Login.jsx'
import { Shared } from './pages/Shared.jsx'
import { Auction } from './pages/Auction.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Shared />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/list',
        element: <ItemsList />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/auction/:id',
        element: <Auction />,
      },
    ],
  },
])

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
