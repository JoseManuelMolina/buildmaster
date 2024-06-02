import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function EditClientForm({ client, onEditClient }) {
  const [cif, setCif] = useState(client.cif);
  const [razonSocial, setRazonSocial] = useState(client.razonSocial);
  const [personaContacto, setPersonaContacto] = useState(client.personaContacto);
  const [email, setEmail] = useState(client.email);
  const [direccion, setDireccion] = useState(client.direccion);

  const handleSubmit = (event) => {
    event.preventDefault();
    onEditClient({ ...client, cif, razonSocial, personaContacto, email, direccion });
    setCif('');
    setRazonSocial('');
    setPersonaContacto('');
    setEmail('');
    setDireccion('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formCIF">
        <Form.Label>CIF</Form.Label>
        <Form.Control
          type="text"
          value={cif}
          onChange={(event) => setCif(event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formRazonSocial">
        <Form.Label>Razón Social</Form.Label>
        <Form.Control
          type="text"
          value={razonSocial}
          onChange={(event) => setRazonSocial(event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formPersonaContacto">
        <Form.Label>Persona de Contacto</Form.Label>
        <Form.Control
          type="text"
          value={personaContacto}
          onChange={(event) => setPersonaContacto(event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formDireccion">
        <Form.Label>Dirección</Form.Label>
        <Form.Control
          type="text"
          value={direccion}
          onChange={(event) => setDireccion(event.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
}

export default EditClientForm;