import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function ClientForm({ onAddClient }) {
  const [cif, setCif] = useState('');
  const [razonSocial, setRazonSocial] = useState('');
  const [personaContacto, setPersonaContacto] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddClient({ cif, razonSocial, personaContacto, email, direccion });
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
      <Button variant="primary" className='mt-3' type="submit">
        Agregar
      </Button>
    </Form>
  );
}

export default ClientForm;