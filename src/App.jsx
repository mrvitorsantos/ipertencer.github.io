import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Propagador from './pages/Propagador'
import Profile from './pages/Profile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/propagador" element={<Propagador />} />
        <Route path="/perfil" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
