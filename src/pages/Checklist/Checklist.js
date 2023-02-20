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
    Badge,
} from "react-bootstrap";
import DatePicker from "react-datepicker";

import DynamicTable from "../../components/ui/DynamicTable";

import { Edit2, Plus, Trash, Search, Eye } from "react-feather";
import { useNavigate, useLocation } from "react-router-dom";
import { status } from "../../utils/utilities";

const Checklist = () => {
    //
    // States
    //
    const navigate = useNavigate();
    const location = useLocation();
    const tableColumns = [
        {
            Header: "Actions",
            accessor: "actions",
            width: "70px",
            Cell: ({ row }) => (
                <div>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>Edit checklist</Tooltip>}
                    >
                        <Edit2
                            className="align-middle me-1"
                            size={18}
                            onClick={() =>
                                navigate(
                                    `${location.pathname}/edit/${row.original.id}`
                                )
                            }
                        />
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>Edit cheklist</Tooltip>}
                    >
                        <Eye
                            className="align-middle me-1"
                            size={18}
                            onClick={() =>
                                navigate(
                                    `${location.pathname}/view/${row.original.id}`
                                )
                            }
                        />
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>Delete checklist</Tooltip>}
                    >
                        <Trash
                            className="align-middle me-1"
                            size={18}
                            color="#df4759"
                        />
                    </OverlayTrigger>
                </div>
            ),
        },
        {
            Header: "Status",
            accessor: "status",
            Cell: ({ row }) => {
                return (
                    <Badge pill bg={status(row.original.status)}>
                        {row.original.status}
                    </Badge>
                );
            },
        },
        {
            Header: "Item name",
            accessor: "item_name",
        },
        {
            Header: "Date of check",
            accessor: "date_of_check",
        },
        {
            Header: "Description",
            accessor: "description",
        },
        {
            Header: "Location",
            accessor: "location",
        },
    ];

    const sectors = [
        {
            id: "1",
            item_name: "Checklist item 1",
            date_of_check: "01/20/2023",
            description: "Description of checklist item 1",
            location: "Marina bay, 018956",
            status: "PENDING",
        },
        {
            id: "2",
            item_name: "Checklist item 2",
            date_of_check: "02/21/2023",
            description: "Description of checklist item 2",
            location: "Woodlands, 730001",
            status: "DRAFT",
        },
        {
            id: "3",
            item_name: "Checklist item 3",
            date_of_check: "03/22/2023",
            description: "Description of checklist item 3",
            location: "Punggol, 820167",
            status: "ON-GOING",
        },
        {
            id: "4",
            item_name: "Checklist item 4",
            date_of_check: "04/23/2023",
            description: "Description of checklist item 4",
            location: "Pasir Ris, 519111",
            status: "COMPLETED",
        },
        {
            id: "5",
            item_name: "Checklist item 5",
            date_of_check: "05/24/2023",
            description: "Description of checklist item 5",
            location: "Jurong east, 600002",
            status: "EOT",
        },
        {
            id: "6",
            item_name: "Checklist item 6",
            date_of_check: "06/25/2023",
            description: "Description of checklist item 6",
            location: "Bishan, 570191",
            status: "VOID",
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
            <Helmet title="Checklist listing" />
            <Container fluid className="p-0">
                <h1 className="h3 mb-3">Checklist items</h1>
                <Card>
                    <Card.Header className="pb-0">
                        <Row>
                            <Col md={3}>
                                <Form.Control
                                    placeholder="Search keyword"
                                    className="d-inline-block"
                                />
                            </Col>
                            <Col md={3}>
                                <DatePicker
                                    dateFormat="yyyy-MM-dd"
                                    className={`form-control form-box`}
                                    placeholderText="Search date"
                                />
                            </Col>
                            <Col md={2}>
                                <Button variant="primary" className="me-1 mb-1">
                                    <Search
                                        className="align-middle"
                                        size={16}
                                    />
                                </Button>
                            </Col>
                            <Col
                                md={{ span: 3, offset: 1 }}
                                className="text-end"
                            >
                                <Button
                                    variant="primary"
                                    className="me-1 mb-1"
                                    onClick={() =>
                                        navigate(location.pathname + "/create")
                                    }
                                >
                                    <Plus className="align-middle" size={16} />
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

export default Checklist;
