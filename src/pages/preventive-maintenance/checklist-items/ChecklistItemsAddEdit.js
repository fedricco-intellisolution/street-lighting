import React, { useCallback, useContext, useEffect, useState } from "react";

import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import * as preventiveMaintenanceApi from "@api/preventiveMaintenanceApi";
import NotyfContext from "contexts/NotyfContext";
import { ChecklistItemsColumns } from "./ChecklistItemsColumns";

const schema = yup.object().shape({
    checklist_id: yup.string().required("This field is required"),
    name: yup.string().required("This field is required"),
    sequence_no: yup.string().required("This field is required"),
});

export const ChecklistItemsAddEdit = () => {
    const navigate = useNavigate();
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
    // States
    //
    const [checklistTypes, setChecklistTypes] = useState([]);
    const notyf = useContext(NotyfContext);

    //
    // Functions
    //

    const addChecklistItem = async (data) => {
        try {
            const response = await preventiveMaintenanceApi.createChecklistItem(
                data
            );
            if (response.data.status === "SUCCESS") {
                notyf.open({
                    type: "success",
                    message: response.data.message,
                });
                navigate("/preventive-maintenance/checklist-items");
            }
        } catch (error) {
            notyf.open({
                type: "danger",
                message: "Something went wrong with the server",
            });
        }
    };

    const updateChecklistItem = async (data) => {
        try {
            const response = await preventiveMaintenanceApi.updateChecklistItem(
                action,
                data
            );
            if (response.data.status === "SUCCESS") {
                notyf.open({
                    type: "success",
                    message: response.data.message,
                });
                navigate("/preventive-maintenance/checklist-items");
            }
        } catch (error) {
            notyf.open({
                type: "danger",
                message: "Something went wrong with the server",
            });
        }
    };

    const getChecklistTypes = useCallback(async () => {
        const response = await preventiveMaintenanceApi.getChecklistTypes();
        const checklistTypeData = response.data.data;
        let checklitTypeOption = [];

        checklistTypeData.map((data) => {
            return (checklitTypeOption = [
                ...checklitTypeOption,
                {
                    key: data.id,
                    value: data.name,
                },
            ]);
        });

        setChecklistTypes(checklitTypeOption);
    }, []);

    const getChecklistItem = useCallback(async () => {
        const response = await preventiveMaintenanceApi.getChecklistItem(
            action
        );

        reset({
            checklist_id: response.data.data.checklist_id,
            name: response.data.data.name,
            sequence_no: response.data.data.sequence_no,
        });
    }, [action, reset]);

    //
    // UseEffects
    //

    useEffect(() => {
        getChecklistTypes();
    }, [getChecklistTypes]);

    useEffect(() => {
        if (action !== "add") getChecklistItem();
    }, [getChecklistItem, action]);

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
                        <h6 className="py-2">Checklist item details</h6>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Checklist type</Form.Label>
                                    <Controller
                                        control={control}
                                        defaultValue=""
                                        name="checklist_id"
                                        render={({
                                            field: { value, onChange, onBlur },
                                        }) => (
                                            <Form.Select
                                                id="checklist_id"
                                                name="checklist_id"
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                value={value}
                                            >
                                                <option></option>
                                                {checklistTypes.map(
                                                    (data, index) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={data.key}
                                                            >
                                                                {data.value}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </Form.Select>
                                        )}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="checklist_id"
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
                                    <Form.Label>Checklist item name</Form.Label>
                                    <Controller
                                        control={control}
                                        defaultValue=""
                                        name="name"
                                        render={({
                                            field: { value, onChange, onBlur },
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
                                        name="name"
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
                                        name="sequence_no"
                                        defaultValue=""
                                        render={({
                                            field: { onBlur, onChange, value },
                                        }) => (
                                            <Form.Control
                                                className={errors.name}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                type="number"
                                                value={value}
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
                        <ChecklistItemsColumns
                            control={control}
                            errors={errors}
                        />
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
                                    onClick={handleSubmit(
                                        action === "add"
                                            ? addChecklistItem
                                            : updateChecklistItem
                                    )}
                                >
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>
    );
};
