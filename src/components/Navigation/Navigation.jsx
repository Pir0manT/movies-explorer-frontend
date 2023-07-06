import './Navigation.css'
import { useState } from 'react'
import LoggedInMenu from './LoggedInMenu/LoggedInMenu'
import SideBar from './SideBar/SideBar'
import Burger from './Burger/Burger'
import RegisterMenu from './RegisterMenu/RegisterMenu'

const Navigation = ({ isLoggedIn }) => {
  const [isBurgerOpened, setIsBurgerOpened] = useState(false)

  const handleOpenBurgerMenu = () => {
    setIsBurgerOpened(true)
  }

  const handleCloseBurgerMenu = () => {
    setIsBurgerOpened(false)
  }

  return (
    <nav className={'navigation'}>
      {isLoggedIn ? (
        <>
          <Burger onClick={handleOpenBurgerMenu} />
          <LoggedInMenu />
          <SideBar
            isOpened={isBurgerOpened}
            closeBurger={handleCloseBurgerMenu}
          />
        </>
      ) : (
        <RegisterMenu />
      )}
    </nav>
  )
}

export default Navigation
