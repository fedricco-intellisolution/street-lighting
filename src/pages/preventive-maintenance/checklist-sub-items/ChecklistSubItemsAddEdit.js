import React from "react";

import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { MOCK_CHECKLIST_ITEMS, MOCK_CHECKLIST_TYPE } from "../config/mockData";
import { FREQUENCY } from "../config/options";

const schema = yup.object().shape({
    checklistType    : yup.string().required("This field is required"),
    checklistItem    : yup.string().required("This field is required"),
    checklistSubItem : yup.string().required("This field is required"),
    sequenceNumber   : yup.string().required("This field is required"),
    frequency        : yup.string().required("This field is required"),
});

export const ChecklistSubItemsAddEdit = () => {
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

    const addChecklistSubItems = (data) => {
        console.log(data);
    };

    return (
        <React.Fragment>
            <Helmet title="Register fault" />
            <Container fluid className="p-0">
                <Row>
                    <Col md={6}>
                        <h1 className="h3 mb-3">Add checklist sub item</h1>
                    </Col>
                    <Col md={6}>
                        <Breadcrumb>
                            <Breadcrumb.Item
                                onClick={() =>
                                    navigate(
                                        "/preventive-maintenance/checklist-sub-items"
                                    )
                                }
                            >
                                Checklist sub items
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
                                            defaultValue=""
                                            control={control}
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
                                        <Form.Label>Checklist item</Form.Label>
                                        <Controller
                                            control={control}
                                            defaultValue=""
                                            name="checklistItem"
                                            render={({
                                                field: {
                                                    value,
                                                    onChange,
                                                    onBlur,
                                                },
                                            }) => (
                                                <Form.Select
													id="checklistItem"
                                                    name="checklistItem"
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    value={value}
                                                >
                                                    <option></option>
                                                    {MOCK_CHECKLIST_ITEMS.map(
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
                                            name="checklistItem"
                                            render={({ message }) => (
                                                <small className="text-danger">
                                                    {message}
                                                </small>
                                            )}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Checklist sub item
                                        </Form.Label>
                                        <Controller
                                            control={control}
                                            defaultValue=""
                                            name="checklistSubItem"
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
                                            name="checklistSubItem"
                                            render={({ message }) => (
                                                <small className="text-danger">
                                                    {message}
                                                </small>
                                            )}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    {" "}
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Sub item header *
                                        </Form.Label>
                                        <Controller
                                            defaultValue=""
                                            control={control}
                                            name="subItemHeader"
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
                                            name="subItemHeader"
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
                                            defaultValue=""
                                            name="sequenceNumber"
                                            render={({
                                                field: {
                                                    value,
                                                    onChange,
                                                    onBlur,
                                                },
                                            }) => (
                                                <Form.Control
													className={errors.name}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
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
                                <Col md={4}>
                                    {" "}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Frequency</Form.Label>
                                        <Controller
                                            control={control}
                                            defaultValue=""
                                            name="frequency"
                                            render={({
                                                field: {
													onBlur,
                                                    onChange,
                                                    value,
                                                },
                                            }) => (
                                                <Form.Select
													id="frequency"
                                                    name="frequency"
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    value={value}
                                                >
                                                    <option></option>
                                                    {FREQUENCY.map(
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
                                            name="frequency"
                                            render={({ message }) => (
                                                <small className="text-danger">
                                                    {message}
                                                </small>
                                            )}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <small>* optional fields</small>
                                </Col>
                            </Row>
                            <Row className="pt-4">
                                <Col className="text-end">
                                    <Button
                                        className="me-2"
                                        variant="secondary"
                                        onClick={() =>
                                            navigate(
                                                "/preventive-maintenance/checklist-sub-items"
                                            )
                                        }
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={handleSubmit(
                                            addChecklistSubItems
                                        )}
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
