import React, { useState } from 'react';
import {Table, Modal, Button } from 'react-bootstrap'
import AdvanceDetails from './AdvanceDetails';
import DeleteAdvanceButton from './DeleteAdvanceButton';

function AdvancesList({advances, onViewAdvance, editAdvance, onDeleteAdvance, projects}){
    const [showModal, setShowModal] = useState(false);
    const [currentAdvance, setCurrentAdvance] = useState({});

    if (!advances || advances.length === 0){
        return <div>Cargando...</div>
    }

    const handleEditAdvance = (editedAdvance) => {
        editAdvance(editedAdvance);
        setCurrentAdvance(editedAdvance);
    };

    const handleViewAdvance = (advance) => {
        console.log('Handle')
        setCurrentAdvance(advance);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setCurrentAdvance(null);
        setShowModal(false);
    };

    const handleDeleteAdvance = (advance) => {
        onDeleteAdvance(advance);
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Proyecto</th>
                        <th>Fecha</th>
                        <th>Descripción</th>
                        <th>Porcentaje</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {advances.map((advance) => {
                        return (
                            <tr key={advance.id}>
                                <td>{advance.id}</td>
                                <td>{advance.proyecto?.nombre}</td>
                                <td>{advance.fecha}</td>
                                <td>{advance.descripcion}</td>
                                <td>{advance.porcentajeCompletado}%</td>
                                <td>
                                    <Button variant="primary" onClick={() => handleViewAdvance(advance)}>
                                        Ver
                                    </Button>
                                    <DeleteAdvanceButton advance={advance} onDeleteAdvance={handleDeleteAdvance} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles del Avance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentAdvance && (
                        <AdvanceDetails advance={currentAdvance} onEditAdvance={handleEditAdvance} projects={projects}/>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );

}

export default AdvancesList