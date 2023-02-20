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

const Asset = () => {
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
            Header: "Code",
            accessor: "code",
        },
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Location",
            accessor: "location",
        },
        {
            Header: "Category",
            accessor: "category",
        },
        {
            Header: () => <div className="text-end">Installation date</div>,
            accessor: "reported_date",
            Cell: ({ row }) => (
                <div className="text-end">{row.original.installation_date}</div>
            ),
        },
    ];
    const sectors = [
        {
            id: "1",
            serial_no: "1",
            status: "INSTALLED",
            code: "LP12023",
            name: "Lamp post 1",
            location: "Pasir Ris, 519111",
            category: "04/20/2023",
            installation_date: "04/20/2023",
        },
        {
            id: "2",
            serial_no: "2",
            status: "DEFECT",
            code: "LP22023",
            name: "Lamp post 2",
            location: "Pasir Ris, 519111",
            category: "04/20/2023",
            installation_date: "04/20/2023",
        },
        {
            id: "3",
            serial_no: "3",
            status: "PENDING FOR FIX",
            code: "LP32023",
            name: "Lamp post 3",
            location: "Marina bay, 018956",
            category: "04/20/2023",
            installation_date: "04/20/2023",
        },
        {
            id: "4",
            serial_no: "4",
            status: "INSTALLED",
            code: "LP42023",
            name: "Lamp post 4",
            location: "Jurong east, 600002",
            category: "04/20/2023",
            installation_date: "04/20/2023",
        },
        {
            id: "5",
            serial_no: "5",
            status: "DEFECT",
            code: "LP52023",
            name: "Lamp post 5",
            location: "Punggol, 820167",
            category: "04/20/2023",
            installation_date: "04/20/2023",
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
            <Helmet title="Asset listing" />
            <Container fluid className="p-0">
                <h4 className="h4 mb-3">Asset items</h4>
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

export default Asset;
