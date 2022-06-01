import React from "react";

import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    checklistType: yup.string().required("This field is required"),
    checklistItemName: yup.string().required("This field is required"),
    sequenceNumber: yup.string().required("This field is required"),
});

export const ChecklistItemsAddEdit = () => {
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    //
    // Functions
    //

    const addChecklistItem = (data) => {
        console.log(data);
    };

    return (
        <React.Fragment>
            <Helmet title="Register fault" />
            <Container fluid className="p-0">
                <Row>
                    <Col md={6}>
                        <h1 className="h3 mb-3">Add checklist item</h1>
                    </Col>
                    <Col md={6}>
                        <Breadcrumb>
                            <Breadcrumb.Item
                                onClick={() =>
                                    navigate(
                                        "/preventive-maintenance/checklist-items"
                                    )
                                }
                            >
                                Checklist items
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>Add</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <Form>
                            <Row>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Checklist type</Form.Label>
                                        <Controller
                                            control={control}
                                            name="checklistType"
                                            defaultValue=""
                                            render={({
                                                field: {
                                                    value,
                                                    onChange,
                                                    onBlur,
                                                },
                                            }) => (
                                                <Form.Control
                                                    type="text"
                                                    value={value}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    className={errors.name}
                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="checklistType"
                                            render={({ message }) => (
                                                <small className="text-danger">
                                                    {message}
                                                </small>
                                            )}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    {" "}
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Checklist item name
                                        </Form.Label>
                                        <Controller
                                            control={control}
                                            name="checklistItemName"
                                            defaultValue=""
                                            render={({
                                                field: {
                                                    value,
                                                    onChange,
                                                    onBlur,
                                                },
                                            }) => (
                                                <Form.Control
                                                    type="text"
                                                    value={value}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    className={errors.name}
                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="checklistItemName"
                                            render={({ message }) => (
                                                <small className="text-danger">
                                                    {message}
                                                </small>
                                            )}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    {" "}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Sequence number</Form.Label>
                                        <Controller
                                            control={control}
                                            name="sequenceNumber"
                                            defaultValue=""
                                            render={({
                                                field: {
                                                    value,
                                                    onChange,
                                                    onBlur,
                                                },
                                            }) => (
                                                <Form.Control
                                                    type="text"
                                                    value={value}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    className={errors.name}
                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="sequenceNumber"
                                            render={({ message }) => (
                                                <small className="text-danger">
                                                    {message}
                                                </small>
                                            )}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="pt-4">
                                <Col className="text-end">
                                    <Button
                                        variant="secondary"
                                        className="me-2"
                                        onClick={() =>
                                            navigate(
                                                "/preventive-maintenance/checklist-items"
                                            )
                                        }
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={handleSubmit(addChecklistItem)}
                                    >
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>
    );
};
