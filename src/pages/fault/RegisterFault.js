import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, Col, Container, Row } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useNavigate } from "react-router-dom";
import CallCentreForm from "./components/CallCentreForm";

const RegisterFault = () => {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <Helmet title="Register fault" />
            <Container fluid className="p-0">
                <Row>
                    <Col md={6}>
                        <h1 className="h3 mb-3">Register a fault</h1>
                    </Col>
                    <Col md={6}>
                         <Breadcrumb>
                            <Breadcrumb.Item onClick={() => navigate('/faults')}>Faults</Breadcrumb.Item>
                            <Breadcrumb.Item active>Register</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <CallCentreForm
                            editable={true}
                        />                     
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>    
    )
}

export default RegisterFault;