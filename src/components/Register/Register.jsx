import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'
import Logo from '../Logo/Logo'
import RegisterForm from './RegisterForm'
import mainApi from '../../utils/MainApi'
import { useUserMoviesContext } from '../../contexts/UserMoviesContext'

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const apiErrorMessage = useRef(false)
  const { setCurrentUser } = useUserMoviesContext()
  const navigate = useNavigate()

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    if (apiErrorMessage.current) {
      apiErrorMessage.current.textContent = ''
    }
    setIsLoading(true)
    const formData = new FormData(evt.target)
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    }
    mainApi
      .signup(userData)
      .then((res) => {
        // При успешной регистрации сразу авторизуем пользователя
        return mainApi.signin({
          email: userData.email,
          password: userData.password,
        })
      })
      .then((res) => {
        evt.target.reset()
        //....и переходим к фильмам
        setCurrentUser({ name: userData.name, email: userData.email })
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
    <main className="register container">
      <Logo />
      <h1 className="register__title">Добро пожаловать!</h1>
      <RegisterForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        apiErrorMessage={apiErrorMessage}
      />
    </main>
  )
}

export default Register
