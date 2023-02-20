import React from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Container, Row, Button, Col, Breadcrumb } from "react-bootstrap";
import { Card, Form } from "react-bootstrap";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AssetCreate = ({ type = null }) => {
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

    //
    // Functions
    //

    //
    // UseEffects
    //

    return (
        <React.Fragment>
            <Helmet title="Asset create" />
            <Container fluid className="p-0">
                <Row>
                    <Col md={6}></Col>
                    <Col md={6}>
                        <Breadcrumb>
                            <Breadcrumb.Item
                                onClick={() => navigate("/asset/list")}
                            >
                                Asset
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
                            <span className="text-center">
                                <Row>
                                    <Col md={6}>
                                        <Form.Label className="d-block font-weight-bold ">
                                            Asset name
                                        </Form.Label>
                                        <Form.Control type="text" />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label className="d-block font-weight-bold ">
                                            Asset code
                                        </Form.Label>
                                        <Form.Control type="text" />
                                    </Col>
                                    <Col md={4}></Col>
                                </Row>
                            </span>
                        </Row>
                        <Row className="mb-1">
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Code
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Name
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Status
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                        </Row>
                        <Row className="mb-1">
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Trade
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Category
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Location
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                        </Row>

                        <Row className="mb-1">
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Purchased date
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Warranty start date
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Warranty end date
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                        </Row>

                        <Row className="mb-1">
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Specifications
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Serial no.
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Model
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                        </Row>

                        <Row className="mb-1">
                            <Col md={3}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Brand
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                            <Col md={3}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Indoor / outdoor
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                            <Col md={3}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Contract items
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                            <Col md={3}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Asset number
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                        </Row>

                        <Row className="mb-1">
                            <Col md={12}>
                                <Form.Label
                                    className="d-block font-weight-bold"
                                    htmlFor="status_check"
                                >
                                    Additional notes
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control as="textarea" />
                                )}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header className="pb-0">
                        <h5>Asset attribute</h5>
                    </Card.Header>
                    <Card.Body>
                        <Row className="mb-1">
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Install year
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Pole brand
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Pole type
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                        </Row>

                        <Row className="mb-1">
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Pole finishes
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Pole material
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Pole ground
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                        </Row>

                        <Row className="mb-1">
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Pole mounting
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Pole height
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Pole girth
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control type="text" />
                                )}
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Trade
                                </Form.Label>
                                {type === "View" ? (
                                    <p>Marina bay, 17000</p>
                                ) : (
                                    <Form.Control as="textarea" />
                                )}
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col md={12} className="text-center">
                                <Button
                                    variant="link"
                                    onClick={() => navigate("/asset/list")}
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

export default AssetCreate;
