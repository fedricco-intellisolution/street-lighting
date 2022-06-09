import React from "react";

import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ChecklistBuildPreview } from "./checklist-preview/ChecklistBuildPreview";
import {
    MOCK_CHECKLIST_ITEMS,
    MOCK_CHECKLIST_SUB_ITEMS,
    MOCK_CHECKLIST_TYPE,
} from "../config/mockData";
import { FREQUENCY } from "../config/options";

const schema = yup.object().shape({
    checklistItem: yup.string().required("This field is required"),
    checklistName: yup.string().required("This field is required"),
    checklistSubItem: yup.string().required("This field is required"),
    checklistType: yup.string().required("This field is required"),
    frequency: yup.string().required("This field is required"),
});

export const ChecklistBuildAddEdit = () => {
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

    const buildChecklist = (data) => {
        console.log(data);
    };

    return (
        <React.Fragment>
            <Helmet title="Register fault" />
            <Container fluid className="p-0">
                <Row>
                    <Col md={6}>
                        <h1 className="h3 mb-3">Build checklist</h1>
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
                                Build checklist
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>Build</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <Form>
                            <Row>
                                <h6 className="py-2">Checklist details</h6>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Checklist name</Form.Label>
                                        <Controller
                                            control={control}
                                            defaultValue=""
                                            name="checklistName"
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
                                            name="checklistName"
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
                                                    onChange={onChange}
                                                    onBlur={onBlur}
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
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Active</Form.Label>
                                        <br />
                                        <Form.Check
                                            checked
                                            className="mb-2"
                                            id="is_recurring"
                                            inline
                                            label="Yes"
                                            name="is_recurring"
                                            onChange={() => {}}
                                            type="radio"
                                            value="Yes"
                                        />
                                        <Form.Check
                                            className="mb-2"
                                            id="is_recurring"
                                            inline
                                            label="No"
                                            name="is_recurring"
                                            type="radio"
                                            value="No"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <h6 className="py-2">Checklist blocks</h6>
                            <Row>
                                <Col md={4}>
                                    {" "}
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
                                                    onChange={onChange}
                                                    onBlur={onBlur}
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
                                    {" "}
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
                                                    value,
                                                    onChange,
                                                    onBlur,
                                                },
                                            }) => (
                                                <Form.Select
                                                    id="checklistSubItem"
                                                    name="checklistSubItem"
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    value={value}
                                                >
                                                    <option></option>
                                                    {MOCK_CHECKLIST_SUB_ITEMS.map(
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
                            <Row className="pt-4">
                                <Col className="text-start">
                                    <Button
                                        variant="success"
                                        onClick={handleSubmit(buildChecklist)}
                                    >
                                        Preview checklist
                                    </Button>
                                </Col>
                                <Col className="text-end">
                                    <Button
                                        className="me-2"
                                        variant="secondary"
                                        onClick={() =>
                                            navigate(
                                                "/preventive-maintenance/checklist-build"
                                            )
                                        }
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="me-2"
                                        variant="primary"
                                        onClick={handleSubmit(buildChecklist)}
                                    >
                                        Save
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
                <ChecklistBuildPreview />
            </Container>
        </React.Fragment>
    );
};
