import './MovieCardButton.css'

const MovieCardButton = ({ onClickHandler, typeClass }) => {
  return (
    <button
      className={`movie-card__button ${typeClass}`}
      type="button"
      onClick={onClickHandler}
    />
  )
}

export default MovieCardButton
