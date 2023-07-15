import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import './SavedMovies.css'
import { useEffect, useState } from 'react'
import Preloader from '../Preloader/Preloader'
import { movieFilter } from '../../utils/utils'
import { useUserMoviesContext } from '../../contexts/UserMoviesContext'
import Modal from '../Modal/Modal'
import ModalContent from '../Modal/ModalContent'
import mainApi from '../../utils/MainApi'

const SavedMovies = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalText, setModalText] = useState('')
  const { savedMovies, setSavedMovies } = useUserMoviesContext()
  const [moviesFound, setMoviesFound] = useState([])
  const [searchParams, setSearchParams] = useState({
    query: '',
    includeShorts: false,
    isSearchDone: false,
  })

  // Однократный эффект при монтировании /saved-movies
  useEffect(() => {
    setIsLoading(true)
    mainApi
      .getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies)
      })
      .catch((err) => {
        setModalText(err)
        setIsModalOpen(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  // Эффект вызывется при изменении параметров поиска
  // фактически, возвращается новый набор фильмов,
  // удовлетворяющий условиям поиска
  useEffect(() => {
    const currentSearchedMovies = savedMovies.filter((movie) =>
      movieFilter(movie, searchParams)
    )
    setMoviesFound(currentSearchedMovies)
  }, [searchParams, savedMovies])

  const handleModalClose = () => {
    setIsModalOpen(false)
    setModalText('')
  }

  const handleSearchSubmit = (evt) => {
    evt.preventDefault()
    const { query, shorts } = evt.target.elements
    const newSearchParams = {
      query: query.value,
      includeShorts: shorts.checked,
      isSearchDone: true,
    }
    setSearchParams(newSearchParams)
  }

  const handleShortsClick = () => {
    const newSearchParams = {
      ...searchParams,
      includeShorts: !searchParams.includeShorts,
    }
    setSearchParams(newSearchParams)
  }

  return (
    <main className="saved-movies container">
      <Modal isOpen={isModalOpen}>
        <ModalContent onClose={handleModalClose} modalText={modalText} />
      </Modal>

      {isLoading ? null : (
        <SearchForm
          queryString={searchParams.query}
          isShortChecked={searchParams.includeShorts}
          isSearchDone={searchParams.isSearchDone}
          handleSubmit={handleSearchSubmit}
          handleShortsClick={handleShortsClick}
          isRequired={false}
        />
      )}
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          moviesData={moviesFound}
          isSearchDone={searchParams.isSearchDone}
        />
      )}
    </main>
  )
}

export default SavedMovies
