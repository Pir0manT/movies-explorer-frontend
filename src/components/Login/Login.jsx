import './Login.css'
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom'
import { useInput } from '../../hooks/input.hook'

const Login = ({ onLogin }) => {
  const email = useInput('', { isEmail: true })
  const password = useInput('')

  const defaultClassName = 'auth__input'
  const errorClassName = 'auth__input auth__input_type_error'

  const handleSubmit = (evt) => {
    evt.preventDefault()
    onLogin()
  }

  return (
    <main className="auth container">
      <Logo />
      <h1 className="auth__title">Рады видеть!</h1>
      <form action="#" className="auth__form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="auth__field">
          E-mail
          <input
            type="email"
            className={
              !email.isValid.errorMessage ? defaultClassName : errorClassName
            }
            required
            autoComplete="off"
            placeholder="Email"
            {...email}
          />
          <span className="auth__error">{email.isValid.errorMessage}</span>
        </label>
        <label htmlFor="password" className="auth__field">
          Пароль
          <input
            type="password"
            className={
              !password.isValid.errorMessage ? defaultClassName : errorClassName
            }
            required
            autoComplete="off"
            placeholder="Пароль"
            minLength="2"
            maxLength="200"
            {...password}
          />
          <span className="auth__error">{password.isValid.errorMessage}</span>
        </label>
        <button
          className={
            email.isValid.result && password.isValid.result
              ? 'auth__submit'
              : 'auth__submit auth__submit_disabled'
          }
          type="submit"
          disabled={!email.isValid.result || !password.isValid.result}
        >
          Войти
        </button>
        <p className="auth__text">
          Ещё не зарегистрированы?{' '}
          <Link to="/signup" className="auth__link">
            Регистрация
          </Link>
        </p>
      </form>
    </main>
  )
}

export default Login
