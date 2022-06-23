import React from "react";

import { Button, Col, Form, Row } from "react-bootstrap";
import { Controller, useFieldArray } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faWindowClose } from "@fortawesome/free-solid-svg-icons";

import { COLUMN_TYPE } from "../config/options";

export const ChecklistItemsColumns = ({ control, errors }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "columns",
    });
    return (
        <>
            <Col md={12}>
                <h6 className="pt-2">Checklist item columns</h6>
                <small>
                    <i>Default column - check</i>
                </small>
                <Row className="mt-2">
                    <Col className="font-weight-bold" md={5}>
                        Column
                    </Col>
                    <Col className="font-weight-bold" md={5}>
                        Type
                    </Col>
                    <Col className="font-weight-bold" md={2}></Col>
                </Row>
                <hr />
                <Row className="mt-2">
                    {fields.length ? (
                        fields.map((field, index) => {
                            return (
                                <React.Fragment key={field.id}>
                                    <Col md={5}>
                                        <Form.Group className="mb-3">
                                            <Controller
                                                control={control}
                                                defaultValue=""
                                                name={`columns[${index}].column`}
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
                                    <Col md={5}>
                                        <Form.Group className="mb-3">
                                            <Controller
                                                control={control}
                                                defaultValue=""
                                                name={`columns[${index}].type`}
                                                render={({
                                                    field: {
                                                        onBlur,
                                                        onChange,
                                                        value,
                                                    },
                                                }) => (
                                                    <Form.Select
                                                        name={`columns[${index}].type`}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                    >
                                                        <option></option>
                                                        {COLUMN_TYPE.map(
                                                            (data, index) => {
                                                                return (
                                                                    <option
                                                                        key={
                                                                            index
                                                                        }
                                                                        value={
                                                                            data
                                                                        }
                                                                    >
                                                                        {data}
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                    </Form.Select>
                                                )}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            variant="primary"
                                            onClick={() => remove(index)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faWindowClose}
                                            />
                                        </Button>
                                    </Col>
                                </React.Fragment>
                            );
                        })
                    ) : (
                        <>
                            <Row key="#">
                                <Col md={12} className="text-center">
                                    Add a new column
                                </Col>
                            </Row>
                        </>
                    )}
                </Row>
                <Button
                    variant="primary"
                    className="m-0"
                    onClick={() => {
                        append({ column: "", type: "" });
                    }}
                >
                    <FontAwesomeIcon icon={faPlusSquare} /> Add new column
                </Button>
            </Col>
        </>
    );
};
