import React from "react";

import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Search } from "react-feather";

import { TablePagination } from "components/TablePagination";
import { tableColumns, tableData } from "./tableColumns";

export const ChecklistItems = () => {
    const navigate = useNavigate();

    return (
        <>
            <React.Fragment>
                <Helmet title="Settings" />
                <h1 className="h3 mb-3">Checklist items</h1>
                <Card className="p-0">
                    <Card.Header className="pb-0">
                        <Row>
                            <Col md={9}>
                                <Row>
                                    <Col md={2}>
                                        <Form.Control
                                            type="text"
                                            className="d-inline-block"
                                            placeholder="Id"
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control
                                            className="d-inline-block"
                                            type="text"
                                            placeholder="Checklist category"
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control
                                            className="d-inline-block"
                                            type="text"
                                            placeholder="Checklist item name"
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control
                                            className="d-inline-block"
                                            type="text"
                                            placeholder="Sequence number"
                                        />
                                    </Col>
                                    <Col md={1}>
                                        <Button
                                            variant="primary"
                                            className="me-1 mb-1"
                                        >
                                            <Search className="feather" />
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={3}>
                                {" "}
                                <Button
                                    variant="primary"
                                    className="m-1 float-end mb-2"
                                    onClick={() =>
                                        navigate(
                                            "/preventive-maintenance/checklist-items/add"
                                        )
                                    }
                                >
                                    <PlusCircle className="feather" /> Add
                                    checklist item
                                </Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <TablePagination
                            columns={tableColumns}
                            module="Checklist type"
                            rawData={tableData}
                        />
                    </Card.Body>
                </Card>
            </React.Fragment>
        </>
    );
};
