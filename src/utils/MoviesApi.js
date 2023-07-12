import {
  BEATFILMS_URL,
  MESSAGE_MOVIESAPI_GETFILMS_FAIL,
} from '../constants/constants'

class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseURL = baseUrl
    this._headers = headers
  }

  _checkServerResponse = (res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`${res.status}: ${MESSAGE_MOVIESAPI_GETFILMS_FAIL}`)
  }

  _request(url, options) {
    return fetch(url, { ...options, credentials: 'include' }).then(
      this._checkServerResponse
    )
  }

  getAllMovies = () => {
    return this._request(`${this._baseURL}/beatfilm-movies`, {
      headers: this._headers,
    })
  }
}

const moviesApi = new MoviesApi({
  BEATFILMS_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default moviesApi
