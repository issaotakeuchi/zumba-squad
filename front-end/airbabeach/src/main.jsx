import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  useRouteError,
  BrowserRouter
} from "react-router-dom"

import 'sweetalert2/src/sweetalert2.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './contexts/auth'
import './global.scss'
import { App } from './App'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { CreateUser } from './pages/CreateUser'
import { ProtectedRoute } from "./utils/ProtectedRoute"
import { Product } from "./pages/Product"
import { Category } from "./pages/Category"
import { Booking } from "./Components/Booking"
import { ProductDetail } from "./Components/ProductDetail"

const root = ReactDOM.createRoot(document.getElementById('root'))

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);

  return <p>Ocorreu um problema ao carregar, recarregue a página </p>;
}

const appRouter = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '',
        loader: () => redirect('/home'),
        errorElement: <ErrorBoundary />

      },
      {
        path: '/',
        loader: () => redirect('/home'),
        errorElement: <ErrorBoundary />

      },
      {
        path: '*',
        loader: () => redirect('https://http.cat/404'),
        errorElement: <ErrorBoundary />
      },
      {
        path: "home",
        element: <Home />,
        errorElement: <ErrorBoundary />
      },
      {
        path: "login",
        element: <Login />,
        errorElement: <ErrorBoundary />
      },
      {
        path: "createUser",
        element: <CreateUser />,
        errorElement: <ErrorBoundary />
      },
      {
        path: "product",
        element: <Product />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            path: ":id",
            element: <ProductDetail />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: ":id/booking",
            element:
              //<ProtectedRoute redirectPath="/login" msg='Para fazer uma reserva você precisa estar logado!'>
              <Booking />,
            //</ProtectedRoute>,
            errorElement: <ErrorBoundary />,
          },
        ]
      },
      {
        path: "category/:id",
        element: <Category />,
        errorElement: <ErrorBoundary />
      },
      {
        path: "rotaProtegida",
        element:
          <ProtectedRoute redirectPath="/home" msg='Acesso negado' type='toast'>
            <CreateUser />
          </ProtectedRoute>,
        errorElement: <ErrorBoundary />
      },
    ],
  }
]
)

root.render(
  <AuthProvider >
    <RouterProvider router={appRouter}/>
  </AuthProvider>
)


