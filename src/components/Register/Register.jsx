import { Link } from 'react-router-dom'
import { useInput } from '../../hooks/input.hook'
import './Register.css'
import Logo from '../Logo/Logo'

const Register = ({ onRegister }) => {
  const name = useInput('')
  const email = useInput('', { isEmail: true })
  const password = useInput('')

  const defaultClassName = 'register__input'
  const errorClassName = 'register__input register__input_type_error'

  const handleSubmit = (evt) => {
    evt.preventDefault()
    onRegister()
  }

  return (
    <main className="register container">
      <Logo />
      <h1 className="register__title">Добро пожаловать!</h1>
      <form
        action="#"
        className="register__form"
        name="register"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="register__field">
          Имя
          <input
            type="text"
            className={
              !name.isValid.errorMessage ? defaultClassName : errorClassName
            }
            required
            autoComplete="off"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            {...name}
          />
          <span className="register__error">{name.isValid.errorMessage}</span>
        </label>
        <label htmlFor="email" className="register__field">
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
          <span className="register__error">{email.isValid.errorMessage}</span>
        </label>
        <label htmlFor="password" className="register__field">
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
          <span className="register__error">
            {password.isValid.errorMessage}
          </span>
        </label>
        <button
          className={
            name.isValid.result &&
            email.isValid.result &&
            password.isValid.result
              ? 'register__submit'
              : 'register__submit register__submit_disabled'
          }
          type="submit"
          disabled={
            !name.isValid.result ||
            !email.isValid.result ||
            !password.isValid.result
          }
        >
          Зарегистрироваться
        </button>
        <p className="register__text">
          Уже зарегистрированы?{' '}
          <Link to="/signin" className="register__link">
            Войти
          </Link>
        </p>
      </form>
    </main>
  )
}

export default Register
