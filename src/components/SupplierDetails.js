import React, { useState, useEffect } from 'react';
import {Card, Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import api from '../api';

function SupplierDetails ({ supplier, onEditSupplier, materials }) {
    console.log('supplier:', supplier);
    const [editing, setEditing] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedSupplier, setEditedSupplier] = useState(supplier);
    console.log(materials);

    const handleEdit = () => {
        setShowEditModal(true);
    };

    const handleSave = () => {
        console.log('Edited Supplier', editedSupplier);
        if (editedSupplier && editedSupplier.id) {
          onEditSupplier(editedSupplier);
        } else {
          console.error('Edited supplier is invalid or missing ID');
        }
        setShowEditModal(false);
      };

    const handleCancel = () =>{
        console.log('supplier:', supplier);
        setShowEditModal(false);
        if (supplier && supplier.id) {
            setEditedSupplier(supplier);
        } else {
            setEditedSupplier({}); // or some default value
        }
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setEditedSupplier({...editedSupplier, [name]: value});
    }

    const handleRemoveMaterial = (material) => {
        // Remove material from supplier logic here
        console.log(`Remove material ${material.nombre} from supplier`);
        api.delete(`/proveedores/materiales/${supplier.id}/${material.id}`)
          .then((response) => {
            if (response.status === 200) {
              console.log(`Material ${material.nombre} removed from supplier`);
              api.get(`/proveedores/materiales/${supplier.id}`)
                .then((response) => {
                  materials = response.data;
                  console.log('Materials:', materials);
                })
                .catch((error) => {
                  console.error(`Error fetching materials: ${error}`);
                });
            } else {
              console.error(`Error removing material: ${response.statusText}`);
            }
          })
          .catch((error) => {
            console.error(`Error removing material: ${error}`);
          });
      };

      const handleAddMaterial = () => {
        const materialId = prompt("Inserte el id del material a añadir:");
        if (materialId) {
          api.put(`/proveedores/materiales/${supplier.id}/${materialId}`)
            .then((response) => {
              if (response.status === 200) {
                console.log(`Material added to supplier successfully`);
                // You can also fetch the updated list of materials here
                api.get(`/proveedores/materiales/${supplier.id}`)
                  .then((response) => {
                    materials = response.data;
                  console.log('Materials:', materials);
                  })
                  .catch((error) => {
                    console.error(`Error fetching materials: ${error}`);
                  });
              } else {
                console.error(`Error adding material to supplier: ${response.statusText}`);
              }
            })
            .catch((error) => {
              console.error(`Error adding material to supplier: ${error}`);
            });
        }
      };

    return (
        <Card>
            <Card.Header>{supplier.nombre}</Card.Header>
            <Card.Body>
                {!editing? (
                    <>
                        <Card.Text>Nombre: {supplier.nombre}</Card.Text>
                        <Card.Text>Direccion: {supplier.direccion}</Card.Text>
                        <Card.Text>Teléfono: {supplier.telefono}</Card.Text>
                        {materials.length > 0 && (
                            <Card.Body>
                            Materiales:
                            <table>
                                <thead>
                                <tr>
                                    <th style={{ padding: '10px' }}>Nombre</th>
                                    <th style={{ padding: '10px' }}>Cantidad</th>
                                    <th style={{ padding: '10px' }}>Coste</th>
                                    <th>Acciones</th>
                                </tr>
                                </thead>
                                <tbody>
                                {[...new Set(materials.map(material => material.nombre))].map((nombre, index) => {
                                    const material = materials.find(m => m.nombre === nombre);
                                    return (
                                    <tr key={index}>
                                        <td style={{ padding: '10px' }}>{material.nombre}</td>
                                        <td style={{ padding: '10px' }}>{material.cantidad}</td>
                                        <td style={{ padding: '10px' }}>{material.coste}€/unidad</td>
                                        <td>
                                            <Button variant="danger" onClick={() => handleRemoveMaterial(material)}>
                                            <FontAwesomeIcon icon={faTrash} size="xs" color="white" />
                                            </Button>
                                        </td>
                                    </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                            </Card.Body>
                        )}
                    </>
                ) : null}
            </Card.Body>
            <Card.Footer>
                <Button variant="primary" className='me-3' onClick={handleEdit}>Editar</Button>
                <Button variant="success" onClick={handleAddMaterial}>Agregar Material</Button>
                <Modal show={showEditModal} onHide={handleCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Proveedor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="nombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="nombre" 
                                    value={editedSupplier.nombre} 
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="direccion">
                                <Form.Label>Dirección</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="direccion" 
                                    value={editedSupplier.direccion} 
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="telefono">
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="telefono" 
                                    value={editedSupplier.telefono} 
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='primary' onClick={handleSave}>
                            Guardar
                        </Button>
                        <Button variant='secondary' onClick={handleCancel}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Card.Footer>
        </Card>
    );
}

export default SupplierDetails;