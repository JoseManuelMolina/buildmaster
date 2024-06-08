import React, { useState } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import ClientDetails from './ClientDetails';
import DeleteClientButton from './DeleteClientButton';

function ClientsList({ clients, onViewClient, editClient, onDeleteClient }) {
  const [showModal, setShowModal] = useState(false);
  const [currentClient, setCurrentClient] = useState({});

  const handleViewClient = (client) => {
    setCurrentClient(client);
    setShowModal(true);
  };

  const handleEditClient = (editedClient) => {
    editClient(editedClient);
    setCurrentClient(editedClient); // Update currentClient state
  }

  const handleCloseModal = () => {
    setCurrentClient(null);
    setShowModal(false);
  };

  const handleDeleteClient = (client) => {
    onDeleteClient(client);
  };

  return (
    <>
      <Table striped hover variant='dark'>
        <thead>
          <tr>
            <th>#</th>
            <th>CIF</th>
            <th>Razón Social</th>
            <th>Persona de Contacto</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.cif}</td>
              <td>{client.razonSocial}</td>
              <td>{client.personaContacto}</td>
              <td>{client.email}</td>
              <td>{client.direccion}</td>
              <td>
                <Button variant="primary" className='me-3' onClick={() => handleViewClient(client)}>
                  Ver
                </Button>
                <DeleteClientButton client={client} onDeleteClient={onDeleteClient} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentClient && (
            <ClientDetails client={currentClient} onEditClient={handleEditClient} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ClientsList;