import { useEffect, useState } from 'react';
import './App.css';
import { getMovieList, searchMovie } from "./api"

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]); // Initialize as an empty array

  useEffect(() => {
    getMovieList().then((result) => {
      // Ensure that result is an array or has array-like structure before setting state
      if (Array.isArray(result)) {
        setPopularMovies(result);
      } else {
        // Handle case where result is not an array (e.g., log error, set to empty array, etc.)
        console.error("Expected an array from getMovieList, received:", result);
        setPopularMovies([]);
      }
    })
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
          <div className='Movie-wrapper' key={i}>
            <div className='Movie-title'>{movie.title}</div>
            <img className='Movie-image' 
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} alt={movie.title} />
            <div className='Movie-date'>Release: {movie.release_date}</div>
            <div className='Movie-rate'>{movie.vote_average}</div>
          </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q)
      setPopularMovies(query.results)
  }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pencarian Film</h1>
        <input 
        placeholder='Cari film kesayangan..' 
        className='Movie-search' 
        onChange={({ target }) => search(target.value)}>
        </input>
        <div className='Movie-container'>
         <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;
