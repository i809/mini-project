import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// The URL of the backend API is stored in an environment variable
// This is done to make it easy to switch between different environments
// (e.g. development, staging, production)
export const backendUrl = import.meta.env.VITE_BACKEND_URL

// The currency symbol used in the application
export const currency = '$'

// This component is the main entry point of the admin panel
// It will render different pages based on the current route
// It also handles the authentication of the user by storing
// a token in local storage and checking it in each render
const App = () => {

  // The user's authentication token is stored in local storage
  // If the token is not set, it is set to an empty string
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // When the token changes, it is stored in local storage
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  // If the token is not set, the user is not logged in
  // In this case, the login page is rendered
  // Otherwise, the navbar, sidebar and the current page are rendered
  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken} />
        : <>
          <Navbar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App
