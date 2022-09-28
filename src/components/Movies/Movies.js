import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';
import apiMovies from "../../utils/ApiMovies/ApiMovies";

function Movies({}) {
  const [ movies, setIsMovies] = React.useState([]);

    React.useEffect(() => {
      apiMovies.getMovies()
        .then((data) => {
          setIsMovies(data)
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });

    }, []);

    const [amount, setAmount] = React.useState(() => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1024) {
        return 12
      } else if (windowWidth >= 450 && windowWidth >= 670) {
        return 8
      } else  {
        return 5
      }
    });

    const [moviesMore, setMoviesMore] = React.useState(() => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1024) {
        return 3
      } else if (windowWidth >= 450 && windowWidth >= 670) {
        return 2
      } else  {
        return 2
      }
    });

    const onChangeScreenWidth = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1024) {
        setAmount(12)
        setMoviesMore(3)
      } else if (windowWidth >= 450 && windowWidth >= 670) {
        setAmount(8)
        setMoviesMore(2)
      } else {
        setAmount(5)
        setMoviesMore(2)
      }
    };

    const renderMovies = movies.slice(0, amount);

    const addMore = () => {
      setAmount(more => more + moviesMore)
    }

    React.useEffect(() => {
      window.addEventListener('resize', onChangeScreenWidth);
    }, []);

  return (
    <main>
      <Header/>
      <SearchForm/>
      <MoviesCardList  movies={renderMovies} />
      <More onClick={addMore}/>
      <Footer/>
    </main>
  );
}

export default Movies;
