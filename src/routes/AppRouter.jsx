import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/layout/Navbar'
import Home from '../pages/Home'
import Browse from '../pages/Browse'
import GenrePage from '../pages/GenrePage'
import MoodPage from '../pages/MoodPage'
import Favorites from '../pages/Favorites'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import MovieDetail from '../components/media/MovieDetail'

function Protected({ children }) {
  const { isAuth } = useAuth()
  return isAuth ? children : <Navigate to="/login" replace state={{ from: '/favorites' }} />
}

export default function AppRouter() {
  const [search, setSearch] = useState('')

  return (
    <BrowserRouter>
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/browse/:category" element={<Browse search={search} />} />
        <Route path="/genre/:id" element={<GenrePage />} />
        <Route path="/mood" element={<MoodPage />} />
        <Route path="/favorites" element={<Protected><Favorites /></Protected>} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
