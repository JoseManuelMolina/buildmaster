import React , {useState, useEffect} from "react";
import {Table, Modal, Button} from 'react-bootstrap';
import MaterialDetails from "./MaterialDetails";
import DeleteMaterialButton from "./DeleteMaterialButton";

function MaterialsList ({ materials, onViewMaterial, editMaterial, onDeleteMaterial }){
    const [showModal, setShowModal] = useState(false);
    const [currentMaterial, setCurrentMaterial] = useState({});

    if (!materials || materials.length === 0){
        return <div>Cargando...</div>
    }

    const handleCloseModal = () =>{
        setCurrentMaterial({});
        setShowModal(false);
    }

    const handleViewMaterial = (material) => {
        setCurrentMaterial(material);
        setShowModal(true);
    }

    const handleEditMaterial = (editedMaterial) => {
        editMaterial(editedMaterial);
        setCurrentMaterial(editedMaterial);
    }

    const handleDeleteMaterial = (material) => {
        onDeleteMaterial(material);
    }

    return (
        <>
            <Table striped hover variant='dark'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Coste/unidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {materials.map((material) => {
                        return (
                            <tr key={material.id}>
                                <td>{material.id}</td>
                                <td>{material.nombre}</td>
                                <td>{material.cantidad}</td>
                                <td>{material.coste}€</td>
                                <td>
                                    <Button variant="primary" className='me-3' onClick={() => handleViewMaterial(material)}>Ver</Button>
                                    <DeleteMaterialButton material={material} onDeleteMaterial={handleDeleteMaterial}>Eliminar</DeleteMaterialButton>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles del material</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentMaterial && (
                        <MaterialDetails 
                        material={currentMaterial} 
                        onEditMaterial={handleEditMaterial} />
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default MaterialsList;