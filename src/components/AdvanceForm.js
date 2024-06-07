import React, {useState} from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import moment from 'moment';

function AdvanceForm({ onAddAdvance, projects, show, onHide}){
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [porcentajeCompletado, setPorcentajeCompletado] = useState(0);
    const [proyectoId, setProyectoId] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('proyectos', projects);
        const proyectoIdNumber = parseInt(proyectoId, 10);

        const proyecto = projects.find((p) => p.id === proyectoIdNumber);
        if(!proyecto){
            console.error("No project found with id", proyectoId);
            return;
        }

        console.log('proyecto', proyecto);
        const fechaFormatted = moment(fecha).format('MMM D, YYYY');

        onAddAdvance({
            fecha: fechaFormatted,
            descripcion,
            porcentajeCompletado,
            proyecto: {
                id: proyectoIdNumber,
                nombre: proyecto.nombre,
                presupuesto: proyecto.presupuesto,
                fechaInicio: proyecto.fechaInicio,
                plano: proyecto.plano,
                categoria: proyecto.categoria,
                cliente: {
                    id: proyecto.cliente.id,
                    cif: proyecto.cliente.cif,
                    razonSocial: proyecto.cliente.razonSocial,
                    email: proyecto.cliente.email,
                    personaContacto: proyecto.cliente.personaContacto,
                    direccion: proyecto.cliente.direccion,
                }
            }
        });

        setFecha('');
        setDescripcion('');
        setPorcentajeCompletado(0);
        setProyectoId('');
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Avance</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="fecha">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control
                            type="date"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="descripcion">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="porcentajeCompletado">
                        <Form.Label>Porcentaje Completado</Form.Label>
                        <Form.Control
                        type="number"
                        value={porcentajeCompletado}
                        onChange={(e) => setPorcentajeCompletado(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="fromProject">
                        <Form.Label>Proyecto</Form.Label>
                        <Form.Select value={proyectoId} onChange={(event) => setProyectoId(event.target.value)}>
                            <option value="">Seleccione un proyecto</option>
                            {projects.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.nombre}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primaty" type="submit">
                        Agregar Avance
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );

}

export default AdvanceForm;