// api.get('/clientes')
// api.post('/clientes', client)
// api.put(`/clientes/editar/${client.id}`, client)
// api.delete(`/clientes/borrar/${client.id}`)
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import ClientsList from '../components/ClientsList';
import ClientForm from '../components//ClientForm';
import ClientDetails from '../components//ClientDetails';
import EditClientForm from '../components//EditClientForm';
import DeleteClientButton from '../components//DeleteClientButton';
import api from '../api';

function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [currentClient, setCurrentClient] = useState(null);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showEditClient, setShowEditClient] = useState(false);
  const [showDeleteClient, setShowDeleteClient] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorDialogMessage, setErrorDialogMessage] = useState('');
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  useEffect(() => {
    api.get('/clientes').then((response) => {
      setClients(response.data);
    });
  }, []);

  const addClient = (client) => {
    api.post('/clientes', client).then((response) => {
      setClients([...clients, response.data]);
      setShowAddClient(false);
    });
  };

  const editClient = (client) => {
    api.put(`/clientes/editar/${client.id}`, client).then((response) => {
      setClients(clients.map((c) => (c.id === client.id? response.data : c)));
      setCurrentClient(null);
      setShowEditClient(false);
    });
  };

  const deleteClient = (client) => {
    api.delete(`/clientes/borrar/${client.id}`)
     .then(() => {
        setClients(clients.filter((c) => c.id!== client.id));
        setShowDeleteClient(false);
        setShowDeleteSuccess(true);
      })
     .catch((error) => {
        if (error.response.status === 404) {
          // Mostrar diálogo de error
          setShowErrorDialog(true);
          setErrorDialogMessage(`El cliente "${client.razonSocial}" tiene un proyecto asignado y no puede ser eliminado.`);
        } else {
          // Manejar otros errores
          console.error(error);
        }
      });
    console.log(client);
  };

  const onViewClient = (client) => {
    setCurrentClient(client);
    setShowEditClient(false);
    setShowDeleteClient(false);
    window.location.href = `/client/${client.id}`;
  };

  const onCloseModal = () => {
    setCurrentClient(null);
    setShowAddClient(false);
    setShowEditClient(false);
    setShowDeleteClient(false);
  };

  const handleCloseDeleteSuccess = () => {
    setShowDeleteSuccess(false);
  };

  return (
    <Container>
      <Row>
        <Col md="12">
          <h1>Clientes</h1>
          <Button variant="primary" onClick={() => setShowAddClient(true)}>
            Add Client
          </Button>
          <Modal show={showAddClient} onHide={onCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add Client</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ClientForm onAddClient={addClient} />
            </Modal.Body>
          </Modal>
          {currentClient && (
            <>
              <ClientDetails client={currentClient} />
              <Button variant="primary" onClick={() => setShowEditClient(true)}>
                Edit
              </Button>
              <Modal show={showEditClient} onHide={onCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <EditClientForm client={currentClient} onEditClient={editClient} />
                </Modal.Body>
              </Modal>
              <Button variant="danger" onClick={() => setShowDeleteClient(true)}>
                Delete
              </Button>
              <Modal show={showDeleteClient} onHide={onCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete Client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <DeleteClientButton onDeleteClient={() => deleteClient(currentClient)} />
                </Modal.Body>
              </Modal>
              
            </>
          )}
          <Modal show={showErrorDialog} onHide={() => setShowErrorDialog(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{errorDialogMessage}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => setShowErrorDialog(false)}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showDeleteSuccess} onHide={handleCloseDeleteSuccess}>
            <Modal.Header closeButton>
              <Modal.Title>Borrado Satisfactorio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>El cliente se ha eliminado correctamente!</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseDeleteSuccess}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <ClientsList clients={clients} onViewClient={onViewClient} editClient={editClient} onDeleteClient={deleteClient}/>
        </Col>
      </Row>
    </Container>
  );
}

export default ClientsPage;