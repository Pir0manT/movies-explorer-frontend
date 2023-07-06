import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import './Movies.css'
import { moviesData } from '../../constants/moviesData'
import { useEffect, useState } from 'react'
import { apiEmulator } from '../../utils/utils'
import Preloader from '../Preloader/Preloader'

const Movies = () => {
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
    <main className="movies container">
      <SearchForm />
      {isLoading ? <Preloader /> : <MoviesCardList moviesData={moviesData} />}
      <button className="movies__more" type="button">
        Ещё
      </button>
    </main>
  )
}

export default Movies
