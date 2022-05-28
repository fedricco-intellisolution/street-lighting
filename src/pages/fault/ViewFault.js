import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, Col, Container, Row } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useNavigate } from "react-router-dom";
import CallCentreForm from "./components/CallCentreForm";
import { Edit2 } from "react-feather";
import TechnicianForm from "./components/TechnicianForm";


const ViewFault = () => {
    const navigate = useNavigate();
    const [editCallCentreForm, setEditCallCentreForm] = useState(false)
    
    const updateCallCentreForm = (data) => {
        console.log(data)
    }
    
    return (
        <React.Fragment>
            <Helmet title="View fault" />
            <Container fluid className="p-0">
                <Row>
                    <Col md={6}>
                        <h1 className="h3 mb-3">View fault</h1>
                    </Col>
                    <Col md={6}>
                         <Breadcrumb>
                            <Breadcrumb.Item onClick={() => navigate('/faults')}>Faults</Breadcrumb.Item>
                            <Breadcrumb.Item active>View</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
               
                
                <Card>
                    <Card.Header className="pb-0">
                        <Edit2
                            bg="info" size={18} className="float-end cursor-pointer"
                            onClick={() => setEditCallCentreForm(!editCallCentreForm)}
                        />
                        <Card.Title className="mb-0">Call Centre</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <CallCentreForm
                            onSubmit={updateCallCentreForm}
                            onCancel={() => setEditCallCentreForm(false) }
                            editable={editCallCentreForm}
                        />
                    </Card.Body>
                </Card>
        
                <Card>
                    <Card.Header className="pb-0">
                        <Card.Title className="mb-0">Technician</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <TechnicianForm />
                    </Card.Body>
                </Card>
                    
               
            </Container>
        </React.Fragment>    
    )
}

export default ViewFault;