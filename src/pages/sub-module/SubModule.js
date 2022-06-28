import React from "react";

import { Helmet } from "react-helmet-async";
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Row,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";

import DynamicTable from "../../components/ui/DynamicTable";

import { Map, Edit2 } from "react-feather";
import { useNavigate, useLocation } from "react-router-dom";

const SubModule = () => {
    //
    // States
    //
    const navigate = useNavigate();
    const location = useLocation();
    const tableColumns = [
        {
            Header: "Actions",
            accessor: "actions",
            Cell: (cell) => (
                <div>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>Edit sub module</Tooltip>}
                    >
                        <Edit2 className="align-middle me-1" size={18} />
                    </OverlayTrigger>
                </div>
            ),
        },
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Sub module no",
            accessor: "sub_module_no",
        },
        {
            Header: "Description",
            accessor: "description",
        },
        {
            Header: "Start date",
            accessor: "start_date",
        },
        {
            Header: "End date",
            accessor: "end_date",
        },
    ];

    const sectors = [
        {
            name: "Sub module name",
            sub_module_no: "123-456-789",
            description: "Sub module description",
            start_date: "10/10/2022",
            end_date: "10/10/2023",
        },
    ];

    //
    // Functions
    //

    //
    // UseEffects
    //

    return (
        <React.Fragment>
            <Helmet title="Sub module" />
            <Container fluid className="p-0">
                <h1 className="h3 mb-3">Sub module</h1>
                <Card>
                    <Card.Header className="pb-0">
                        <Row>
                            <Col md={3}>
                                <Form.Control
                                    placeholder="Search keyword"
                                    className="d-inline-block"
                                />
                            </Col>
                            <Col
                                md={{ span: 3, offset: 6 }}
                                className="text-end"
                            >
                                <Button
                                    variant="primary"
                                    className="me-1 mb-1"
                                    onClick={() =>
                                        navigate(location.pathname + "/add")
                                    }
                                >
                                    <Map
                                        className="align-middle me-1"
                                        size={16}
                                    />
                                    Create new sub module
                                </Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <DynamicTable data={sectors} columns={tableColumns} />
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>
    );
};

export default SubModule;
