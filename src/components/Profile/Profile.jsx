import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Profile.css'
import { useUserMoviesContext } from '../../contexts/UserMoviesContext'
import { useInput } from '../../hooks/input.hook'
import { MESSAGE_API_PROFILE_SUCCESS } from '../../constants/constants'
import mainApi from '../../utils/MainApi'

const Profile = ({ handleAuthError }) => {
  const { currentUser, setCurrentUser } = useUserMoviesContext()
  const name = useInput(currentUser.name, { isUserName: true })
  const email = useInput(currentUser.email, { isEmail: true })
  const apiMessage = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    name.clearErrorMessage(true)
    email.clearErrorMessage(true)
  }, [])

  const hasChanges = () => {
    return currentUser.name !== name.value || currentUser.email !== email.value
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (apiMessage.current) {
      apiMessage.current.textContent = ''
    }
    const formData = new FormData(evt.target)
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
    }
    mainApi
      .editUserData(userData)
      .then((user) => {
        setCurrentUser({ name: user.name, email: user.email })
        if (apiMessage.current) {
          apiMessage.current.textContent = MESSAGE_API_PROFILE_SUCCESS
        }
      })
      .catch((err) => {
        if (typeof err !== 'string') {
          console.error(err)
          return
        }

        if (apiMessage.current) {
          apiMessage.current.textContent = err
        }
        handleAuthError(err)
      })
  }

  const handleLogout = () => {
    mainApi
      .logoutUser()
      .then(() => {
        setCurrentUser({ name: '', email: '' })
        localStorage.removeItem('search')
        localStorage.removeItem('foundMovies')
        navigate('/', { replace: true })
      })
      .catch((err) => {
        if (apiMessage.current) {
          apiMessage.current.textContent = err
        }
      })
  }

  return (
    <main className="profile container">
      <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>

      <form
        name="profile__form"
        className="profile__form"
        onSubmit={handleSubmit}
      >
        <label className="profile__input-container">
          <span className="profile__input-label">Имя</span>
          <input
            required
            type="text"
            name="name"
            className="profile__input"
            placeholder="Укажите имя"
            value={name.value}
            onChange={name.onChange}
            onBlur={name.onBlur}
            minLength={2}
            maxLength={30}
          />
        </label>
        <span className="profile__error">{name.isValid.errorMessage}</span>
        <label className="profile__input-container">
          <span className="profile__input-label">E-mail</span>
          <input
            required
            type="email"
            name="email"
            className="profile__input"
            placeholder="Укажите почту"
            value={email.value}
            onBlur={email.onBlur}
            onChange={email.onChange}
          />
        </label>

        <span className="profile__error">{email.isValid.errorMessage}</span>

        <span ref={apiMessage} className="profile__api-error" />

        <div className="profile__buttons">
          <button
            type="submit"
            className="profile__submit"
            disabled={
              !hasChanges() || !name.isValid.result || !email.isValid.result
            }
          >
            Сохранить
          </button>
          <button
            type="button"
            className="profile__button profile__button_type_logout"
            onClick={handleLogout}
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  )
}

export default Profile
