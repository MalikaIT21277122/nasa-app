import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomNavbar = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
          <Nav.Link as={Link} to="/apod" className="nav-link">APOD</Nav.Link>
          <Nav.Link as={Link} to="/mars-rover-photos" className="nav-link">Mars Rover Photos</Nav.Link>
          <Nav.Link as={Link} to="/epic" className="nav-link">EPIC</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Brand as={Link} to="/" className="navbar-brand ml-auto">NASA App</Navbar.Brand>
    </Navbar>
  );
};

export default CustomNavbar;
