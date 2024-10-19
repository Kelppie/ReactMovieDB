import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RandomMovies = () => {
    const [randomMovies, setRandomMovies] = useState([]);
    const API_KEY = '4dc9e14e';


    useEffect(() => {
    const fetchRandomMovies = async () => {
      const randomSearches = [
        'Avengers', 'Batman', 'Star Wars', 'Matrix', 'Harry Potter', 
        'Dragon Ball', 'Alien', 'Rocky', 'Halloween', 'Top Gun', 
        'Godfather', 'Lord of the Rings', 'Pirates', 'Indiana Jones'
      ];
  
      const selectedQueries = [];
      while (selectedQueries.length < 5) {
        const randomQuery = randomSearches[Math.floor(Math.random() * randomSearches.length)];
        if (!selectedQueries.includes(randomQuery)) {
          selectedQueries.push(randomQuery);
        }
      }
  
      try {
        const moviePromises = selectedQueries.map(query => 
          axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
        );
  
        const responses = await Promise.all(moviePromises);
  
        let movies = [];
        responses.forEach(response => {
          if (response.data.Response === 'True') {
            movies = [...movies, ...response.data.Search];
          }
        });
  
        const shuffledMovies = movies.sort(() => 0.5 - Math.random()).slice(0, 10);
  
        setRandomMovies(shuffledMovies);
      } catch (error) {
        console.log('Error fetching random movies:', error);
      }
    };
  
    fetchRandomMovies();
  }, []);

  return (
    <div>
    <h2>Popular Movies</h2>
      <div className="random-movie-list">
        {randomMovies.map((movie) => (
          <div key={movie.imdbID}>
            <Link to={`/movie/${movie.imdbID}`}>
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RandomMovies;