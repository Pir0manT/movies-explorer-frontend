import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'

const MoviesCardList = ({ moviesData }) => {
  return (
    <section className="movies-section">
      <ul className="movies-list">
        {moviesData.map(({ _id, ...movie }) => (
          <MoviesCard key={_id} movieData={movie} />
        ))}
      </ul>
    </section>
  )
}

export default MoviesCardList
