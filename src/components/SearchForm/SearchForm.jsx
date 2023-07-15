import { useState } from 'react'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import './SearchForm.css'
import { MESSAGE_EMPTY_QUERY } from '../../constants/constants'

const SearchForm = ({
  queryString,
  isShortChecked,
  isRequired = true,
  isSearchDone,
  handleSubmit,
  handleShortsClick,
}) => {
  const [searchValue, setSearchValue] = useState(queryString)
  const [isShortsChecked, setIsShortsChecked] = useState(isShortChecked)

  const handleChange = ({ target }) => {
    setSearchValue(target.value)
  }

  const handleShortsCheck = () => {
    setIsShortsChecked(!isShortsChecked)
    handleShortsClick()
  }

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit} noValidate>
        <fieldset className="search__request">
          <label className="search__label">
            <input
              className="search__input"
              type="text"
              name="query"
              required={isRequired}
              placeholder="Фильм"
              onChange={handleChange}
              value={searchValue}
            />
          </label>
          <button className="search__submit" type="submit" />
        </fieldset>
        <span className="search__error-message">
          {!searchValue && isSearchDone && isRequired
            ? MESSAGE_EMPTY_QUERY
            : ''}
        </span>
        <FilterCheckbox
          checkHandler={handleShortsCheck}
          isChecked={isShortsChecked}
        />
      </form>
    </section>
  )
}

export default SearchForm
