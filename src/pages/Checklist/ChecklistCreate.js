import React from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import {
    Container,
    Row,
    Button,
    Col,
    Breadcrumb,
    Table,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import { Card, Form } from "react-bootstrap";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-datepicker/dist/react-datepicker.css";
import { Image } from "react-feather";

const ChecklistCreate = () => {
    //
    // States
    //
    const navigate = useNavigate();
    const { id } = useParams();
    const schema = yup.object().shape({
        name: yup.string().required("This field is required"),
        sub_module_no: yup.string().required("This field is required"),
        start_date: yup.date().required("This field is required"),
        end_date: yup.date().required("This field is required"),
        description: yup.string().required("This field is required"),
    });
    // const notyf = useContext(NotyfContext);

    const {
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    const MIN_TEXTAREA_HEIGHT = 150;
    const textareaRef = React.useRef(null);

    //
    // Functions
    //

    //
    // UseEffects
    //

    return (
        <React.Fragment>
            <Helmet title="Checklist create" />
            <Container fluid className="p-0">
                <Row>
                    <Col md={6}></Col>
                    <Col md={6}>
                        <Breadcrumb>
                            <Breadcrumb.Item
                                onClick={() => navigate("/checklist/list")}
                            >
                                Checklist
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>Edit</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <Row className="mb-4 text-start">
                            <Col md={6}>
                                <Form.Label className="d-block font-weight-bold ">
                                    Checklist name
                                </Form.Label>
                                <Form.Control type="text" />
                            </Col>
                        </Row>
                        <Row className="mb-1">
                            <Col md={6}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Location
                                </Form.Label>
                                <Form.Control type="text" />
                            </Col>
                            <Col md={6}>
                                <Form.Label
                                    className="d-block font-weight-bold"
                                    htmlFor="status_check"
                                >
                                    Category
                                </Form.Label>
                                <Form.Control type="text" />
                            </Col>
                        </Row>
                        <Row className="mb-">
                            <Col md={12}>
                                <Form.Label
                                    className="d-block font-weight-bold"
                                    htmlFor="status_check"
                                >
                                    Description
                                </Form.Label>
                                <Form.Control type="text" />
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col md={12} className="text-end">
                                <Button variant="primary" type="submit">
                                    Add checklist item
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Table
                                bordered
                                responsive
                                className="table-layout-fixed"
                            >
                                <thead>
                                    <tr>
                                        <th width="50px">S/N</th>
                                        <th width="250px">
                                            Checklist description
                                        </th>
                                        <th width="350px">Remarks</th>
                                        <th width="100px">Photos</th>
                                        <th width="100x">Check</th>
                                        <th width="100px">Last checker</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <Form.Control
                                                as="textarea"
                                                ref={textareaRef}
                                                style={{
                                                    minHeight:
                                                        MIN_TEXTAREA_HEIGHT,
                                                    resize: "none",
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                as="textarea"
                                                ref={textareaRef}
                                                style={{
                                                    minHeight:
                                                        MIN_TEXTAREA_HEIGHT,
                                                    resize: "none",
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip>
                                                        Manage photos
                                                    </Tooltip>
                                                }
                                            >
                                                <Image
                                                    className="align-middle me-1"
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        navigate(
                                                            "/checklist/list/edit/1/photos/1"
                                                        )
                                                    }
                                                />
                                            </OverlayTrigger>
                                        </td>
                                        <td>
                                            <Form.Check type="checkbox" />
                                        </td>
                                        <td>User 1</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>
                                            <Form.Control
                                                as="textarea"
                                                ref={textareaRef}
                                                style={{
                                                    minHeight:
                                                        MIN_TEXTAREA_HEIGHT,
                                                    resize: "none",
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                as="textarea"
                                                ref={textareaRef}
                                                style={{
                                                    minHeight:
                                                        MIN_TEXTAREA_HEIGHT,
                                                    resize: "none",
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip>
                                                        Manage photos
                                                    </Tooltip>
                                                }
                                            >
                                                <Image
                                                    className="align-middle me-1"
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        navigate(
                                                            "/checklist/list/edit/1/photos/1"
                                                        )
                                                    }
                                                />
                                            </OverlayTrigger>
                                        </td>
                                        <td>
                                            <Form.Check type="checkbox" />
                                        </td>
                                        <td>User 1</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>
                                            <Form.Control
                                                as="textarea"
                                                ref={textareaRef}
                                                style={{
                                                    minHeight:
                                                        MIN_TEXTAREA_HEIGHT,
                                                    resize: "none",
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                as="textarea"
                                                ref={textareaRef}
                                                style={{
                                                    minHeight:
                                                        MIN_TEXTAREA_HEIGHT,
                                                    resize: "none",
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip>
                                                        Manage photos
                                                    </Tooltip>
                                                }
                                            >
                                                <Image
                                                    className="align-middle me-1"
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        navigate(
                                                            "/checklist/list/edit/1/photos/1"
                                                        )
                                                    }
                                                />
                                            </OverlayTrigger>
                                        </td>
                                        <td>
                                            <Form.Check type="checkbox" />
                                        </td>
                                        <td>User 18</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>
                        <Row className="mt-4">
                            <Col md={12} className="text-center">
                                <Button
                                    variant="link"
                                    onClick={() => navigate("/checklist/list")}
                                    className="me-2"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="me-2"
                                    variant="primary"
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>
    );
};

export default ChecklistCreate;
