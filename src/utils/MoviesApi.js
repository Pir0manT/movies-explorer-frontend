import {
  BEATFILMS_URL,
  MESSAGE_MOVIES_API_GET_FILMS_FAIL,
} from '../constants/constants'

class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseURL = baseUrl
    this._headers = headers
  }

  _checkServerResponse = (res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`${res.status}: ${MESSAGE_MOVIES_API_GET_FILMS_FAIL}`)
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkServerResponse)
  }

  getAllMovies = () => {
    return this._request(`${this._baseURL}/beatfilm-movies`, {
      headers: this._headers,
    })
  }
}

const moviesApi = new MoviesApi({
  baseUrl: BEATFILMS_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default moviesApi
