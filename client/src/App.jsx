import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/homepage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import { Toaster } from "react-hot-toast"
import { AuthContext } from "./context/AuthContext.jsx";
import bgImage from "./assets/bgImage2.png";

const App = () => {
  const { authUser } = useContext(AuthContext)

  if (loading) {
    return <div className="text-black p-4 bg-gray-200">Loading...</div>;
  }

  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="bg-contain"
    >
      <Toaster />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
