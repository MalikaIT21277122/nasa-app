import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const Apod = () => {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [pastApodData, setPastApodData] = useState([]);
  const [birthdate, setBirthdate] = useState('');
  const [birthdateApodData, setBirthdateApodData] = useState(null);

  useEffect(() => {
    const fetchApod = async () => {
      try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data from NASA API');
        }
        const data = await response.json();
        setApodData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Error fetching data from NASA API');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch data from NASA API',
        }).then(() => window.location.reload()); // Refresh the page
      }
    };

    const fetchPastApod = async () => {
      try {
        const today = new Date();
        const pastDates = [];
        for (let i = 1; i <= 3; i++) {
          const pastDate = new Date(today);
          pastDate.setDate(today.getDate() - i);
          pastDates.push(pastDate);
        }
        const fetches = pastDates.map(async date => {
          const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
          const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&date=${formattedDate}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data from NASA API');
          }
          return response.json();
        });
        const pastApodResults = await Promise.all(fetches);
        setPastApodData(pastApodResults);
      } catch (error) {
        console.error(error);
        setError('Error fetching past APOD data from NASA API');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch past APOD data from NASA API',
        }).then(() => window.location.reload()); // Refresh the page
      }
    };

    fetchApod();
    fetchPastApod();
  }, []);

  const handleBirthdateSubmit = async (e) => {
    e.preventDefault();
    try {
      //Fetching images from nasa API
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&date=${birthdate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data from NASA API');
      }
      const data = await response.json();
      setBirthdateApodData(data);
    } catch (error) {
      console.error(error);
      setError('Error fetching APOD data for birthdate');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch APOD data for birthdate',
      }).then(() => window.location.reload()); // Refresh the page
    }
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

  // if (error) {
  //   return (
  //     <div className="text-center mt-5">
  //       <p>Error: {error}</p>
  //       <p>Please refresh the page.</p>
  //     </div>
  //   );
  // }

  if (!apodData || !pastApodData.length) {
    return <div className="text-center mt-5">No data available</div>;
  }

  return (
    <div className="container mt-3 pt-4">
      <h1 className="display-4 mb-4 text-center">Astronomy Picture of the Day</h1>
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow mb-4">
            <img src={apodData.url} className="card-img-top" alt={apodData.title} />
            <div className="card-body">
              <h2 className="card-title text-center mb-4">{apodData.title}</h2>
              <p className="card-text">{apodData.explanation}</p>
            </div>
            <div className="card-footer text-muted text-center">
              <small>{apodData.date}</small>
            </div>
          </div>
        </div>
      </div>
      <h2 className="display-5 mb-4 text-center">Past APOD Images</h2>
      <div className="row">
        {pastApodData.map((item, index) => (
          <div className="col-md-4" key={index}>
            <div className="card shadow mb-4">
              <img src={item.url} className="card-img-top" alt={item.title} />
              <div className="card-body">
                <h2 className="card-title text-center mb-4">{item.title}</h2>
                <p className="card-text">{item.explanation}</p>
              </div>
              <div className="card-footer text-muted text-center">
                <small>{item.date}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row mt-5">
        <div className="col-md-8 mx-auto">
          <h2 className="display-5 mb-4 text-center">Watch the APOD for Your Birthdate</h2>
          <form onSubmit={handleBirthdateSubmit}>
            <div className="input-group mb-3">
              <input
                type="date"
                className="form-control"
                placeholder="Enter birthdate"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
              <button className="btn btn-secondary" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
      {birthdateApodData && (
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="card shadow mb-4">
              <img src={birthdateApodData.url} className="card-img-top" alt={birthdateApodData.title} />
              <div className="card-body">
                <h2 className="card-title text-center mb-4">{birthdateApodData.title}</h2>
                <p className="card-text">{birthdateApodData.explanation}</p>
              </div>
              <div className="card-footer text-muted text-center">
                <small>{birthdateApodData.date}</small>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Apod;
