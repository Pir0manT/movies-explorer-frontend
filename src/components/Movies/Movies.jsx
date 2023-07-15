import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import './Movies.css'
import { useEffect, useState } from 'react'
import Preloader from '../Preloader/Preloader'
import Modal from '../Modal/Modal'
import ModalContent from '../Modal/ModalContent'
import { useUserMoviesContext } from '../../contexts/UserMoviesContext'
import mainApi from '../../utils/MainApi'
import moviesApi from '../../utils/MoviesApi'
import { getCardsAmount, movieFilter } from '../../utils/utils'
import { useDebouncedFunction } from '../../hooks/useDebouncedFunction'

const Movies = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalText, setModalText] = useState('')
  const [searchParams, setSearchParams] = useState({
    query: '',
    includeShorts: false,
    isSearchDone: false,
  })
  const debouncedResize = useDebouncedFunction(handleResize)
  const [cardsAmount, setCardsAmount] = useState(getCardsAmount())
  const [moviesToDisplay, setMoviesToDisplay] = useState([])
  const [moviesFound, setMoviesFound] = useState([])
  const [allMovies, setAllMovies] = useState([])
  const { setSavedMovies } = useUserMoviesContext()

  // Однократный эффект при монтировании /movies
  useEffect(() => {
    setIsLoading(true)

    // Подтягиваем все фильмы из стороннего API
    // и сохраненные фильмы из нашего API
    moviesApi
      .getAllMovies()
      .then((movies) => {
        setAllMovies(movies)
        return mainApi.getSavedMovies()
      })
      .then((res) => {
        setSavedMovies(res)

        // Подтягиваем найденные предыдущем поиском фильмы
        const storedMovies = JSON.parse(localStorage.getItem('foundMovies'))
        if (storedMovies) setMoviesFound(storedMovies)

        // Подтягиеваем данные предыдущего поиска
        const search = JSON.parse(localStorage.getItem('search'))
        if (search) setSearchParams(search)
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
    if (searchParams.query) {
      // console.log('Эффект изменения параметров поиска: ', searchParams.query)
      const currentSearchedMovies = allMovies.filter((movie) =>
        movieFilter(movie, searchParams)
      )
      setMoviesFound(currentSearchedMovies)
      localStorage.setItem('foundMovies', JSON.stringify(currentSearchedMovies))
    }
  }, [searchParams])

  // Эффект вызывается при изменении размеров экрана и при изменении набора
  // найденных фильмов
  useEffect(() => {
    setMoviesToDisplay(moviesFound.slice(0, cardsAmount.totalCards))
  }, [cardsAmount, moviesFound])

  // Эффект устанавливает и удаляет слушатель
  // изменения размеров экрана
  // фактически выполняется один раз, поскольку
  // слушатель создается через useCallback
  useEffect(() => {
    window.addEventListener('resize', debouncedResize)

    return () => window.removeEventListener('resize', debouncedResize)
  }, [debouncedResize])

  const handleModalClose = () => {
    setIsModalOpen(false)
    setModalText('')
  }

  const handleShortsClick = () => {
    const newSearchParams = {
      ...searchParams,
      includeShorts: !searchParams.includeShorts,
    }
    localStorage.setItem('search', JSON.stringify(newSearchParams))
    setSearchParams(newSearchParams)
  }

  const handleSearchSubmit = (evt) => {
    evt.preventDefault()
    const { query, shorts } = evt.target.elements

    if (query.value) {
      const newSearchParams = {
        query: query.value,
        includeShorts: shorts.checked,
        isSearchDone: true,
      }
      localStorage.setItem('search', JSON.stringify(newSearchParams))
      setSearchParams(newSearchParams)
    }
  }

  const handleMoreMovies = () => {
    const moviesToShow = moviesFound.slice(
      moviesToDisplay.length,
      moviesToDisplay.length + cardsAmount.extraCards
    )

    setMoviesToDisplay([...moviesToDisplay, ...moviesToShow])
  }

  function handleResize() {
    setCardsAmount(getCardsAmount())
  }

  return (
    <main className="movies container">
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
        />
      )}

      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          moviesData={moviesToDisplay}
          isSearchDone={searchParams.isSearchDone}
        />
      )}
      {moviesToDisplay.length < moviesFound.length ? (
        <button
          className="movies__more"
          type="button"
          onClick={handleMoreMovies}
        >
          Ещё
        </button>
      ) : null}
    </main>
  )
}

export default Movies
