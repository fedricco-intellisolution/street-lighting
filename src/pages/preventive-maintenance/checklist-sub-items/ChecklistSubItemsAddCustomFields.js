import React from "react";

import { Button, Col, Form, Row } from "react-bootstrap";
import { Controller, useFieldArray } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { COLUMN_TYPE, POSITION } from "../config/options";

export const ChecklistSubItemsAddCustomFields = ({ control, errors }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "custom_field",
    });

    return (
        <>
            <Row className="mb-2">
                <Col className="font-weight-bold" md={3}>
                    Checklist sub item
                </Col>
                <Col className="font-weight-bold" md={4}>
                    Type
                </Col>
                <Col className="font-weight-bold" md={4}>
                    Position
                </Col>
                <Col className="font-weight-bold" md={1}></Col>
            </Row>
            <hr />

            {fields.length ? (
                fields.map((field, index) => (
                    <Row className="mb-2" key={field.id}>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Controller
                                    defaultValue=""
                                    control={control}
                                    name={`custom_field[${index}].subItem`}
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
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Controller
                                    defaultValue=""
                                    control={control}
                                    name={`custom_field[${index}].type`}
                                    render={({
                                        field: { value, onChange, onBlur },
                                    }) => (
                                        <Form.Select
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                        >
                                            <option></option>
                                            {COLUMN_TYPE.map((data, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={data}
                                                    >
                                                        {data}
                                                    </option>
                                                );
                                            })}
                                        </Form.Select>
                                    )}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Controller
                                    defaultValue=""
                                    control={control}
                                    name={`custom_field[${index}].position`}
                                    render={({
                                        field: { value, onChange, onBlur },
                                    }) => (
                                        <Form.Select
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                        >
                                            <option></option>
                                            {POSITION.map((data, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={data}
                                                    >
                                                        {data}
                                                    </option>
                                                );
                                            })}
                                        </Form.Select>
                                    )}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={1}>
                            <Button
                                variant="primary"
                                onClick={() => remove(index)}
                            >
                                <FontAwesomeIcon icon={faWindowClose} />
                            </Button>
                        </Col>
                    </Row>
                ))
            ) : (
                <Row key="#">
                    <Col md={12} className="text-center">
                        Add a new sub item
                    </Col>
                </Row>
            )}

            <Row>
                <Col>
                    <>
                        <Button
                            variant="primary"
                            className="m-0"
                            onClick={() => {
                                append({ subItem: "", type: "", position: "" });
                            }}
                        >
                            <FontAwesomeIcon icon={faPlusSquare} /> Add sub item
                        </Button>
                    </>
                </Col>
            </Row>
        </>
    );
};
