import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import CustomNavbar from './components/Navbar';
import Home from './components/Home';
import Apod from './components/Apod';
import MarsRoverPhotos from './components/MarsRoverPhotos';
import Epic from './components/Epic';

function App() {
  return (
    <Router>
      <div className="App">
        <CustomNavbar />
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/apod" element={<Apod />} />
          <Route path="/mars-rover-photos" element={<MarsRoverPhotos />} />
          <Route path="/epic" element={<Epic />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
