import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const MarsRoverPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        //Fetching images from nasa API
        const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=2&api_key=${process.env.REACT_APP_NASA_API_KEY}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data from Mars Rover API');
        }
        const data = await response.json();
        // Limit photos to the first 9 images
        const limitedPhotos = data.photos.slice(0, 9);
        setPhotos(limitedPhotos);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Error fetching data from Mars Rover API');
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

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

  return (
    <div className="container mt-3 pt-4">
      <header className="text-center mb-4">
        <h1 className="display-4">Explore Mars Rover Photos</h1>
        <p className="lead">Discover captivating images captured by NASA's Curiosity rover on Mars.</p>
      </header>
      <Row xs={1} md={3} className="g-4">
        {photos.map((photo, index) => (
          <Col key={index}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={photo.img_src} alt={`Mars Rover Photo ${index + 1}`} />
              <Card.Body>
                <Card.Title className="text-center">Mars Rover Photo {index + 1}</Card.Title>
                <Card.Text><strong>Date:</strong> {photo.earth_date}</Card.Text>
                <Card.Text><strong>Rover:</strong> {photo.rover.name}</Card.Text>
                <Card.Text><strong>Camera:</strong> {photo.camera.full_name}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <br/>
      <br/>
    </div>
  );
};

export default MarsRoverPhotos;