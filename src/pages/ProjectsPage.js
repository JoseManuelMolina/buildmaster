import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import ProjectsList from '../components/ProjectsList';
import ProjectForm from '../components/ProjectForm';
import EditProjectForm from '../components/EditProjectForm';
import api from '../api';

function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);
    const [showAddProject, setShowAddProject] = useState(false);
    const [showEditProject, setShowEditProject] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const [showDeleteError, setShowDeleteError] = useState(false);
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

    const editProject = (project) =>{
        api.put(`/proyectos/${project.id}`, project).then((response) =>{
            setProjects(projects.map((p) => p.id === project.id? project : p));
            setCurrentProject(null);
            setShowEditProject(false);
        })
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
        window.location.href = `/project/${project.id}`;
    };

    const onEditProject = (project) => {
        setCurrentProject(project);
        setShowEditProject(true);
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
                            <EditProjectForm
                                project={currentProject}
                                onEditProject={editProject}
                                show={showEditProject}
                                onHide={() => setShowEditProject(false)}
                            />
                        </>
                    )}
                    <ProjectsList projects={projects} onViewProject={onViewProject} editProject={editProject} onDeleteProject={onDeleteProject} clients={clients}/>
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