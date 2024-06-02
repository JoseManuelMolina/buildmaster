import React from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import ClientsPage from './pages/ClientsPage';
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/ProjectsPage';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function App() {
  console.log('Rendering App component');
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row">
          <Navbar bg="light" expand="lg" fixed="top">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/clients">Clients</Nav.Link>
                <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="col-md-12">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;