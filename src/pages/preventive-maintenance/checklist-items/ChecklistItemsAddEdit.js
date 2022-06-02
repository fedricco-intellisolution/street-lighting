import React from "react";

import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faWindowClose } from "@fortawesome/free-solid-svg-icons";

import { MOCK_CHECKLIST_TYPE } from "../config/mockData";

const schema = yup.object().shape({
    checklistType     : yup.string().required("This field is required"),
    checklistItemName : yup.string().required("This field is required"),
    sequenceNumber    : yup.string().required("This field is required"),
});

export const ChecklistItemsAddEdit = () => {
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode     : "onTouched",
        resolver : yupResolver(schema),
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
                                            defaultValue=""
                                            name="checklistType"
                                            render={({
                                                field: {
                                                    value,
                                                    onChange,
                                                    onBlur,
                                                },
                                            }) => (
                                                <Form.Select
													id="checklistType"
                                                    name="checklistType"
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    value={value}
                                                >
                                                    <option></option>
                                                    {MOCK_CHECKLIST_TYPE.map(
                                                        (data, index) => {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={data}
                                                                >
                                                                    {data}
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </Form.Select>
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
                                            defaultValue=""
                                            name="checklistItemName"
                                            render={({
                                                field: {
                                                    value,
                                                    onChange,
                                                    onBlur,
                                                },
                                            }) => (
                                                <Form.Control
													className={errors.name}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    type="text"
                                                    value={value}
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
                                                    onBlur,
													onChange,
                                                    value,
                                                },
                                            }) => (
                                                <Form.Control
													className={errors.name}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    type="text"
                                                    value={value}
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
                            <Col md={12}>
                                <h6 className="pt-2">Checklist columns</h6>
                                <small>
                                    <i>Default columns - check, clean</i>
                                </small>
                                <Row className="mt-2">
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Controller
                                                control={control}
                                                defaultValue=""
                                                name="checklistItem1"
                                                render={({
                                                    field: {
                                                        onBlur,
														onChange,
                                                        value,
                                                    },
                                                }) => (
                                                    <Form.Control
														className={errors.name}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        type="text"
                                                        value={value}
                                                    />
                                                )}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}>
                                        <Button variant="primary">
                                            <FontAwesomeIcon
                                                icon={faWindowClose}
                                            />
                                        </Button>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Controller
                                                control={control}
                                                defaultValue=""
                                                name="checklistItem2"
                                                render={({
                                                    field: {
														onBlur,
                                                        onChange,
                                                        value,
                                                    },
                                                }) => (
                                                    <Form.Control
														className={errors.name}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        type="text"
                                                        value={value}
                                                    />
                                                )}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}>
                                        <Button variant="primary">
                                            <FontAwesomeIcon
                                                icon={faWindowClose}
                                            />
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Button variant="secondary" className="m-0">
                                <FontAwesomeIcon icon={faPlusSquare} /> Add new
                                column
                            </Button>
                            <Row className="pt-4">
                                <Col className="text-end">
                                    <Button
                                        className="me-2"
                                        variant="secondary"
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
