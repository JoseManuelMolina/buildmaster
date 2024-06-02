import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

function ClientDetails({ client, onEditClient }) {
  const [editing, setEditing] = useState(false);
  const [editedClient, setEditedClient] = useState(client);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onEditClient(editedClient);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedClient(client);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedClient((prevClient) => ({...prevClient, [name]: value }));
  };

  return (
    <Card>
      <Card.Header>{client.razonSocial}</Card.Header>
      <Card.Body>
        {editing? (
          <Form>
            <Form.Group controlId="razonSocial">
              <Form.Label>Razón Social</Form.Label>
              <Form.Control
                type="text"
                name="razonSocial"
                value={editedClient.razonSocial}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="cif">
              <Form.Label>CIF</Form.Label>
              <Form.Control
                type="text"
                name="cif"
                value={editedClient.cif}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="personaContacto">
              <Form.Label>Persona de Contacto</Form.Label>
              <Form.Control
                type="text"
                name="personaContacto"
                value={editedClient.personaContacto}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editedClient.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="direccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={editedClient.direccion}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        ) : (
          <>
            <Card.Title>CIF: {client.cif}</Card.Title>
            <Card.Text>Persona de Contacto: {client.personaContacto}</Card.Text>
            <Card.Text>Email: {client.email}</Card.Text>
            <Card.Text>Dirección: {client.direccion}</Card.Text>
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

export default ClientDetails;