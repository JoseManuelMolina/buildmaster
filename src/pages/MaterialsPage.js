import React, { useEffect, useState } from "react";
import {Container, Row, Col, Button, Modal} from 'react-bootstrap';
import api from "../api";

function MaterialsPage(){
    const [materials, setMaterials] = useState([]);
    const [currentSupplier, setCurrentSupplier] = useState([]);

    return(
        <Container>
            <Row>
                <Col md={12}>
                    <h1>Materiales</h1>
                </Col>
            </Row>
        </Container>
    );
}

export default MaterialsPage;