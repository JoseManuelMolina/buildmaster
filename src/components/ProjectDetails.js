import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import moment from 'moment';

function ProjectDetails({ project, onEditProject, clients }) {
  const [editing, setEditing] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProject, setEditedProject] = useState({
    ...project,
     fechaInicioDisplay: project.fechaInicio,
     fechaInicioApi: project.fechaInicio,
   });
  const [clienteId, setClienteId] = useState("");

  useEffect(() => {
    if (project.cliente) {
      setClienteId(project.cliente.id);
    }
  }, [project]);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleSave = () => {
    console.log('Edited Project:', editedProject);
    onEditProject({...editedProject, fechaInicio: editedProject.fechaInicioApi});
    setShowEditModal(false);
  };

  const handleCancel = () => {
    setShowEditModal(false);
    setEditedProject(project);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(`Updating ${name} with value ${value}`);
    if (name === 'cliente') {
      setEditedProject((prevProject) => ({...prevProject, cliente: {...prevProject.cliente, [event.target.name]: value } }));
    } else if (name === 'fechaInicio') {
      if (value === "") {
        setEditedProject((prevProject) => ({...prevProject, fechaInicioDisplay: null, fechaInicioApi: null }));
      } else {
        const formattedDateDisplay = moment(value).format('YYYY-MM-DD');
        const formattedDateApi = moment(value).format('MMM D, YYYY');
        setEditedProject((prevProject) => ({...prevProject, fechaInicioDisplay: formattedDateDisplay, fechaInicioApi: formattedDateApi }));
      }
    } else {
      setEditedProject((prevProject) => ({...prevProject, [name]: value }));
    }
  };

  const handleClientChange = (event) => {
    const clientId = parseInt(event.target.value, 10);
    const selectedClient = clients.find((c) => c.id === clientId);
    if (!selectedClient) {
      console.log("No client found with ID", clientId);
    } else {
      console.log(`Updating cliente with value ${selectedClient}`);
      setEditedProject((prevProject) => ({...prevProject, cliente: selectedClient }));
    }
  };

  return (
    <Card>
      <Card.Header>{project.nombre}</Card.Header>
      <Card.Body>
        {!editing? (
          <>
            <Card.Text>Categoría: {project.categoria}</Card.Text>
            <Card.Text>Fecha de Inicio: {project.fechaInicio}</Card.Text>
            <Card.Text>Presupuesto: {project.presupuesto}€</Card.Text>
            <Card.Text>Cliente: {project.cliente && project.cliente.razonSocial || 'No tiene un cliente asignado'}</Card.Text>
            <Card.Img src={project.plano} alt={project.nombre} style={{ width: 200, height: 200 }} />
          </>
        ) : null}
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" onClick={handleEdit}>
          Edit
        </Button>
        <Modal show={showEditModal} onHide={handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="nombre">
                <Form.Label>Nombre del Proyecto</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={editedProject.nombre}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="plano">
                <Form.Label>Plano del Proyecto</Form.Label>
                <Form.Control
                  type="text"
                  name="plano"
                  value={editedProject.plano}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="fechaInicio">
                <Form.Label>Fecha de Inicio</Form.Label>
                <Form.Control
                  type="date"
                  name="fechaInicio"
                  value={editedProject.fechaInicioDisplay}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="presupuesto">
                <Form.Label>Presupuesto</Form.Label>
                <Form.Control
                  type="number"
                  name="presupuesto"
                  value={editedProject.presupuesto}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formCategoria">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="text"
                  value={editedProject.categoria}
                  onChange={(event) => setEditedProject((prevProject) => ({...prevProject, categoria: event.target.value }))}
                  placeholder="Categoria"
                />
              </Form.Group>
              <Form.Group controlId="formCliente">
                <Form.Label>Cliente</Form.Label>
                <Form.Select value={editedProject.cliente?.id} onChange={handleClientChange}>
                  <option value="">Seleccione un cliente</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.razonSocial}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Footer>
    </Card>
  );
}

export default ProjectDetails;