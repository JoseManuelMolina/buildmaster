import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

import api from '../api';
import AdvanceForm from '../components/AdvanceForm';
import AdvancesList from '../components/AdvanceList';


function AdvancesPage() {
  const [advances, setAdvances] = useState([]);
  const [projects, setProjects] = useState([]);
  const [currentAdvance, setCurrentAdvance] = useState(null);
  const [showAddAdvance, setShowAddAdvance] = useState(false);
  const [showEditAdvance, setShowEditAdvance] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showDeleteError, setShowDeleteError] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

  useEffect(() =>{
    api.get('/avances').then((response) => {
      setAdvances(response.data);
    })

    api.get('/proyectos').then((response) => {
      setProjects(response.data);
    })
  }, []);
  
  const addAdvance = (advance) => {
    api.post('/avances', advance).then((response) => {
      setAdvances([...advances, response.data]);
      setShowAddAdvance(false);
    });
  };

  const editAdvance = (advance) => {
    api.put(`/avances/editar/${advance.id}`, advance).then((response) =>{
      setAdvances(advances.map((a) => a.id === advance.id? advance: a));
      setCurrentAdvance(null);
      setShowEditAdvance(false);
    });
  }

  const onDeleteAdvance = (advance) =>{
    api.delete(`/avances/borrar/${advance.id}`, advance).then((response) =>{
      setAdvances(advances.filter((a) => a.id !== advance.id));
      setShowDeleteSuccess(true);
    })
    .catch((error) =>{
      setDeleteErrorMessage(error.message);
      setShowDeleteError(true);
    });
  };

  const handleCloseDeleteSuccess = () => {
    setShowDeleteSuccess(false);
  }

  const handleCloseDeleteError = () => {
      setShowDeleteError(false);
  };

  const onViewAdvance = (advance) => {
    setCurrentAdvance(advance);
    setShowEditAdvance(false);
    window.location.href = `/advance/${advance.id}`;
  };
  const onEditAdvance = (advance) => {
    setCurrentAdvance(advance);
    setShowEditAdvance(true);
  }

  return (
  <Container>
    <Row>
      <Col md="12">
        <h1>Avances</h1>
        <Button variant="primary" onClick={() => setShowAddAdvance(true)}>
          Agregar Avance
        </Button>
        <AdvanceForm
          onAddAdvance={addAdvance}
          projects={projects}
          show={showAddAdvance}
          onHide={() => setShowAddAdvance(false)}
        />
        <AdvancesList advances={advances} onViewAdvance={onViewAdvance} editAdvance={editAdvance} onDeleteAdvance={onDeleteAdvance} projects={projects}/>
        <Modal show={showDeleteSuccess} onHide={handleCloseDeleteSuccess}>
          <Modal.Header closeButton>
            <Modal.Title>Avance Eliminado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            El avance se ha borrado exitosamente
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseDeleteSuccess}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showDeleteError} onHide={handleCloseDeleteError}>
          <Modal.Header closeButton>
            <Modal.Title>Error eliminando el avance</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {deleteErrorMessage}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={handleCloseDeleteError}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </Row>
  </Container>
);
}

export default AdvancesPage;