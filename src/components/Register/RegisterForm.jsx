import './RegisterForm.css'
import { Link } from 'react-router-dom'
import { useInput } from '../../hooks/input.hook'
import Preloader from '../Preloader/Preloader'

const RegisterForm = ({ onSubmit, isLoading, apiErrorMessage }) => {
  const name = useInput('', { isUserName: true })
  const email = useInput('', { isEmail: true })
  const password = useInput('')

  const defaultClassName = 'register-form__input'
  const errorClassName = 'register-form__input register-form__input_type_error'

  return (
    <form className="register-form" onSubmit={onSubmit}>
      <label htmlFor="name" className="register-form__field">
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
          name="name"
          id="name"
          value={name.value}
          onChange={name.onChange}
          onBlur={name.onBlur}
        />
        <span className="register-form__error">
          {name.isValid.errorMessage}
        </span>
      </label>
      <label htmlFor="email" className="register-form__field">
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
        <span className="register-form__error">
          {email.isValid.errorMessage}
        </span>
      </label>
      <label htmlFor="password" className="register-form__field">
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
          name="password"
          id="password"
          value={password.value}
          onChange={password.onChange}
          onBlur={password.onBlur}
        />
        <span className="register-form__error">
          {password.isValid.errorMessage}
        </span>
      </label>

      <span ref={apiErrorMessage} className="register-form__api-error" />

      {isLoading ? (
        <Preloader />
      ) : (
        <button
          className={
            name.isValid.result &&
            email.isValid.result &&
            password.isValid.result
              ? 'register-form__submit'
              : 'register-form__submit register-form__submit_disabled'
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
      )}
      <p className="register-form__text">
        Уже зарегистрированы?{' '}
        <Link to="/signin" className="register-form__link">
          Войти
        </Link>
      </p>
    </form>
  )
}

export default RegisterForm
