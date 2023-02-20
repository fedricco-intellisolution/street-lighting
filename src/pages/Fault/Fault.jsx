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

const Fault = () => {
    //
    // States
    //
    const navigate = useNavigate();
    const location = useLocation();
    const tableColumns = [
        {
            Header: "Actions",
            accessor: "actions",
            width: "100px",
            Cell: ({ row }) => (
                <div>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>Edit fault</Tooltip>}
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
                        overlay={<Tooltip>Edit fault</Tooltip>}
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
            width: "70px",
            Header: () => <div className="text-end">S/N</div>,
            accessor: "serial_no",
            Cell: ({ row }) => (
                <div className="text-end">{row.original.serial_no}</div>
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
            Header: () => <div className="text-end">Response time</div>,
            accessor: "response_time",
            Cell: ({ row }) => (
                <div className="text-end">{row.original.response_time}</div>
            ),
        },
        {
            Header: "Location",
            accessor: "location",
        },
        {
            Header: "Assignee",
            accessor: "assignee",
        },
        {
            Header: "Reported by",
            accessor: "reported_by",
        },
        {
            Header: () => <div className="text-end">Reported date</div>,
            accessor: "reported_date",
            Cell: ({ row }) => (
                <div className="text-end">{row.original.reported_date}</div>
            ),
        },
    ];
    const sectors = [
        {
            id: "1",
            serial_no: "1",
            type: "Installation",
            location: "Punggol, 820167",
            assignee: "Bea Mine",
            reported_by: "Cherry Blossom",
            reported_date: "04/20/2023",
            status: "NEW",
            response_time: "",
            fault_code: "FI0001",
        },
        {
            id: "2",
            serial_no: "2",
            type: "Installation",
            location: "Pasir Ris, 519111",
            assignee: "John Doe",
            reported_by: "Simon Sais",
            reported_date: "02/20/2023",
            status: "IN PROGRESS",
            response_time: "",
            fault_code: "FI0002",
        },
        {
            id: "3",
            serial_no: "3",
            type: "Installation",
            location: "Marina bay, 018956",
            assignee: "John Doe",
            reported_by: "Simon Sais",
            reported_date: "08/20/2023",
            status: "RESOLVED",
            response_time: "1 hour, 10 mins",
            fault_code: "FI0003",
        },
        {
            id: "4",
            serial_no: "4",
            type: "Installation",
            location: "Jurong east, 600002",
            assignee: "Bea Mine",
            reported_by: "Cherry Blossom",
            reported_date: "02/20/2023",
            status: "NEW",
            response_time: "",
            fault_code: "FI0004",
        },
        {
            id: "5",
            serial_no: "5",
            type: "Installation",
            location: "Jurong east, 600002",
            assignee: "John Doe",
            reported_by: "Cherry Blossom",
            reported_date: "12/20/2023",
            status: "RESOLVED",
            response_time: "",
            fault_code: "FI0005",
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
            <Helmet title="Fault listing" />
            <Container fluid className="p-0">
                <h4 className="h4 mb-3">Fault items</h4>
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

export default Fault;
