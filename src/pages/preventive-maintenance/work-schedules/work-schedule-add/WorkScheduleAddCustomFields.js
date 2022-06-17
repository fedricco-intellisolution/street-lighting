import React from "react";

import { Col, Form, Row } from "react-bootstrap";
import { Controller, useFieldArray } from "react-hook-form";

import { DAYS_OF_THE_WEEK, MONTHS_OF_A_YEAR } from "../../config/options";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const WorkScheduleAddCustomFields = ({ control }) => {
    const { fields } = useFieldArray({
        control,
        name: "custom_field",
        defaultValues: {
            custom_field: [
                { subItem: "foo1", starts_at: "bar1", ends_at: "test" },
                { subItem: "foo1", starts_at: "bar1", ends_at: "test" },
                { subItem: "foo1", starts_at: "bar1", ends_at: "test" },
                { subItem: "foo1", starts_at: "bar1", ends_at: "test" },
                { subItem: "foo1", starts_at: "bar1", ends_at: "test" },
            ],
        },
    });

    return (
        <>
            <Row className="mb-2">
                <Col md={4}>Frequency</Col>
                <Col md={4}>Starts at</Col>
                <Col md={4}>
                    Ends at *
                    <small>(No set date will continuosly run scheduling)</small>
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
                                        field: { value, onChange, onBlur },
                                    }) =>
                                        field.subItem === "WEEKLY" ? (
                                            <Form.Select
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                            >
                                                <option></option>
                                                {DAYS_OF_THE_WEEK.map(
                                                    (data, index) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={data}
                                                            >
                                                                {data}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </Form.Select>
                                        ) : field.subItem === "DAILY" ? (
                                            <DatePicker
                                                selected={value}
                                                onChange={onChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            <Form.Select
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                            >
                                                <option></option>
                                                {MONTHS_OF_A_YEAR.map(
                                                    (data, index) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={data}
                                                            >
                                                                {data}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </Form.Select>
                                        )
                                    }
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
                                        field: { value, onChange, onBlur },
                                    }) => (
                                        <DatePicker
                                            // selected={value}
                                            // onChange={onChange}
                                            dateFormat="MM/yyyy"
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
