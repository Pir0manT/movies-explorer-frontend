import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import Main from '../Main/Main'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Header from '../Header/Header'
import Profile from '../Profile/Profile'
import NotFound from '../NotFound/NotFound'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import { UserMoviesContextProvider } from '../../contexts/UserMoviesContext'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import mainApi from '../../utils/MainApi'
import Preloader from '../Preloader/Preloader'

const App = () => {
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' })
  const [savedMovies, setSavedMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    mainApi
      .getCurrentUser()
      .then((userData) => {
        setCurrentUser({ name: userData.name, email: userData.email })
      })
      .catch((err) => {
        console.error(err)
        setCurrentUser({ name: '', email: '' })
      })
      .finally(() => setIsLoading(false))
  }, [])

  return isLoading ? (
    <Preloader />
  ) : (
    <div className="App">
      <UserMoviesContextProvider
        context={{ currentUser, savedMovies, setCurrentUser, setSavedMovies }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Layout isLoggedIn={!!currentUser.email}>
                <Main />
              </Layout>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoute isLoggedIn={!currentUser.email}>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <ProtectedRoute isLoggedIn={!currentUser.email}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={!!currentUser.email}>
                <Header isLoggedIn={!!currentUser.email} />
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute isLoggedIn={!!currentUser.email}>
                <Layout isLoggedIn={!!currentUser.email}>
                  <Movies />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute isLoggedIn={!!currentUser.email}>
                <Layout isLoggedIn={!!currentUser.email}>
                  <SavedMovies />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/404" replace />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </UserMoviesContextProvider>
    </div>
  )
}

export default App
