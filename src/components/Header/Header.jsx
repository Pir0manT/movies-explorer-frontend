import './Header.css'
import Navigation from '../Navigation/Navigation'
import Logo from '../Logo/Logo'

const Header = ({ isLoggedIn }) => {
  console.log(isLoggedIn)
  return (
    <header className={`header ${!isLoggedIn ? 'header_type_auth' : ''}`}>
      <Logo />
      <Navigation isLoggedIn={isLoggedIn} />
    </header>
  )
}

export default Header
