import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import './SavedMovies.css'
import { savedMoviesData } from '../../constants/savedMoviesData'
import { useEffect, useState } from 'react'
import Preloader from '../Preloader/Preloader'
import { apiEmulator } from '../../utils/utils'

const SavedMovies = () => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    apiEmulator()
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <main className="saved-movies container">
      <SearchForm />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList moviesData={savedMoviesData} />
      )}
    </main>
  )
}

export default SavedMovies
