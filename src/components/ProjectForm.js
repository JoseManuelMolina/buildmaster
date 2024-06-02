import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import moment from 'moment';

function ProjectForm({ onAddProject, clients, show, onHide }) {
  const [nombre, setNombre] = useState('');
  const [presupuesto, setPresupuesto] = useState(0);
  const [fechaInicio, setFechaInicio] = useState('');
  const [plano, setPlano] = useState('');
  const [categoria, setCategoria] = useState('');
  const [clienteId, setClienteId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('clients', clients); // <--- Add this line
    const clienteIdNumber = parseInt(clienteId, 10); // Convert clienteId to a number
    console.log('clienteId', clienteIdNumber, typeof clienteIdNumber);

    const cliente = clients.find((c) => c.id === clienteIdNumber);
    if (!cliente) {
        console.error("No cliente found with id", clienteId);
        return; // or handle the error in some other way
    }

    console.log('cliente', cliente);
    const fechaInicioFormatted = moment(fechaInicio).format('MMM D, YYYY');
    
    onAddProject({
      nombre,
      presupuesto,
      fechaInicio: fechaInicioFormatted,
      plano,
      categoria,
      cliente: {
        id: cliente.id,
        cif: cliente.cif,
        razonSocial: cliente.razonSocial,
        email: cliente.email,
        personaContacto: cliente.personaContacto,
        direccion: cliente.direccion,
      },
    });
    
    setNombre('');
    setPresupuesto(0);
    setFechaInicio('');
    setPlano('');
    setCategoria('');
    setClienteId('');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPresupuesto">
            <Form.Label>Presupuesto</Form.Label>
            <Form.Control
              type="number"
              value={presupuesto}
              onChange={(event) => setPresupuesto(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formFechaInicio">
            <Form.Label>Fecha de Inicio</Form.Label>
            <Form.Control
              type="date"
              value={fechaInicio}
              onChange={(event) => setFechaInicio(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPlano">
            <Form.Label>Plano</Form.Label>
            <Form.Control
              type="text"
              value={plano}
              onChange={(event) => setPlano(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formCategoria">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              type="text"
              value={categoria}
              onChange={(event) => setCategoria(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formCliente">
            <Form.Label>Cliente</Form.Label>
            <Form.Select value={clienteId} onChange={(event) => setClienteId(event.target.value)}>
              <option value="">Seleccione un cliente</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.razonSocial}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ProjectForm;