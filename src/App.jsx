import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContexts.jsx'
import { Blog } from './pages/Blog.jsx'
import { Signup } from './pages/Signup.jsx'
import { Login } from './pages/Login.jsx'
import { Shared } from './pages/Shared.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Shared />,
    children: [
      {
        index: true,
        element: <Blog />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
])

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <div className='min-h-screen bg-slate-950 text-white overflow-hidden'>
          <RouterProvider router={router} />
        </div>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
