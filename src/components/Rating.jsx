import React, { useState } from 'react';

const StarRating = ({ onRate }) => {
  const [rating, setRating] = useState(0);  
  const [hover, setHover] = useState(0);    

  const handleRating = (rate) => {
    setRating(rate);
    if (onRate) {
      onRate(rate); 
    }
  };

  return (
    <div>
    
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRating(ratingValue)}  
              style={{ display: 'none' }}
            />
            <span
              style={{
                cursor: 'pointer',
                color: ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9',
                fontSize: '30px',
              }}
              onMouseEnter={() => setHover(ratingValue)} 
              onMouseLeave={() => setHover(0)}           
            >
              ★
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
