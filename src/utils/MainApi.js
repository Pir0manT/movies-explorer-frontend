import { BASE_URL } from '../constants/constants'

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseURL = baseUrl
    this._headers = headers
  }

  _checkServerResponse = async (res) => {
    if (res.ok) {
      return res.json()
    } else {
      const errorData = await res.json()
      const errorMessage = errorData.message || ''
      return Promise.reject(
        `Ошибка: ${res.status} ${
          errorMessage ? 'Описание: ' + errorMessage : ''
        }`
      )
    }
  }

  _request(url, options) {
    return fetch(url, { ...options, credentials: 'include' }).then(
      this._checkServerResponse
    )
  }

  signup = (userData) => {
    return this._request(`${this._baseURL}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(userData),
    })
  }

  signin = (userData) => {
    return this._request(`${this._baseURL}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(userData),
    })
  }

  getCurrentUser = () => {
    return this._request(`${this._baseURL}/users/me`, {
      headers: this._headers,
    })
  }

  editUserData = (userData) => {
    return this._request(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userData),
    })
  }

  logoutUser = () => {
    return this._request(`${this._baseURL}/signout`, {
      method: 'POST',
      headers: this._headers,
    })
  }

  getSavedMovies = () => {
    return this._request(`${this._baseURL}/movies`, {
      headers: this._headers,
    })
  }

  saveMovie = (movieData) => {
    return this._request(`${this._baseURL}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(movieData),
    })
  }

  deleteMovie = (movieId) => {
    return this._request(`${this._baseURL}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }
}

const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default mainApi
