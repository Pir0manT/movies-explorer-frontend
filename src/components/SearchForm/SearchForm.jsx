import { useState } from 'react'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import './SearchForm.css'

const SearchForm = ({
  queryString,
  isShortChecked,
  searchErrorMessageRef,
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
              placeholder="Фильм"
              onChange={handleChange}
              value={searchValue}
            />
          </label>
          <button className="search__submit" type="submit" />
        </fieldset>
        <span className="search__error-message" ref={searchErrorMessageRef} />
        <FilterCheckbox
          checkHandler={handleShortsCheck}
          isChecked={isShortsChecked}
        />
      </form>
    </section>
  )
}

export default SearchForm
