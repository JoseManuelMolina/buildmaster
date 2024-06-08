// api.get('/proveedores)
// api.post('/proveedores', supplier)
// api.put(`/proveedores/editar/${supplier.id}`)
// api.delete(`/proveedores/borrar/${supplier.id}`)

//Añadir material a proveedor
// api.put(´/proveedores/materiales/${supplier.id}/${material.id}´)

//Eliminar material a proveedor
// api.delete(´/proveedores/materiales/${supplier.id}/${material.id}´)

import React, { useEffect, useState } from 'react';
import {Container, Row, Col, Button, Modal} from 'react-bootstrap';
import api from '../api';
import SuppliersList from '../components/SuppliersList';
import SupplierForm from '../components/SupplierForm';

function SuppliersPage(){
    const [suppliers, setSuppliers] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [currentSupplier, setCurrentSupplier] = useState(null);
    const [showAddSupplier, setShowAddSupplier] = useState(false);
    const [showEditSupplier, setShowEditSupplier] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const [showDeleteError, setShowDeleteError] = useState(false);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

    useEffect(() => {
        api.get('/proveedores').then((response) => {
            setSuppliers(response.data);
        })
    }, [])

    
    
    const addSupplier = (supplier) => {
        api.post('/proveedores', supplier).then((response) =>{
            setSuppliers([...suppliers, response.data]);
            setShowAddSupplier(false);
        })
    }

    const editSupplier = (supplier) => {
        api.put(`/proveedores/editar/${supplier.id}`, supplier).then((response) => {
            setSuppliers(suppliers.map((s) => s.id === supplier.id ? supplier : s));
            setCurrentSupplier(null);
            setShowEditSupplier(false);
        });
    }

    const onDeleteSupplier = (supplier) => {
        api.delete(`/proveedores/borrar/${supplier.id}`, supplier).then((response) => {
            setSuppliers(suppliers.filter((s) => s.id !== supplier.id));
            setShowDeleteSuccess(true);
        })
        .catch((error) => {
            setDeleteErrorMessage(error.message);
            setShowDeleteError(true);
        });
    };

    const handleCloseDeleteSuccess = () => {
        setShowDeleteSuccess(false);
    }
    
    const handleCloseDeleteError = () => {
        setShowDeleteError(false);
    };

    const onViewSupplier = (supplier) => {
        setCurrentSupplier(supplier);
        setShowEditSupplier(false);
        window.location.hred = `/supplier/${supplier.id}`;
    };
    const onEditSupplier = (supplier) => {
        setCurrentSupplier(supplier);
        setShowEditSupplier(true);
    }
    

    return(
        <Container>
            <Row>
                <Col md='12'>
                <h1>Proveedores</h1>
                <Button variant='primary' onClick={() => setShowAddSupplier(true)}>
                    Agregar Proveedor
                </Button>
                <SupplierForm
                    onAddSupplier={addSupplier}
                    show={showAddSupplier}
                    onHide={() => setShowAddSupplier(false)}
                />
                <SuppliersList suppliers={suppliers} onViewSupplier={onViewSupplier} editSupplier={editSupplier} onDeleteSupplier={onDeleteSupplier}/>
                <Modal show={showDeleteSuccess} onHide={handleCloseDeleteSuccess}>
          <Modal.Header closeButton>
            <Modal.Title>Proveedor Eliminado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            El proveedor se ha borrado exitosamente
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseDeleteSuccess}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showDeleteError} onHide={handleCloseDeleteError}>
          <Modal.Header closeButton>
            <Modal.Title>Error eliminando el proveedor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {deleteErrorMessage}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={handleCloseDeleteError}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
                </Col>

            </Row>
        </Container>
    )
}

export default SuppliersPage;