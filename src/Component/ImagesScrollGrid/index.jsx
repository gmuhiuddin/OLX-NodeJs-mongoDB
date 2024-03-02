import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import './style.css'; // CSS file for styling

const ImageGrid = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const showNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const showPrevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className='container'>
    <div className="image-grid-container">
      <FontAwesomeIcon className="fa-icon fa-arrow-left" onClick={showPrevImage} icon={faArrowLeft} />
  
        <img
          className="image"
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
        />
        <div className='image-counting-container'>{currentIndex + 1}/{images.length}</div>
  
      <FontAwesomeIcon className="fa-icon fa-arrow-right" onClick={showNextImage} icon={faArrowRight} />
    </div>
  </div>
  );
};

export default ImageGrid;