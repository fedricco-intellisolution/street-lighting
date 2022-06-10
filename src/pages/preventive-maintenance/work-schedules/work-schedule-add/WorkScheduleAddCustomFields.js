import React from "react";

import { Button, Col, Form, Row } from "react-bootstrap";
import { Controller, useFieldArray } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FREQUENCY } from "../../config/options";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const WorkScheduleAddCustomFields = ({ control }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "custom_field",
    });

    return (
        <>
            <Row className="mb-2">
                <Col md={5}>Frequency</Col>
                <Col md={5}>Start date</Col>
                <Col md={2}></Col>
            </Row>
            <hr />

            {fields.length ? (
                fields.map((field, index) => (
                    <Row className="mb-2" key={field.id}>
                        <Col md={5}>
                            <Form.Group className="mb-3">
                                <Controller
                                    defaultValue=""
                                    control={control}
                                    name={`custom_field[${index}].subItem`}
                                    render={({
                                        field: { value, onChange, onBlur },
                                    }) => (
                                        <Form.Select
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                        >
                                            <option></option>
                                            {FREQUENCY.map((data, index) => {
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
                        <Col md={5}>
                            <Form.Group className="mb-3">
                                <Controller
                                    defaultValue=""
                                    control={control}
                                    name={`custom_field[${index}].type`}
                                    render={({
                                        field: { value, onChange, onBlur },
                                    }) => (
                                        <DatePicker
                                            // selected={value}
                                            // onChange={onChange}
                                            showMonthYearPicker
                                            dateFormat="MM/yyyy"
                                            className="form-control"
                                        />
                                    )}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={2}>
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
                        Add a frequency start date
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
                            <FontAwesomeIcon icon={faPlusSquare} /> Add
                            frequency start date
                        </Button>
                    </>
                </Col>
            </Row>
        </>
    );
};
