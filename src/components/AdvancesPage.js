import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

import api from '../api';


function AdvancesPage() {
  const [advances, setAdvances] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() =>{
    api.get('/avances').then((response) => {
      setAdvances(response.data);
    })

    api.get('/proyectos').then((response) => {
      setProjects(response.data);
    })
  }, []);
  console.log('Avances', advances);
  console.log('Proyectos', projects);

  return (<div>Hello from TestAdvancesPage!</div>);
}

export default AdvancesPage;