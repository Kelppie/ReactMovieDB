import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RandomMovies from './RandomMovies';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = '4dc9e14e';

  const handleSearch = async () => {
    if (searchTerm === '') return;

    setLoading(true);
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`);
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
        setError('');
      } else {
        setError(response.data.Error);
        setMovies([]);
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Movie Search</h1>
      <div className="search-container">
        <div className="searchbar">
          <input
            type="text"
            className="searchinput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for movies"
          />
          <button className="searchbtn" onClick={handleSearch}>Search</button>
        </div>
      </div>
      
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="movie-list">
        {movies.map((movie) => (
            <div key={movie.imdbID}>
              <Link to={`/movie/${movie.imdbID}`}>
                <img src={movie.Poster} alt={movie.Title} />
                <h3>{movie.Title}</h3>
              </Link>
            </div>
          ))}
      </div>
      <RandomMovies />
    </div>
  );
};

export default Home;
