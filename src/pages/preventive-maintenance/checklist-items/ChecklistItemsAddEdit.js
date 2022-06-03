import React, { useCallback, useContext, useEffect, useState } from "react";

import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faWindowClose } from "@fortawesome/free-solid-svg-icons";

import * as preventiveMaintenanceApi from "@api/preventiveMaintenanceApi";
import NotyfContext from "contexts/NotyfContext";

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
        getValues,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    //
    // States
    //
    const [checklistTypes, setChecklistTypes] = useState([]);
    const [columns, setColumn] = useState([]);
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

    const addColumn = () => {
        setColumn([...getValues("columns"), ""]);
    };

    const removeColumn = (index) => {
        let data = [...columns];
        data.splice(index, 1);

        setColumn([...data]);
    };

    //
    // UseEffects
    //

    useEffect(() => {
        getChecklistTypes();
    }, [getChecklistTypes]);

    useEffect(() => {
        reset({
            columns: ["", ""],
        });
        setColumn(getValues("columns"));
    }, [reset, getValues]);

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
                        <Form>
                            <Row>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Checklist type</Form.Label>
                                        <Controller
                                            control={control}
                                            defaultValue=""
                                            name="checklist_id"
                                            render={({
                                                field: {
                                                    value,
                                                    onChange,
                                                    onBlur,
                                                },
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
                                                                    value={
                                                                        data.key
                                                                    }
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
                                        <Form.Label>
                                            Checklist item name
                                        </Form.Label>
                                        <Controller
                                            control={control}
                                            defaultValue=""
                                            name="name"
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
                            <Col md={12}>
                                <h6 className="pt-2">Checklist columns</h6>
                                <small>
                                    <i>Default columns - check, clean</i>
                                </small>
                                <Row className="mt-2">
                                    {columns.map((data, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Controller
                                                            control={control}
                                                            defaultValue=""
                                                            name={`columns.${index}`}
                                                            render={({
                                                                field: {
                                                                    onBlur,
                                                                    onChange,
                                                                    value,
                                                                },
                                                            }) => (
                                                                <Form.Control
                                                                    className={
                                                                        errors.name
                                                                    }
                                                                    onBlur={
                                                                        onBlur
                                                                    }
                                                                    onChange={
                                                                        onChange
                                                                    }
                                                                    type="text"
                                                                    value={
                                                                        value
                                                                    }
                                                                />
                                                            )}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={1}>
                                                    <Button
                                                        variant="primary"
                                                        onClick={() =>
                                                            removeColumn(index)
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faWindowClose}
                                                        />
                                                    </Button>
                                                </Col>
                                            </React.Fragment>
                                        );
                                    })}
                                </Row>
                            </Col>
                            <Button
                                variant="secondary"
                                className="m-0"
                                onClick={addColumn}
                            >
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
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>
    );
};
