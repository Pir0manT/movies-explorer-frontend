import { NavLink } from 'react-router-dom'
import './SideBar.css'

const SideBar = ({ isOpened, closeBurger: closeSideBar }) => {
  return (
    <div className={isOpened ? 'sidebar sidebar_opened' : 'sidebar'}>
      <button className="sidebar__close" type="button" onClick={closeSideBar}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="7.16016"
            y="9.28249"
            width="3"
            height="22"
            transform="rotate(-45 7.16016 9.28249)"
            fill="black"
          />
          <rect
            x="22.7168"
            y="7.16117"
            width="3"
            height="22"
            transform="rotate(45 22.7168 7.16117)"
            fill="black"
          />
        </svg>
      </button>
      <ul className="sidebar__list">
        <li className="sidebar__item">
          <NavLink to="/" className="sidebar__link sidebar__link_type_home">
            Главная
          </NavLink>
        </li>
        <li className="sidebar__item">
          <NavLink to="/movies" className="sidebar__link">
            Фильмы
          </NavLink>
        </li>
        <li className="sidebar__item">
          <NavLink
            to="/saved-movies"
            className="sidebar__link sidebar__link_type_saved-movies"
          >
            Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
      <NavLink
        to="/profile"
        className="sidebar__link sidebar__link_type_profile"
      >
        Аккаунт
      </NavLink>
    </div>
  )
}

export default SideBar
