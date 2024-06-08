import React, { useEffect, useState } from "react";
import {Container, Row, Col, Button, Modal} from 'react-bootstrap';
import api from "../api";
import MaterialForm from "../components/MaterialForm";
import MaterialsList from "../components/MaterialsList";

function MaterialsPage(){
    const [materials, setMaterials] = useState([]);
    const [currentMaterial, setCurrentMaterial] = useState([]);
    const [showAddMaterial, setShowAddMaterial] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const [showDeleteError, setShowDeleteError] = useState(false);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

    useEffect(() => {
        api.get('/materiales').then((response) => {
            setMaterials(response.data);
        })
    }, [])


    const addMaterial = (material) => {
        api.post('/materiales', material).then((response) => {
            setMaterials([...materials, response.data]);
            setShowAddMaterial(false);
        })
    }

    const editMaterial = (material) => {
        api.put(`/materiales/editar/${material.id}`, material).then((response) => {
            setMaterials(materials.map((m) => m.id === material.id ? material : m));
            setCurrentMaterial(null);
        })
    }

    const onDeleteMaterial = (material) => {
        api.delete(`/materiales/borrar/${material.id}`, material).then((response) =>{
            setMaterials(materials.filter((m) => m.id !== material.id));
            setShowDeleteSuccess(true);
        }).catch((error) => {
            setDeleteErrorMessage(error.message);
            setShowDeleteError(true);
        })
    }

    const handleCloseDeleteSuccess = () => {
        setShowDeleteSuccess(false);
    }
    
    const handleCloseDeleteError = () => {
        setShowDeleteError(false);
    };

    const onViewMaterial = (material) => {
        setCurrentMaterial(material);
        window.location.href= `/material/${material.id}`;
    };

    return(
        <Container>
            <Row>
                <Col md={12}>
                    <h1>Materiales</h1>
                    <Button variant="primary" onClick={() => setShowAddMaterial(true)}>
                        Agregar Material
                    </Button>
                    <MaterialForm
                        onAddMaterial={addMaterial}
                        show={showAddMaterial}
                        onHide={() => setShowAddMaterial(false)}
                    />
                    <MaterialsList materials={materials} onViewMaterial={onViewMaterial} editMaterial={editMaterial} onDeleteMaterial={onDeleteMaterial}/>
                    <Modal show={showDeleteSuccess} onHide={handleCloseDeleteSuccess}>
                        <Modal.Header closeButton>
                            <Modal.Title>Material Eliminado</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            El material se ha borrado exitosamente
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
                            <Button variant="primary" onClick={handleCloseDeleteError}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
}

export default MaterialsPage;