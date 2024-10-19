import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RandomMovies from './RandomMovies';
import StarRating from './Rating';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const API_KEY = '4dc9e14e';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
        setMovie(data.Response === 'True' ? data : null); 
      } catch (error) {
        setMovie(null); 
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const savedRating = localStorage.getItem(`rating-${id}`);
    if (savedRating) {
      setUserRating(JSON.parse(savedRating)); 
    }
  }, [id]);

  const handleRating = (rating) => {
    setUserRating(rating);  
    localStorage.setItem(`rating-${id}`, JSON.stringify(rating));
  };

if (!movie) {
    return <p id="loading-text">Loading¬</p>; 
  }

  return (
    <div>
    <div class="detail-container">
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>

      <h3>Rate this movie:</h3>
      <StarRating onRate={handleRating} />

      {userRating > 0 && <p id="rating-text">Your rating: {userRating}/5</p>}

      <Link to="/">
        <button>Home</button>
      </Link>
      
    </div>
    <RandomMovies/>
    </div>
  );
};
export default MovieDetail;
