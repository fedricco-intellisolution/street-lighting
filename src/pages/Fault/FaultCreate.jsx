import React from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Container, Row, Button, Col, Breadcrumb } from "react-bootstrap";
import { Card, Form } from "react-bootstrap";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-datepicker/dist/react-datepicker.css";

const FaultCreate = ({ type = null }) => {
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

    const {
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });
    const [value, setValue] = React.useState("");

    //
    // Functions
    //

    //
    // UseEffects
    //

    return (
        <React.Fragment>
            <Helmet title="Create fault" />
            <Container fluid className="p-0">
                <Row>
                    <Col md={6}></Col>
                    <Col md={6}>
                        <Breadcrumb>
                            <Breadcrumb.Item
                                onClick={() => navigate("/fault/list")}
                            >
                                Fault
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>
                                {type || "Edit"}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <Row className="mb-4">
                            <Row className="mb-1">
                                <Col md={6}>
                                    <Form.Label className="d-block font-weight-bold ">
                                        Fault name
                                    </Form.Label>
                                    <Form.Control type="text" />
                                </Col>
                            </Row>
                        </Row>
                        <Row className="mb-1">
                            <Col md={3}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Location
                                </Form.Label>
                                <Form.Control type="text" />
                            </Col>
                            <Col md={3}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Location remarks
                                </Form.Label>
                                <Form.Control type="text" />
                            </Col>
                            <Col md={3}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Buidling
                                </Form.Label>
                                <Form.Control type="text" />
                            </Col>
                            <Col md={3}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Level
                                </Form.Label>
                                <Form.Control type="text" />
                            </Col>
                        </Row>

                        <Row className="mb-1">
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

                        <Row className="mb-1">
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Requestor
                                </Form.Label>
                                <Form.Control type="text" />
                            </Col>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold"
                                    htmlFor="status_check"
                                >
                                    Contact number
                                </Form.Label>
                                <Form.Control type="text" />
                            </Col>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold"
                                    htmlFor="status_check"
                                >
                                    Source
                                </Form.Label>
                                <Form.Control type="text" />
                            </Col>
                        </Row>

                        <Row className="mb-1">
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Work classification
                                </Form.Label>
                                <Form.Control type="text" />
                            </Col>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold"
                                    htmlFor="status_check"
                                >
                                    Service type
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold"
                                    htmlFor="status_check"
                                >
                                    Others
                                </Form.Label>
                                <Form.Control type="text" />
                            </Col>
                        </Row>
                        <Row className="mb-1">
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Job status
                                </Form.Label>
                                <Form.Control type="text" />
                            </Col>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold"
                                    htmlFor="status_check"
                                >
                                    Service rating
                                </Form.Label>
                                <Form.Control type="text" />
                            </Col>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold"
                                    htmlFor="status_check"
                                >
                                    Job sheet no
                                </Form.Label>
                                <Form.Control type="text" />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header className="pb-0">
                        <h5>Asset information</h5>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={6}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Select asset
                                </Form.Label>
                                <Form.Select options={[]}></Form.Select>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header className="pb-0">
                        <h5>Other details</h5>
                    </Card.Header>
                    <Card.Body>
                        <Row className="mb-2">
                            <Col md={6}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Report date
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                            <Col md={6}>
                                <Form.Label
                                    className="d-block font-weight-bold"
                                    htmlFor="status_check"
                                >
                                    Respondent
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                        </Row>

                        <Row className="mb-2">
                            <Col md={6}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Report date and time
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                            <Col md={6}>
                                <Form.Label
                                    className="d-block font-weight-bold"
                                    htmlFor="status_check"
                                >
                                    Response time
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                        </Row>

                        <Row className="mb-2">
                            <Col md={6}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Cause of fault
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                            <Col md={6}>
                                <Form.Label
                                    className="d-block font-weight-bold"
                                    htmlFor="status_check"
                                >
                                    Action taken
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col md={12} className="text-center">
                                <Button
                                    variant="link"
                                    onClick={() => navigate("/fault/list")}
                                    className="me-2"
                                >
                                    Cancel
                                </Button>
                                {type !== "View" && (
                                    <Button
                                        className="me-2"
                                        variant="primary"
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>
    );
};

export default FaultCreate;
