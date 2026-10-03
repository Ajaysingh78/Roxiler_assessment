import React, { useState } from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({
  rating = 0,
  maxStars = 5,
  size = 20,
  interactive = false,
  onRate = null,
  disabled = false
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = hoverRating || Math.round(rating);

  const handleClick = (starValue) => {
    if (interactive && onRate && !disabled) {
      onRate(starValue);
    }
  };

  const handleMouseEnter = (starValue) => {
    if (interactive && !disabled) {
      setHoverRating(starValue);
    }
  };

  const handleMouseLeave = () => {
    if (interactive && !disabled) {
      setHoverRating(0);
    }
  };

  return (
    <div
      className="star-rating-widget"
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={`Rating: ${rating} out of ${maxStars} stars`}
    >
      {Array.from({ length: maxStars }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= displayRating;

        return (
          <button
            key={starValue}
            type="button"
            className={`star-btn ${interactive && !disabled ? 'interactive' : ''} ${isFilled ? 'filled' : ''}`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            disabled={!interactive || disabled}
            aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
            style={{ cursor: interactive && !disabled ? 'pointer' : 'default' }}
          >
            <Star
              size={size}
              strokeWidth={isFilled ? 0 : 1.5}
              fill={isFilled ? 'var(--color-star)' : 'none'}
              color={isFilled ? 'var(--color-star)' : 'var(--color-star-empty)'}
            />
          </button>
        );
      })}
    </div>
  );
};
