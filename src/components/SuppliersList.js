import React, {useState, useEffect} from "react";
import { Table, Modal, Button } from 'react-bootstrap';
import SupplierDetails from "./SupplierDetails";
import DeleteSupplierButton from "./DeleteSupplierButton";

import api from "../api";

function SuppliersList ({ suppliers, onViewSupplier, editSupplier, onDeleteSupplier}){
    const [showModal, setShowModal] = useState(false);
    const [currentSupplier, setCurrentSupplier] = useState({});
    const [materials, setMaterials] = useState([]);



    useEffect(() => {
        if (currentSupplier.id) {
            api.get(`/proveedores/materiales/${currentSupplier.id}`).then((response) =>{
                setMaterials(response.data);
            })
        }
    }, [currentSupplier]); // Update materials when currentSupplier changes

    if(!suppliers || suppliers.length === 0){
        return <div>Cargando...</div>
    }

    const handleEditSupplier = (editedSupplier) => {
        console.log('HandleEditSupplier:', editedSupplier)
        editSupplier(editedSupplier);
        setCurrentSupplier(editedSupplier);
    }

    const handleViewSupplier = (supplier) => {
        setCurrentSupplier(supplier);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setCurrentSupplier({}); // Set currentSupplier to an empty object
        setShowModal(false);
    };

    const handleDeleteSupplier = (supplier) => {
        onDeleteSupplier(supplier);
    }

    return (
        <>
            <Table striped hover variant='dark'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier) => {
                        return (
                            <tr key={supplier.id}>
                                <td>{supplier.id}</td>
                                <td>{supplier.nombre}</td>
                                <td>{supplier.direccion}</td>
                                <td>{supplier.telefono}</td>
                                <td>
                                    <Button variant="primary" className='me-3' onClick={() => handleViewSupplier(supplier)}>Ver</Button>
                                    <DeleteSupplierButton supplier={supplier} onDeleteSupplier={handleDeleteSupplier}>Eliminar</DeleteSupplierButton>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles del proveedor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentSupplier && (
                        <SupplierDetails 
                        supplier={currentSupplier} 
                        onEditSupplier={handleEditSupplier} 
                        materials={materials}/>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}
export default SuppliersList;