import React, { useState, useEffect } from 'react';
import '../Home.css';

const Home = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        //Fetching image from nasa API for the home page
        const response = await fetch('https://images-api.nasa.gov/search?q=space&media_type=image');
        if (!response.ok) {
          throw new Error('Failed to fetch images from NASA API');
        }
        const data = await response.json();
        if (!data.collection || !data.collection.items) {
          throw new Error('No data received from the NASA Images API');
        }
        const fetchedImages = data.collection.items.slice(0, 6); // Limit to 6 images
        setImages(fetchedImages);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Error fetching images from NASA API');
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleHover = () => {
    setHovered(true);
  };

  const handleLeave = () => {
    setHovered(false);
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-5">Error: {error}</div>;
  }

  const thirdImage = images.length >= 3 ? images[2].links[0].href : '';

  return (
    <div className="home-background-container">
      <div
        className="home-background"
        style={{ backgroundImage: `url(${thirdImage})` }}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <div className={`overlay ${hovered ? 'active' : ''}`} onClick={toggleInfo}>
        <h2 className="app-description fw-bold text-white text-uppercase border-bottom border-3 border-white pb-3 mb-4">Welcome to NASA Images App</h2>
<p className="app-details lead text-white">Explore stunning images of space from NASA's extensive collection.</p>

        </div>
        <button className="info-button" onClick={toggleInfo}>ℹ️</button>
      </div>
      {showInfo && (
        <div className="info-modal">
          <div className="modal-content">
            <span className="close" onClick={toggleInfo}>&times;</span>
            <h3 className="info-title">Pages Information</h3>
            <ul className="info-list">
              <li>APOD - Astronomy Picture of the Day</li>
              <li>Mars Rover Photos - Pictures of Mars taken from the curiosity rover.</li>
              <li>EPIC - Earth Polychromatic Imaging Camera</li>
            </ul>
            <p className="creator-info">Made by Malika Degaldoruwa</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
