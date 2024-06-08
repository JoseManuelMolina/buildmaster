import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function MaterialForm({ onAddMaterial, show, onHide }){
    const [ nombre, setNombre ] = useState('');
    const [ cantidad, setCantidad ] = useState(0);
    const [ coste, setCoste ] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddMaterial({ nombre, cantidad, coste });
        setNombre('');
        setCantidad(0);
        setCoste(0);
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Material</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="nombre">
                        <Form.Label>Nombre del Material</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='cantidad'>
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                            type="number"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='coste'>
                        <Form.Label>Coste</Form.Label>
                        <Form.Control
                            type="number"
                            value={coste}
                            onChange={(e) => setCoste(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant='primary' className='mt-3' type='submit'>
                        Agregar Material
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default MaterialForm;