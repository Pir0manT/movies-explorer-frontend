import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { convertDuration } from '../../utils/utils'
import MovieCardButton from './MovieCardButton/MovieCardButton'
import './MoviesCard.css'
import { useUserMoviesContext } from '../../contexts/UserMoviesContext'
import Modal from '../Modal/Modal'
import ModalContent from '../Modal/ModalContent'
import { BEATFILMS_URL } from '../../constants/constants'
import mainApi from '../../utils/MainApi'

const MoviesCard = ({ movieData }) => {
  const { pathname } = useLocation()
  const { savedMovies, setSavedMovies } = useUserMoviesContext()
  const [isMovieSaved, setIsMovieSaved] = useState(false)
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [modalText, setModalText] = useState('')

  useEffect(() => {
    setIsMovieSaved(
      savedMovies.some(
        (movie) =>
          movie.movieId === movieData.id || movie.movieId === movieData.movieId
      )
    )
  }, [savedMovies, movieData])

  const saveMovieHandler = () => {
    const savingMovieData = {
      ...movieData,
      movieId: movieData.id,
      image: `${BEATFILMS_URL}${movieData.image.url}`,
      thumbnail: `${BEATFILMS_URL}${movieData.image.formats.thumbnail.url}`,
    }
    delete savingMovieData.id
    delete savingMovieData.created_at
    delete savingMovieData.updated_at

    mainApi
      .saveMovie(savingMovieData)
      .then((movie) => {
        setSavedMovies([...savedMovies, movie])
      })
      .catch((err) => {
        setIsModalOpened(true)
        setModalText(err)
      })
  }

  const deleteMovieHandler = () => {
    const deleteParam =
      pathname === '/movies' ? movieData.id : movieData.movieId
    const movieToDelete = savedMovies.find(
      (movie) => movie.movieId === deleteParam
    )

    mainApi
      .deleteMovie(movieToDelete._id)
      .then((deletedMovieData) => {
        setSavedMovies(
          savedMovies.filter((movie) => movie._id !== deletedMovieData._id)
        )
      })
      .catch((err) => {
        setIsModalOpened(true)
        setModalText(err)
      })
  }

  const handleModalClose = () => {
    setIsModalOpened(false)
    setModalText('')
  }

  return (
    <li className="movie-card">
      <Modal isOpen={isModalOpened}>
        <ModalContent onClose={handleModalClose} modalText={modalText} />
      </Modal>

      <a
        className="movie-card__trailer"
        href={movieData.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movie-card__image"
          src={
            pathname === '/movies'
              ? `${BEATFILMS_URL}/${movieData.image.url}`
              : movieData.image
          }
          alt={movieData.nameRU}
        />
      </a>

      <div className="movie-card__description">
        <h2 className="movie-card__name">{movieData.nameRU}</h2>
        <MovieCardButton
          onClickHandler={isMovieSaved ? deleteMovieHandler : saveMovieHandler}
          typeClass={
            pathname === '/movies'
              ? isMovieSaved
                ? 'movie-card__button_favorite'
                : ''
              : 'movie-card__button_delete'
          }
        ></MovieCardButton>
      </div>
      <span className="movie-card__duration">
        {convertDuration(+movieData.duration)}
      </span>
    </li>
  )
}

export default MoviesCard
