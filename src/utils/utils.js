import {
  MOBILE_SCREEN_WIDTH,
  TABLET_SCREEN_WIDTH,
  DESKTOP_CARDS_AMOUNT,
  TABLET_CARDS_AMOUNT,
  MOBILE_CARDS_AMOUNT,
  SHORTS_DURATION,
} from '../constants/constants'

const convertDuration = (duration) => {
  const hours = Math.trunc(duration / 60)
  const minutes = duration % 60
  return `${hours ? `${hours}ч` : ''} ${minutes ? `${minutes}м` : ''}`.trim()
}

const apiEmulator = (isFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFail) reject(new Error('ошибка api.'))
      resolve('успех')
    }, 500)
  })
}

const getCardsAmount = () => {
  const screenWidth = window.innerWidth
  return screenWidth <= MOBILE_SCREEN_WIDTH
    ? MOBILE_CARDS_AMOUNT
    : screenWidth <= TABLET_SCREEN_WIDTH
    ? TABLET_CARDS_AMOUNT
    : DESKTOP_CARDS_AMOUNT
}

const checkMovieDuration = (
  movieDuration,
  isShortsIncluded,
  shortsDurationCriteria = SHORTS_DURATION
) =>
  isShortsIncluded
    ? movieDuration <= shortsDurationCriteria
    : movieDuration > shortsDurationCriteria

const filterMovieByQuery = (movie, searchQuery) =>
  movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())

const movieFilter = (movie, { query, includeShorts }) =>
  checkMovieDuration(movie.duration, includeShorts) &&
  filterMovieByQuery(movie, query)

export { convertDuration, apiEmulator, getCardsAmount, movieFilter }
