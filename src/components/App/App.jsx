import './App.css'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Layout from '../Layout/Layout'
import Main from '../Main/Main'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Header from '../Header/Header'
import Profile from '../Profile/Profile'
import NotFound from '../NotFound/NotFound'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  const handleRegistration = () => {
    navigate('/signin', { replace: true })
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    navigate('/', { replace: true })
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    navigate('/signin', { replace: true })
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Layout isLoggedIn={isLoggedIn}>
              <Main />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={<Register onRegister={handleRegistration} />}
        />
        <Route path="/signin" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/profile"
          element={
            <>
              <Header isLoggedIn={isLoggedIn} />
              <Profile onLogout={handleLogout} />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <Layout isLoggedIn={isLoggedIn}>
              <Movies />
            </Layout>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <Layout isLoggedIn={isLoggedIn}>
              <SavedMovies />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
