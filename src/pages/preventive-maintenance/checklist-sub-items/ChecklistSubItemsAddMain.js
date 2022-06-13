import React from "react";

import { Col, Form, Row } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export const ChecklistSubItemsAddMain = ({
    control,
    errors,
    checklistTypes,
    checklistItems,
}) => {
    return (
        <>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Checklist type</Form.Label>
                        <Controller
                            defaultValue=""
                            control={control}
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
                                    {checklistTypes.map((data, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={data.key}
                                            >
                                                {data.value}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="checklist_id"
                            render={({ message }) => (
                                <small className="text-danger">{message}</small>
                            )}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Checklist item</Form.Label>
                        <Controller
                            control={control}
                            defaultValue=""
                            name="checklist_item_id"
                            render={({
                                field: { value, onChange, onBlur },
                            }) => (
                                <Form.Select
                                    id="checklist_item_id"
                                    name="checklist_item_id"
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    value={value}
                                >
                                    <option></option>
                                    {checklistItems.map((data, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={data.key}
                                            >
                                                {data.value}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="checklist_item_id"
                            render={({ message }) => (
                                <small className="text-danger">{message}</small>
                            )}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Sub item header *</Form.Label>
                        <Controller
                            defaultValue=""
                            control={control}
                            name="header"
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
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Sequence number</Form.Label>
                        <Controller
                            control={control}
                            defaultValue=""
                            name="sequence_no"
                            render={({
                                field: { value, onChange, onBlur },
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
                                <small className="text-danger">{message}</small>
                            )}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </>
    );
};
