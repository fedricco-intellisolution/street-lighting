import React, { useCallback, useContext, useEffect } from "react";

import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import * as preventiveMaintenanceApi from "@api/preventiveMaintenanceApi";
import NotyfContext from "@contexts/NotyfContext";

const schema = yup.object().shape({
    name: yup.string().required("This field is required"),
    sequence_no: yup.string().required("This field is required"),
});

export const ChecklistTypeAddEdit = () => {
    const navigate = useNavigate();
    const notyf = useContext(NotyfContext);
    const { action } = useParams();

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    //
    // Functions
    //

    const addChecklistType = async (data) => {
        try {
            const response = await preventiveMaintenanceApi.createChecklistType(
                data
            );
            if (response.data.status === "SUCCESS") {
                notyf.open({
                    type: "success",
                    message: response.data.message,
                });
                navigate("/preventive-maintenance/checklist-type");
            }
        } catch (error) {
            notyf.open({
                type: "danger",
                message: "Something went wrong with the server",
            });
        }
    };

    const updateChecklistType = async (data) => {
        try {
            const response = await preventiveMaintenanceApi.updateChecklistType(
                action,
                data
            );
            if (response.data.status === "SUCCESS") {
                notyf.open({
                    type: "success",
                    message: response.data.message,
                });
                navigate("/preventive-maintenance/checklist-type");
            }
        } catch (error) {
            notyf.open({
                type: "danger",
                message: "Something went wrong with the server",
            });
        }
    };

    //
    // UseEffects
    //

    const getChecklistType = useCallback(async () => {
        const response = await preventiveMaintenanceApi.getChecklistType(
            action
        );
        reset({
            name: response.data.data.name,
            sequence_no: response.data.data.sequence_no,
        });
    }, [action, reset]);

    useEffect(() => {
        if (action !== "add") getChecklistType();
    }, [getChecklistType, action]);

    return (
        <React.Fragment>
            <Helmet title="Register fault" />
            <Container fluid className="p-0">
                <Row>
                    <Col md={6}>
                        <h1 className="h3 mb-3">Add checklist type</h1>
                    </Col>
                    <Col md={6}>
                        <Breadcrumb>
                            <Breadcrumb.Item
                                onClick={() =>
                                    navigate(
                                        "/preventive-maintenance/checklist-type"
                                    )
                                }
                            >
                                Checklist type
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>Add</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Controller
                                            control={control}
                                            name="name"
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
                                            name="name"
                                            render={({ message }) => (
                                                <small className="text-danger">
                                                    {message}
                                                </small>
                                            )}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    {" "}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Sequence number</Form.Label>
                                        <Controller
                                            control={control}
                                            name="sequence_no"
                                            defaultValue=""
                                            render={({
                                                field: {
                                                    value,
                                                    onChange,
                                                    onBlur,
                                                },
                                            }) => (
                                                <Form.Control
                                                    type="number"
                                                    value={value}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    className={errors.name}
                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="sequence_no"
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
                                                "/preventive-maintenance/checklist-type"
                                            )
                                        }
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={handleSubmit(
                                            action === "add"
                                                ? addChecklistType
                                                : updateChecklistType
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
