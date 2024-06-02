import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function DeleteClientButton({ onDeleteClient, client }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDelete = () => {
    console.log('handleDelete called');
  console.log('client:', client);
  if (client) {
    console.log('calling onDeleteClient with client.id:', client.id);
    onDeleteClient(client);
  } else {
    console.log('client is undefined, not calling onDeleteClient');
  }
  setShowConfirmModal(false);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      <Button variant="danger" onClick={() => setShowConfirmModal(true)}>
        Delete
      </Button>
      <Modal show={showConfirmModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {client ? (
            <span>
              ¿Estás seguro que quieres eliminar a "{client.razonSocial}"?
            </span>
          ) : (
            <span>¿Estás seguro que quieres eliminar este cliente?</span>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteClientButton;