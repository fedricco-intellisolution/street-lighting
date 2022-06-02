import React from "react";

import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "react-feather";

import { TablePagination } from "components/TablePagination";
import { tableColumns, tableData } from "./tableColumns";

export const ChecklistBuild = () => {
    const navigate = useNavigate();

    return (
        <>
            <React.Fragment>
                <Helmet title="Settings" />
                <h1 className="h3 mb-3">Build checklist</h1>
                <Card className="p-0">
                    <Card.Header className="pb-0">
                        <Row>
                            <Col md={3}>
                                <Form.Control
                                    className="d-inline-block"
                                    placeholder="Search keyword"
                                />
                            </Col>
                            <Col
                                md={{ span: 3, offset: 6 }}
                                className="text-end"
                            >
                                <Button
                                    className="me-1 mb-1"
                                    variant="primary"
                                    onClick={() =>
                                        navigate(
                                            "/preventive-maintenance/checklist-build/add"
                                        )
                                    }
                                >
                                    <PlusCircle
                                        className="align-middle me-1"
                                        size={16}
                                    />
                                    Build checklist
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
