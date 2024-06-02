import React, { useState } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import ProjectDetails from './ProjectDetails';
import DeleteProjectButton from './DeleteProjectButton';

function ProjectsList({ projects, onViewProject, onDeleteProject }) {
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState({});

  if (!projects || projects.length === 0) {
    return <div>Cargando...</div>; // o algún otro mensaje de carga
  }

  const handleEditProject = (editedProject) => {
    setCurrentProject(editedProject);
  };

  const handleViewProject = (project) => {
    setCurrentProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setCurrentProject(null);
    setShowModal(false);
  };

  const handleDeleteProject = (project) => {
    onDeleteProject(project);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Presupuesto</th>
            <th>Fecha de Inicio</th>
            <th>Categoría</th>
            <th>Plano</th>
            <th>Cliente</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
            return (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.nombre}</td>
                <td>{project.presupuesto}</td>
                <td>{project.fechaInicio}</td>
                <td>{project.categoria}</td>
                <td>
                  <img
                    src={project.plano}
                    alt={project.nombre}
                    style={{ width: 200, height: 200 }}
                  />
                </td>
                <td>{project.cliente?.razonSocial}</td>
                <td>
                  <Button variant="primary" onClick={() => handleViewProject(project)}>
                    View
                  </Button>
                  <DeleteProjectButton project={project} onDeleteProject={handleDeleteProject} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentProject && (
            <ProjectDetails project={currentProject} onEditProject={handleEditProject} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProjectsList;