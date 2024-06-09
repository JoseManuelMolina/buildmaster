import React, { useState, useEffect } from 'react';
import {Card, Button, Form, Modal } from 'react-bootstrap';
import moment from 'moment';

function AdvanceDetails({ advance, onEditAdvance, projects}) {
    const [editing, setEditing] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedAdvance, setEditedAdvance] = useState({
        ...advance,
        fechaDisplay: advance.fecha,
        fechaApi: advance.fecha,
    });
    const [projectId, setprojectId] = useState("");

    useEffect(() => {
        if (advance.proyecto) {
            setprojectId(advance.proyecto.id);
        }
    }, [advance]);

    const handleEdit = () => {
        setShowEditModal(true);
    }

    const handleSave = () => {
        console.log('Edited Advance:', editedAdvance);
        onEditAdvance({...editedAdvance, fecha: editedAdvance.fechaApi});
        setShowEditModal(false);
    };

    const handleCancel = () => {
        setShowEditModal(false);
        setEditedAdvance(advance);
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(`Updating ${name} with value ${value}`);
        if(name === 'proyecto'){
            setEditedAdvance((prevAdvance) => ({...prevAdvance, proyecto: {...prevAdvance.proyecto, [event.target.name]: value}}));
        } else if (name === 'fecha'){
            if(value === ''){
                setEditedAdvance((prevAdvance) => ({...prevAdvance, fechaDisplay: null, fechaApi: null}));
            } else {
                const formattedDateDisplay = moment(value).format('YYYY-MM-DD');
                const formattedDateApi = moment(value).format('MMM D, YYYY');
                setEditedAdvance((prevAdvance) => ({...prevAdvance, fechaDisplay: formattedDateDisplay, fechaApi: formattedDateApi}));
            }
        } else {
            setEditedAdvance((prevAdvance) => ({...prevAdvance, [name]: value}));
        }
    }

    const handleProjectChange = (event) => {
        const projectId = parseInt(event.target.value, 10);
        const selectedProject = projects.find((p) => p.id === projectId);
        if (!selectedProject) {
            console.log("No project found with ID", projectId);
        } else {
            console.log(`Updating advance with value ${selectedProject}`);
            setEditedAdvance((prevAdvance) => ({...prevAdvance, proyecto:selectedProject}));
        }
    };

    return (
        <Card>
            <Card.Header>{advance.descripcion}</Card.Header>
            <Card.Body>
                {!editing? (
                    <>
                        <Card.Text>Fecha: {advance.fecha}</Card.Text>
                        <Card.Text>Descripción: {advance.descripcion}</Card.Text>
                        <Card.Text>Proyecto: {advance.proyecto.nombre}</Card.Text>
                        <Card.Text>Porcentaje Completado: {advance.porcentajeCompletado}%</Card.Text>
                    </>
                ) : null}
            </Card.Body>
            <Card.Footer>
                <Button variant="primary" onClick={handleEdit}>
                    Editar
                </Button>
                <Modal show={showEditModal} onHide={handleCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Avance</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="fecha">
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="fecha"
                                    value={editedAdvance.fechaDisplay}
                                    onChange = {handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId='descripcion'>
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="descripcion"
                                    rows={3}
                                    value={editedAdvance.descripcion}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId='porcentajeCompletado'>
                                <Form.Label>Porcentaje Completado</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="porcentajeCompletado"
                                    value={editedAdvance.porcentajeCompletado}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId='formProyecto'>
                                <Form.Label>Proyecto</Form.Label>
                                <Form.Select value={editedAdvance.proyecto?.id} onChange={handleProjectChange}>
                                    <option value="">Seleccione un proyecto</option>
                                    {projects.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.nombre}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='primary' onClick={handleSave}>
                            Guardar
                        </Button>
                        <Button variant='danger' onClick={handleCancel}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Card.Footer>
        </Card>
    );
}

export default AdvanceDetails;