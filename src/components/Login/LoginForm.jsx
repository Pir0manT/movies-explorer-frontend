import './LoginForm.css'
import { Link } from 'react-router-dom'
import { useInput } from '../../hooks/input.hook'
import Preloader from '../Preloader/Preloader'

const LoginForm = ({ onSubmit, isLoading, apiErrorMessage }) => {
  const email = useInput('', { isEmail: true })
  const password = useInput('')

  const defaultClassName = 'login-form__input'
  const errorClassName = 'login-form__input login-form__input_type_error'

  return (
    <form className="login-form__form" onSubmit={onSubmit}>
      <label htmlFor="email" className="login-form__field">
        E-mail
        <input
          type="email"
          className={
            !email.isValid.errorMessage ? defaultClassName : errorClassName
          }
          required
          autoComplete="off"
          name="email"
          id="email"
          value={email.value}
          onChange={email.onChange}
          onBlur={email.onBlur}
        />
        <span className="login-form__error">{email.isValid.errorMessage}</span>
      </label>
      <label htmlFor="password" className="login-form__field">
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
          name="password"
          id="password"
          value={password.value}
          onChange={password.onChange}
          onBlur={password.onBlur}
        />
        <span className="login-form__error">
          {password.isValid.errorMessage}
        </span>
      </label>

      <span ref={apiErrorMessage} className="login-form__api-error" />

      {isLoading ? (
        <Preloader />
      ) : (
        <button
          className={
            email.isValid.result && password.isValid.result
              ? 'login-form__submit'
              : 'login-form__submit login-form__submit_disabled'
          }
          type="submit"
          disabled={!email.isValid.result || !password.isValid.result}
        >
          Войти
        </button>
      )}
      <p className="login-form__text">
        Ещё не зарегистрированы?{' '}
        <Link to="/signup" className="login-form__link">
          Регистрация
        </Link>
      </p>
    </form>
  )
}

export default LoginForm
