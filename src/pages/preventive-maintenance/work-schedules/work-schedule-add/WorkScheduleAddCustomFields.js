import React from "react";

import { Col, Form, Row } from "react-bootstrap";
import { Controller, useFieldArray } from "react-hook-form";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const WorkScheduleAddCustomFields = ({ control }) => {
    const { fields } = useFieldArray({
        control,
        name: "custom_field",
    });

    return (
        <>
            <Row className="mb-2">
                <Col md={4}>Frequency</Col>
                <Col md={4}>Starts at</Col>
                <Col md={4}>
                    Ends at *
                    <small>
                        {" "}
                        (No set date will continuosly run scheduling)
                    </small>
                </Col>
            </Row>
            <hr />

            {fields.length ? (
                fields.map((field, index) => (
                    <Row className="mb-2" key={field.id}>
                        <Col md={4}>
                            <p>{field.subItem}</p>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Controller
                                    defaultValue=""
                                    control={control}
                                    name={`custom_field[${index}].starts_at`}
                                    render={({
                                        field: { value, onChange },
                                    }) => (
                                        <DatePicker
                                            selected={value}
                                            onChange={onChange}
                                            className="form-control"
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
                                    name={`custom_field[${index}].ends_at`}
                                    render={({
                                        field: { value, onChange },
                                    }) => (
                                        <DatePicker
                                            selected={value}
                                            onChange={onChange}
                                            className="form-control"
                                        />
                                    )}
                                />
                            </Form.Group>
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
            <Row className="mt-2">
                <Col md={12}>
                    <small>* optional fields</small>
                </Col>
            </Row>
        </>
    );
};
