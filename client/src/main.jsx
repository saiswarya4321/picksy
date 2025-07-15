import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/app/store.js';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Signup from './pages/Signup.jsx'
import VerifyOtp from './pages/VerifyOtp.jsx'
import Home from './pages/Home.jsx'
import Root from './components/Root.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Success from './pages/Success.jsx'
import Cancel from './pages/Cancel.jsx'
import SuccessPage from './pages/SuccessPage.jsx'
import Orders from './pages/Orders.jsx'
import CategoryDetails from './components/CategoryDetails.jsx'
import { Toaster } from 'react-hot-toast';
import { PersistGate } from 'redux-persist/integration/react';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Signup/>,

      },
      {
        path: "/verify-otp",
        element: <VerifyOtp/>,

      },
      {
        path: "/home",
        element: <Home />,

      },
      {
        path: "/productdetails/:id",
        element: <ProductDetails />,

      },
      {
        path: "/cart",
        element: <Cart />,

      },
      {
        path: "/login",
        element: <Login />,

      },
      {
        path: "/success",
        element: <Success />,

      },
      {
        path: "/cancel",
        element: <Cancel />,

      },
      {
        path: "/successpage",
        element: <SuccessPage />,

      },
      {
        path: "/orders",
        element: <Orders />,

      },
      {
        path: "/categorydetails/:category",
        element: <CategoryDetails/>,

      },
      
    ],
  },

]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
    <Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />
      </PersistGate>
    </Provider>

    </>
   
  </StrictMode>,
)
