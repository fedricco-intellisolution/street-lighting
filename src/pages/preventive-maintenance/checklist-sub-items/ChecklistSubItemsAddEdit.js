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

const schema = yup.object().shape({
    checklist_id: yup.string().required("This field is required"),
    checklist_item_id: yup.string().required("This field is required"),
    name: yup.string().required("This field is required"),
    sequence_no: yup.string().required("This field is required"),
});

export const ChecklistSubItemsAddEdit = () => {
    const navigate = useNavigate();
    const { action } = useParams();
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    //
    // States
    //
    const [checklistTypes, setChecklistTypes] = useState([]);
    const [checklistItems, setChecklistItems] = useState([]);
    const notyf = useContext(NotyfContext);

    //
    // Functions
    //

    const addChecklistSubItems = async (data) => {
        try {
            const response =
                await preventiveMaintenanceApi.createChecklistSubItem(data);
            if (response.data.status === "SUCCESS") {
                notyf.open({
                    type: "success",
                    message: response.data.message,
                });
                navigate("/preventive-maintenance/checklist-sub-items");
            }
        } catch (error) {
            notyf.open({
                type: "danger",
                message: "Something went wrong with the server",
            });
        }
    };

    const updateChecklistSubItem = async (data) => {
        try {
            const response =
                await preventiveMaintenanceApi.updateChecklistSubItem(
                    action,
                    data
                );
            if (response.data.status === "SUCCESS") {
                notyf.open({
                    type: "success",
                    message: response.data.message,
                });
                navigate("/preventive-maintenance/checklist-sub-items");
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

    const getChecklistItems = useCallback(async () => {
        const response = await preventiveMaintenanceApi.getChecklistItems();
        const checklistItemData = response.data.data;
        let checklitItemOption = [];

        checklistItemData.map((data) => {
            return (checklitItemOption = [
                ...checklitItemOption,
                {
                    key: data.id,
                    value: data.name,
                },
            ]);
        });

        setChecklistItems(checklitItemOption);
    }, []);

    const getChecklistSubItem = useCallback(async () => {
        const response = await preventiveMaintenanceApi.getChecklistSubItem(
            action
        );
        reset({
            checklist_id: "",
            checklist_item_id: response.data.data.checklist_item_id,
            header: response.data.data.header,
            name: response.data.data.name,
            sequence_no: response.data.data.sequence_no,
        });
    }, [action, reset]);

    //
    // UseEffect
    //

    useEffect(() => {
        getChecklistTypes();
        getChecklistItems();
    }, [getChecklistTypes, getChecklistItems]);

    useEffect(() => {
        if (action !== "add") getChecklistSubItem();
    }, [getChecklistSubItem, action]);

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
                                        <Form.Label>Checklist item</Form.Label>
                                        <Controller
                                            control={control}
                                            defaultValue=""
                                            name="checklist_item_id"
                                            render={({
                                                field: {
                                                    value,
                                                    onChange,
                                                    onBlur,
                                                },
                                            }) => (
                                                <Form.Select
                                                    id="checklist_item_id"
                                                    name="checklist_item_id"
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    value={value}
                                                >
                                                    <option></option>
                                                    {checklistItems.map(
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
                                            name="checklist_item_id"
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
                                            name="name"
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
                                            name="name"
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
                                <Col md={6}>
                                    {" "}
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Sub item header *
                                        </Form.Label>
                                        <Controller
                                            defaultValue=""
                                            control={control}
                                            name="header"
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
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    {" "}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Sequence number</Form.Label>
                                        <Controller
                                            control={control}
                                            defaultValue=""
                                            name="sequence_no"
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
                                            action === "add"
                                                ? addChecklistSubItems
                                                : updateChecklistSubItem
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
