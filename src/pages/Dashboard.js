import React, {useState, useEffect} from 'react';
import { Card, CardBody, CardTitle, CardText, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartBar, faFolder, faMoneyBill, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import api from '../api';

const Dashboard = () => {
    const [numClients, setNumClients] = useState(null);
    const [clientMoreProjects, setClientMoreProjects] = useState(null);
    const [totalPresupuestos, setTotalPresupuestos] = useState(null);
    const [mediaPresupuestos, setMediaPresupuestos] = useState(null);
    const [numProyectos, setNumProyectos] = useState(null);

    useEffect(()=>{
        api.get('/clientes/num').then((response) =>{
            setNumClients(response.data);
        })
        api.get('/cliente/masproyectos').then((response) => {
            setClientMoreProjects(response.data); 
        })
        api.get('/proyectos/total/presupuestos').then((response) => {
            setTotalPresupuestos(response.data);
        })
        api.get('/proyectos/media/presupuestos/proyectos').then((response) =>{
            setMediaPresupuestos(response.data);
        })
        api.get('/proyectos').then((response) =>{
            setNumProyectos(response.data.length);
        })
    }, [])


  return (
    <div className="container-fluid">
      <Row>
        <Col md={6}>
          <Card className="mb-3 square-card bg-primary bg-gradient text-black">
            <CardBody>
              <FontAwesomeIcon icon={faUsers} size="lg" />
              <CardTitle>Número de clientes</CardTitle>
              <CardText>{numClients} clientes activos</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3 square-card bg-success bg-gradient text-black">
            <CardBody>
              <FontAwesomeIcon icon={faChartBar} size="lg" />
              <CardTitle>Cliente con más proyectos</CardTitle>
              <CardText>{clientMoreProjects?.razonSocial}</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="mb-3 square-card bg-info bg-gradient text-black">
            <CardBody>
              <FontAwesomeIcon icon={faFolder} size="lg" />
              <CardTitle>Número de proyectos</CardTitle>
              <CardText>{numProyectos} proyectos en curso</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3 square-card bg-warning bg-gradient text-black">
            <CardBody>
              <FontAwesomeIcon icon={faMoneyBill} size="lg" />
              <CardTitle>Media de presupuestos</CardTitle>
              <CardText>{mediaPresupuestos}€ por proyecto</CardText>
            </CardBody>
          </Card>
          <Card className="mb-3 square-card bg-danger bg-gradient text-black">
            <CardBody>
              <FontAwesomeIcon icon={faPiggyBank} size="lg" />
              <CardTitle>Total de presupuestos</CardTitle>
              <CardText>{totalPresupuestos}€ en total</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;