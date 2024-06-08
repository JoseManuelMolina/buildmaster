import React, { useState } from 'react';
import {Modal, Button, Form } from 'react-bootstrap';

function SupplierForm({ onAddSupplier, show, onHide}){
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddSupplier({ nombre, direccion, telefono });
        setNombre('');
        setDireccion('');
        setTelefono('');
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Añadir Proveedor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="direccion">
                        <Form.Label>Direccion</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="telefono">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Añadir
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default SupplierForm;