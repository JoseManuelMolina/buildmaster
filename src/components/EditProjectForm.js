import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import moment from 'moment';

function EditProjectForm({ project, onEditProject, clients }) {
  const [nombre, setNombre] = useState(project.nombre);
  const [presupuesto, setPresupuesto] = useState(project.presupuesto);
  const [fechaInicio, setFechaInicio] = useState(project.fechaInicio);
  const [plano, setPlano] = useState(project.plano);
  const [categoria, setCategoria] = useState(project.categoria);
  const [clienteId, setClienteId] = useState(project.cliente.id);

  const handleSubmit = (event) => {
    event.preventDefault();
    const fechaInicioFormatted = moment(fechaInicio).format('MMM D, YYYY');
    console.log('fechaFormatted', fechaInicioFormatted);
    console.log('clienteId', clienteId)
    console.log('razonSocial', project.cliente.razonSocial)

    onEditProject({
      ...project,
      nombre,
      presupuesto,
      fechaInicio: fechaInicioFormatted,
      plano,
      categoria,
      cliente: {
        id: clienteId,
        cif: project.cliente.cif,
        razonSocial: project.cliente.razonSocial,
        email: project.cliente.email,
        personaContacto: project.cliente.personaContacto,
        direccion: project.cliente.direccion,
      },
    });
  };

  return (
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
          {/* You need to provide the list of clients here */}
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.razonSocial}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
}

export default EditProjectForm;