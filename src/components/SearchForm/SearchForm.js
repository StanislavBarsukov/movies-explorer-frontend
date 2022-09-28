import React from 'react';
import './SearchForm.css';
import Search from '../../images/search.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ onSearch, message, onShort}) {
  const [search, setSearch] = React.useState('');

  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(search)
  }
  return (
    <section className="search">
      <form className="search__form" noValidate onSubmit={handleSubmit}>
        <input
          className="search__input"
          placeholder="Фильм"
          value={search}
          id="search"
          name="search"
          type="text"
          autoComplete="off"
          maxLength="40"
          onChange={handleChange}
        />
          <button
            className="search__button"
            type="submit"
            onClick={handleSubmit}
          >
            <img src={Search} alt="Значек в виде лупы" className="search__img"/>
          </button>
      </form>
      <span className="search__error">{message}</span>
      <FilterCheckbox onShort={onShort}/>
    </section>
  );
}

export default SearchForm;
