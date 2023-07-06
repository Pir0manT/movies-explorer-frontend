import { useNavigate } from 'react-router-dom'
import './RegisterMenu.css'

const RegisterMenu = () => {
  const navigate = useNavigate()

  return (
    <ul className="register-menu">
      <li className="register-menu__item">
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="register-menu__link"
        >
          Регистрация
        </button>
      </li>
      <li className="register-menu__item">
        <button
          type="button"
          onClick={() => navigate('/signin')}
          className="register-menu__link register-menu__link_type_login"
        >
          Войти
        </button>
      </li>
    </ul>
  )
}

export default RegisterMenu
