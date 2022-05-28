import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Zap } from "react-feather";
import { useNavigate, useLocation } from "react-router-dom";
import FaultTable from "./components/FaultTable";
import * as faultApi from "../../api/faultApi";

const tableColumns = [
        {
            Header: "Actions",
            accessor: "actions",
        },
        {
            Header: "Site",
            accessor: "site",
        },
        {
            Header: "Complainant",
            accessor: "complainant.name",
        },
        {
            Header: "Complaint date",
            accessor: "complaint_at",
        },
        {
            Header: "Nature of fault",
            accessor: "nature_of_fault",
        },
        {
            Header: "Job type",
            accessor: "job_type",
        },
]

const FaultList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [filter, setFilter] = useState('');
    const [faults, setFaults] = useState([]);

    const getFaults = useCallback(async() => {
        const response = await faultApi.getFaults();
        setFaults(response.data.data)
    }, [])

    useEffect(() => {
       getFaults();
    }, [getFaults])

    return (
        <React.Fragment>
            <Helmet title="Faults" />
            <Container fluid className="p-0">
                <h1 className="h3 mb-3">Faults</h1>
                <Card>
                    <Card.Header className="pb-0">
                        <Row>
                            <Col md={3}>
                                <Form.Control
                                    value={filter || ""}
                                    onChange={(e) => {
                                        setFilter(e.target.value || undefined);
                                    }}
                                    placeholder="Search keyword"
                                    className="d-inline-block"
                                />
                            </Col>
                            <Col md={{ span: 3, offset: 6 }} className="text-end">
                                <Button
                                    variant="primary"
                                    className="me-1 mb-1"
                                    onClick={() => navigate(location.pathname + '/register')}
                                >
                                    <Zap className="align-middle me-1" size={16} />
                                    Register a fault
                                </Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <FaultTable data={faults} columns={tableColumns} />
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>    
    )
}

export default FaultList;