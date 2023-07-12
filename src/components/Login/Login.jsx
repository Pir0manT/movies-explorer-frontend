import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import { useUserMoviesContext } from '../../contexts/UserMoviesContext'
import Logo from '../Logo/Logo'
import LoginForm from './LoginForm'
import './Login.css'
import mainApi from '../../utils/MainApi'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const apiErrorMessage = useRef(false)
  const { setCurrentUser } = useUserMoviesContext()
  const navigate = useNavigate()

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (apiErrorMessage.current) {
      apiErrorMessage.current.textContent = ''
    }
    setIsLoading(true)
    const formData = new FormData(evt.target)
    const userData = {
      email: formData.get('email'),
      password: formData.get('password'),
    }
    mainApi
      .signin(userData)
      .then(() => {
        evt.target.reset()
        return mainApi.getCurrentUser()
      })
      .then((user) => {
        setCurrentUser({ name: user.name, email: user.email })
        navigate('/movies', { replace: true })
      })
      .catch((err) => {
        if (apiErrorMessage) {
          apiErrorMessage.current.textContent = err
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <main className="login container">
      <Logo />
      <h1 className="login__title">Рады видеть!</h1>
      <LoginForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        apiErrorMessage={apiErrorMessage}
      />
    </main>
  )
}

export default Login
