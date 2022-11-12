import React from 'react';
import './SearchForm.css';
import Search from '../../images/search.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';

function SearchForm({ onSearch, onSearchSave, message, onShort }) {
  const location = useLocation();
  const [messageError, setMessageError] = React.useState('');
  const [searchSave, setSearchSave] = React.useState('');

  const [search, setSearch] = React.useState(()=>{
    const nameFilm = localStorage.getItem('search');
    const initialValue = JSON.parse(nameFilm);
    return  null || initialValue;
  });

  React.useEffect(() => {
      localStorage.setItem('search', JSON.stringify(search));
  }, [search]);

  const handleInputMovies = (e) => {
    e.preventDefault()
    const { value } = e.target
    setSearch(value)

  }

  const  handleInputSaveMovies = (e) => {
    e.preventDefault()
    const { value } = e.target
    setSearchSave(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (location.pathname === '/movies') {
      if(!search?.length) {
        return setMessageError('Нужно ввести ключевое слово')
      } else {
        onSearch(search)
      }
    } else if (location.pathname === '/save-movies') {
      if(!searchSave?.length) {
        return setMessageError('Нужно ввести ключевое слово')
      } else {
        onSearchSave(searchSave)
      }
    }
  }

  return (
    <section className="search">
      <form className="search__form" noValidate onSubmit={handleSubmit}>
        { location.pathname === '/movies' &&( <input
          className="search__input"
          placeholder="Введите название Фильма"
          value={search ?? ''}
          id="search"
          name="search"
          type="text"
          autoComplete="off"
          maxLength="40"
          onChange={handleInputMovies}
        />
        )}
        { location.pathname === '/save-movies' &&(<input
          className="search__input"
          placeholder="Введите название Фильма"
          value={searchSave}
          id="search"
          name="search"
          type="text"
          autoComplete="off"
          maxLength="40"
          onChange={handleInputSaveMovies}
        />
        )}
        <button
            className="search__button"
            type="submit"
            onClick={handleSubmit}
          >
            <img src={Search} alt="Значек в виде лупы" className="search__img"/>
          </button>
      </form>
      <span className="search__error">{ !search && !searchSave ? message || messageError : '' }</span>
      <FilterCheckbox onShort={onShort}/>
    </section>
  );
}

export default SearchForm;

/*
const [searchSave, setSearchSave] = React.useState(()=>{
    const nameFilmSave = localStorage.getItem('searchSave');
    const initialValueSave = JSON.parse(nameFilmSave);
    return  null || initialValueSave;
  });

  React.useEffect(() => {
      localStorage.setItem('searchSave', JSON.stringify(searchSave));
  }, [searchSave]);

 */

