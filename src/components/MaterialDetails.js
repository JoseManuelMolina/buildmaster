import React, { useState, useEffect } from "react";
import {Card, Button, Form, Modal} from 'react-bootstrap'

function MaterialDetails ({ material, onEditMaterial }){
    const [editing, setEditing] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedMaterial, setEditedMaterial ]= useState(material);

    const handleEdit = () => {
        setShowEditModal(true);
    }

    const handleSave = () => {
        if( editedMaterial && editedMaterial.id){
            onEditMaterial(editedMaterial);
        } else {
            console.error('Edited material is invalid or missing ID');
        }
        setShowEditModal(false);
    }

    const handleCancel = () => {
        setShowEditModal(false);
        if (material && material.id){
            setEditedMaterial(material);
        } else {
            setEditedMaterial({})
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedMaterial((prevMaterial) => ({ ...prevMaterial, [name]: value }));
    }

    return (
        <Card>
            <Card.Header>{material.nombre}</Card.Header>
            <Card.Body>
                {!editing? (
                    <>
                        <Card.Text>Nombre: {material.nombre}</Card.Text>
                        <Card.Text>Cantidad: {material.cantidad}</Card.Text>
                        <Card.Text>Coste: {material.coste}€</Card.Text>
                    </>
                ): null}
            </Card.Body>
            <Card.Footer>
                <Button variant="primary" onClick={handleEdit}>Editar</Button>
                <Modal show={showEditModal} onHide={handleCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Material</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="nombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="nombre" 
                                    value={editedMaterial.nombre} 
                                    onChange={handleInputChange} 
                                />
                            </Form.Group>
                            <Form.Group controlId="cantidad">
                                <Form.Label>Cantidad</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="cantidad"
                                    value={editedMaterial.cantidad}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="coste">
                                <Form.Label>Coste</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="coste"
                                    value={editedMaterial.coste}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleSave}>
                            Guardar cambios
                        </Button>
                        <Button variant="secondary" onClick={handleCancel}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Card.Footer>
        </Card>
    )
}

export default MaterialDetails;