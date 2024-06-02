import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

function ProjectDetails({ project, onEditProject }) {
  const [editing, setEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(project);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onEditProject(editedProject);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedProject(project);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProject((prevProject) => ({...prevProject, [name]: value }));
  };

  return (
    <Card>
      <Card.Header>{project.nombre}</Card.Header>
      <Card.Body>
        {editing? (
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
            <Form.Group controlId="descripcion">
              <Form.Label>Descripción del Proyecto</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={editedProject.descripcion}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="fechaInicio">
              <Form.Label>Fecha de Inicio</Form.Label>
              <Form.Control
                type="date"
                name="fechaInicio"
                value={editedProject.fechaInicio}
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
          </Form>
        ) : (
          <>
            <Card.Text>Categoría: {project.categoria}</Card.Text>
            <Card.Text>Fecha de Inicio: {project.fechaInicio}</Card.Text>
            <Card.Text>Presupuesto: {project.presupuesto}€</Card.Text>
            <Card.Text>Cliente: {project.cliente.razonSocial}</Card.Text>
            <Card.Img src={project.plano} alt={project.nombre} style={{ width: 200, height: 200 }} />
          </>
        )}
      </Card.Body>
      <Card.Footer>
        {editing? (
          <>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={handleEdit}>
            Edit
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
}

export default ProjectDetails;