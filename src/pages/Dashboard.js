import React from 'react';
import { Card, CardBody, CardTitle, CardText, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartBar, faFolder, faMoneyBill, faPiggyBank } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <Row>
        <Col md={6}>
          <Card className="mb-3 square-card bg-primary bg-gradient text-black">
            <CardBody>
              <FontAwesomeIcon icon={faUsers} size="lg" />
              <CardTitle>Número de clientes</CardTitle>
              <CardText>100 clientes activos</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3 square-card bg-success bg-gradient text-black">
            <CardBody>
              <FontAwesomeIcon icon={faChartBar} size="lg" />
              <CardTitle>Cliente con más proyectos</CardTitle>
              <CardText>Empresa XYZ con 20 proyectos</CardText>
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
              <CardText>500 proyectos en curso</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3 square-card bg-warning bg-gradient text-black">
            <CardBody>
              <FontAwesomeIcon icon={faMoneyBill} size="lg" />
              <CardTitle>Media de presupuestos</CardTitle>
              <CardText>$10,000 por proyecto</CardText>
            </CardBody>
          </Card>
          <Card className="mb-3 square-card bg-danger bg-gradient text-black">
            <CardBody>
              <FontAwesomeIcon icon={faPiggyBank} size="lg" />
              <CardTitle>Total de presupuestos</CardTitle>
              <CardText>$5,000,000 en total</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;