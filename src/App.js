import React from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import ClientsPage from './pages/ClientsPage';
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/ProjectsPage';
import AdvancesPage from './pages/AdvancesPage';
import SuppliersPage from './pages/SuppliersPage';
import MaterialsPage from './pages/MaterialsPage';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './logo.svg';

function App() {
  console.log('Rendering App component');
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row">
          <Navbar  bg="dark" data-bs-theme="dark" expand="lg" fixed="top" className='ps-3'>
            <Navbar.Brand href='/'>
              <img 
              src={logo}
               alt='Logo'
               width={30} 
               height={30}
              className='d-inline-block align-top'/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/" className='text-light'>Inicio</Nav.Link>
                <Nav.Link as={Link} to="/clients" className='text-light'>Clientes</Nav.Link>
                <Nav.Link as={Link} to="/projects" className='text-light'>Proyectos</Nav.Link>
                <Nav.Link as={Link} to="/advances" className='text-light'>Advances</Nav.Link>
                <Nav.Link as={Link} to="/suppliers" className='text-light'>Proveedores</Nav.Link>
                <Nav.Link as={Link} to="/materials" className='text-light'>Materiales</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="col-md-12 mt-5 pt-3" >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/advances" element={<AdvancesPage />} />
              <Route path="/suppliers" element={<SuppliersPage />} />
              <Route path="/materials" element={<MaterialsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;