import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { convertDuration } from '../../utils/utils'
import MovieCardButton from './MovieCardButton/MovieCardButton'
import './MoviesCard.css'

const MoviesCard = ({ movieData }) => {
  const { pathname } = useLocation()
  const [favorite, setFavorite] = useState(false)

  const saveMovieHandler = () => {
    setFavorite(!favorite)
    console.log('Movie saved')
  }

  const deleteMovieHandler = () => {
    console.log('Movie deleted')
  }

  return (
    <li className="movie-card">
      <a
        className="movie-card__trailer"
        href={movieData.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movie-card__image"
          src={movieData.image}
          alt={movieData.nameRU}
        />
      </a>

      <div className="movie-card__description">
        <h2 className="movie-card__name">{movieData.nameRU}</h2>
        <MovieCardButton
          onClickHandler={
            pathname === '/movies' ? saveMovieHandler : deleteMovieHandler
          }
          typeClass={
            pathname === '/movies'
              ? favorite
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
