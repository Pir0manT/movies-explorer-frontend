import { NavLink } from 'react-router-dom'
import logo from '../../images/logo.svg'
import './Logo.css'

const Logo = () => {
  return (
    <NavLink to="/" className="logo__link">
      <img
        className="logo__image"
        src={logo}
        alt="Логотип Movies Explorer"
      ></img>
    </NavLink>
  )
}

export default Logo
