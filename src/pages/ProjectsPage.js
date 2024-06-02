// api.get('/clientes')
// api.post('/clientes', client)
// api.put(`/clientes/editar/${client.id}`, client)
// api.delete(`/clientes/borrar/${client.id}`)
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import ProjectsList from '../components/ProjectsList';
import ProjectForm from '../components/ProjectForm';
import ProjectDetails from '../components/ProjectDetails';
import EditProjectForm from '../components/ProjectClientForm';
import DeleteProjectButton from '../components/DeleteProjectButton';
import api from '../api';

function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);
    const [showAddProject, setShowAddProject] = useState(false);
    const [showEditProject, setShowEditProject] = useState(false);
    const [showDeleteProject, setShowDeleteProject] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const [showDeleteError, setShowDeleteError] = useState(false); // New state variable
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

    useEffect(() =>{
        api.get('/proyectos').then((response) => {
            setProjects(response.data);
        });
        api.get('/clientes').then((response) => {
            setClients(response.data);
        });
    }, []);

    const addProject = (project) => {
        api.post('/proyectos', project).then((response) => {
          setProjects([...projects, response.data]);
          setShowAddProject(false);
        });
    };

    const onDeleteProject = (project) => {
        api.delete(`/proyectos/${project.id}`)
            .then((response) => {
                setProjects(projects.filter((p) => p.id!== project.id));
                setShowDeleteSuccess(true);
            })
            .catch((error) => {
                setDeleteErrorMessage(error.message);
                setShowDeleteError(true); // Show the error modal
            });
    };

    const handleCloseDeleteSuccess = () => {
        setShowDeleteSuccess(false);
    }

    const handleCloseDeleteError = () => {
        setShowDeleteError(false);
    };

    const onViewProject = (project) => {
    setCurrentProject(project);
    setShowEditProject(false);
    setShowDeleteProject(false);
    window.location.href = `/project/${project.id}`;
    };

    return(
        <Container>
            <Row>
                <Col md="12">
                    <h1>Projects</h1>
                    <Button variant="primary" onClick={()=> setShowAddProject(true)}>
                        Add Project
                    </Button>
                    <ProjectForm
                        onAddProject={addProject}
                        clients={clients}
                        show={showAddProject}
                        onHide={() => setShowAddProject(false)}
                    />
                    {currentProject && (
                        <>
                            
                        </>
                    )}
                    <ProjectsList projects={projects} onViewProject={onViewProject}  onDeleteProject={onDeleteProject}/>
                    <Modal show={showDeleteSuccess} onHide={handleCloseDeleteSuccess}>
                        <Modal.Header closeButton>
                            <Modal.Title>Projecto Borrado</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            El proyecto se ha borrado exitosamente
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleCloseDeleteSuccess}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={showDeleteError} onHide={handleCloseDeleteError}>
                        <Modal.Header closeButton>
                            <Modal.Title>Error Eliminando El Proyecto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {deleteErrorMessage}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleCloseDeleteError}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
}

export default ProjectsPage;