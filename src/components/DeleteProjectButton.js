import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function DeleteProjectButton({ onDeleteProject, project }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDelete = () => {
    console.log('handleDelete called');
    console.log('project:', project);
    if (project) {
      console.log('calling onDeleteProject with project.id:', project.id);
      onDeleteProject(project);
    } else {
      console.log('project is undefined, not calling onDeleteProject');
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
          {project ? (
            <span>
              ¿Estás seguro que quieres eliminar el proyecto "{project.nombre}"?
            </span>
          ) : (
            <span>¿Estás seguro que quieres eliminar este proyecto?</span>
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

export default DeleteProjectButton;