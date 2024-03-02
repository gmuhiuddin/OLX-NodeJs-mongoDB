import React from 'react';
import './style.css';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<div key={i} className="star full" />);
    }

    if (hasHalfStar) {
      stars.push(<div key="half" className="star half" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<div key={`empty${i}`} className="star empty" />);
    }

    return stars;
  };

  return <div className="star-rating">{renderStars()}</div>;
};

export default StarRating;
