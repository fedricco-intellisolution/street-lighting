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
import { ChecklistSubItemsAddCustomFields } from "./ChecklistSubItemsAddCustomFields";
import { ChecklistSubItemsAddMain } from "./ChecklistSubItemsAddMain";

const schema = yup.object().shape({
    checklist_id: yup.string().required("This field is required"),
    checklist_item_id: yup.string().required("This field is required"),
    is_custom_field: yup.string(),
    name: yup.string().when("is_custom_field", {
        is: "No",
        then: yup.string().required("This field is required"),
    }),
    sequence_no: yup.string().required("This field is required"),
    frequency: yup.string().required("This field is required"),
});

export const ChecklistSubItemsAddEdit = () => {
    const navigate = useNavigate();
    const { action } = useParams();
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
        register,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    //
    // States
    //
    const [checklistTypes, setChecklistTypes] = useState([]);
    const [checklistItems, setChecklistItems] = useState([]);
    const [isCustomField, setIsCustomField] = useState(false);
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
        const data = response.data.data;

        reset({
            checklist_id: data.checklist_item.checklist.id,
            checklist_item_id: data.checklist_item.id || "",
            header: data.header || "",
            name: data.name || "",
            sequence_no: data.sequence_no || "",
            frequency: data.frequency.code || "",
            is_custom_field: data.is_custom_field ? "Yes" : "No",
            custom_field: JSON.parse(data.custom_field),
        });
        setIsCustomField(response.data.data.is_custom_field);
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
                        <h6 className="py-2">Checklist sub item details</h6>
                        <ChecklistSubItemsAddMain
                            control={control}
                            errors={errors}
                            checklistTypes={checklistTypes}
                            checklistItems={checklistItems}
                        />
                        <h6 className="py-2">Checklist sub item name</h6>
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Is custom field?</Form.Label>
                                <br />
                                <Form.Check
                                    {...register("is_custom_field")}
                                    className="mb-2"
                                    id="is_custom_field"
                                    inline
                                    label="Yes"
                                    name="is_custom_field"
                                    onChange={() => setIsCustomField(true)}
                                    type="radio"
                                    value="Yes"
                                />
                                <Form.Check
                                    {...register("is_custom_field")}
                                    checked={!isCustomField}
                                    className="mb-2"
                                    id="is_custom_field"
                                    inline
                                    label="No"
                                    name="is_custom_field"
                                    onChange={() => setIsCustomField(false)}
                                    type="radio"
                                    value="No"
                                />
                            </Form.Group>
                        </Row>
                        {!isCustomField ? (
                            <Row>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Checklist sub item name
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
                        ) : (
                            <ChecklistSubItemsAddCustomFields
                                control={control}
                                errors={errors}
                            />
                        )}
                        <Row className="mt-2">
                            <Col md={12}>
                                <small>* optional fields</small>
                            </Col>
                        </Row>
                        <Row>
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
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>
    );
};
