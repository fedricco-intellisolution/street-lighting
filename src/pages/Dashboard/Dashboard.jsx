import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Faults } from "./components/Faults";
import { Maps } from "./components/Maps";
import { Todos } from "./components/Todos";

export const Dashboard = () => {
    return (
        <>
            <Helmet title="Dashboard" />
            <Container fluid className="p-0">
                <h4 className="h4 mb-3">Dashboard</h4>
                <Row>
                    <Col md={12}>
                        <Form.Label className="font-weight-bold">
                            Faults
                        </Form.Label>
                        <Faults />
                        <Row>
                            <Col md={12}>
                                {" "}
                                <Form.Label className="font-weight-bold">
                                    Map
                                </Form.Label>
                                <Maps />
                            </Col>
                        </Row>
                    </Col>
                    <Col md={12} className="mt-2">
                        <Form.Label className="font-weight-bold">
                            Todos
                        </Form.Label>
                        <Todos />
                    </Col>
                </Row>
            </Container>
        </>
    );
};
