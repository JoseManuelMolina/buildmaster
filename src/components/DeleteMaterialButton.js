import React, { useState } from "react";
import { Button, Modal } from 'react-bootstrap';

function DeleteMaterialButton({ onDeleteMaterial, material }){
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleDelete = () => {
        if(material){
            onDeleteMaterial(material);
        } else {
            console.error("Material is undefined");
        }
        setShowConfirmModal(false)
    };

    const handleCancel = () => {
        setShowConfirmModal(false);
    };

    return (
        <>
            <Button variant="danger" onClick={() => setShowConfirmModal(true)}>
                Eliminar Material
            </Button>
            <Modal show={showConfirmModal} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {material ? (
                        <span>¿Estás seguro que quieres eliminar "{material.nombre}"?</span>
                    ):(
                        <span>¿Estás seguro que quieres eliminar este material?</span>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteMaterialButton;