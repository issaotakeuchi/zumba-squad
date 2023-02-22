import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom"

import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './contexts/auth'
import './global.scss'
import { App } from './App'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { CreateUser } from './pages/CreateUser'

const root = ReactDOM.createRoot(document.getElementById('root'))

const appRouter = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: '',
        loader: () => redirect('/home')
      },
      {
        path: '*',
        loader: () => redirect('https://http.cat/404')
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "createUser",
        element: <CreateUser />,
      },
    ]
  }
])

root.render(
  <React.StrictMode>
    
      <AuthProvider>
        <RouterProvider router={appRouter} />
      </AuthProvider>
    
  </React.StrictMode>
)

