import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function DeleteAdvanceButton({ onDeleteAdvance, advance}){
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleDelete = () => {
        console.log('handelDelete called');
        console.log('advance;', advance);
        if (advance) {
            console.log('calling onDeleteAdvance with advance.id:', advance.id);
            onDeleteAdvance(advance);
        } else {
            console.log('advance is undefined, not calling onDeleteAdvance');
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
                    {advance ? (
                        <span>
                            ¿Estás seguro que quieres eliminar el avance "{advance.descripcion}"?
                        </span>
                    ) : (
                        <span>¿Estás seguro que quieres elimnar este avance?</span>
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
export default DeleteAdvanceButton;