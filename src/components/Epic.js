import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const Epic = () => {
  const [epicData, setEpicData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpicData = async () => {
      try {
        //Fetching images from nasa API
        const response = await fetch(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${process.env.REACT_APP_NASA_API_KEY}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data from NASA EPIC API');
        }
        const data = await response.json();
        // Limit data to the first 9 items
        const limitedData = data.slice(0, 9);
        setEpicData(limitedData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Error fetching data from NASA EPIC API');
        setLoading(false);
      }
    };

    fetchEpicData();
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
        <h1 className="display-4">Explore NASA EPIC Images</h1>
        <p className="lead">Discover stunning natural images captured by NASA's EPIC instrument.</p>
      </header>
      <Row xs={1} md={2} lg={3} className="g-4">
        {epicData.map((item, index) => (
          <Col key={index}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={`https://api.nasa.gov/EPIC/archive/natural/${item.date.split(' ')[0].replaceAll('-', '/')}/png/${item.image}.png?api_key=${process.env.REACT_APP_NASA_API_KEY}`} alt={item.caption} />
              <Card.Body>
                <Card.Title className="text-center">{item.caption}</Card.Title>
                <Card.Text className="text-center">Date: {item.date.split(' ')[0]}</Card.Text>
                <Card.Text className="text-center">Time: {item.date.split(' ')[1]}</Card.Text>
                <Card.Text className="text-center">Centroid Coordinates: {item.centroid_coordinates.lat}, {item.centroid_coordinates.lon}</Card.Text>
                <Card.Text className="text-center">Moon: {item.dscovr_j2000_position.x > 0 ? 'Visible' : 'Not Visible'}</Card.Text>
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

export default Epic;
