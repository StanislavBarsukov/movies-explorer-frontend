import React from 'react';
import './SearchForm.css';
import Search from '../../images/search.svg';

function SearchForm() {

  return (
    <section className="search">
      <form className="search__form">
        <input
          className="search__input"
          placeholder="Фильм"
        />
          <button
            className="search__button"
            type="submit"
          >
            <img src={Search} alt="Значек в виде лупы" className="search__img"/>
          </button>
      </form>
      <span className="search__error">Ничего не найдено</span>
    </section>
  );
}

export default SearchForm;
