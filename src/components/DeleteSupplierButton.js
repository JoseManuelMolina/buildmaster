import React, { useState } from "react";
import { Button, Modal } from 'react-bootstrap';

function DeleteSupplierButton({ onDeleteSupplier, supplier }) {
   const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleDelete = () => {
        console.log('HandleDelete called');
        console.log('supplier:', supplier);
        if (supplier) {
            console.log('Calling onDeleteSupplier with supplier.id:', supplier.id);
            onDeleteSupplier(supplier);
        } else {
            console.log('Supplier is undefined, not calling onDeleteSupplier');
        }
        setShowConfirmModal(false);
    };

    const handleCancel = () => {
        setShowConfirmModal(false);
    }

    return (
        <>
            <Button variant="danger" onClick={() => setShowConfirmModal(true)}>
                Eliminar
            </Button>
            <Modal show={showConfirmModal} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {supplier ? (
                        <span>
                            ¿Estás seguro que quieres eliminar a "{supplier.nombre}"?
                        </span>
                    ) : (
                        <span>¿Estás seguro que quieres eliminar este cliente?</span>
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
    )
}

export default DeleteSupplierButton