import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'
import { useLocation } from 'react-router-dom'

const MoviesCardList = ({ moviesData, isSearchDone }) => {
  const { pathname } = useLocation()
  return (
    <section className="movies-section">
      {moviesData.length > 0 ? (
        <ul className="movies-list">
          {moviesData.map((movie) => (
            <MoviesCard
              key={pathname === '/movies' ? movie.id : movie._id}
              movieData={movie}
            />
          ))}
        </ul>
      ) : (
        <span className="movies-section__empty">
          {isSearchDone ? 'Ничего не найдено' : ''}
        </span>
      )}
    </section>
  )
}

export default MoviesCardList
