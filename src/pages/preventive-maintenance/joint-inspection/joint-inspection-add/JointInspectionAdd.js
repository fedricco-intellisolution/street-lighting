import React, { useCallback, useEffect } from "react";

import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { tableColumns, tableData } from "./JointInspectionTable";
import DynamicTable from "@components/ui/DynamicTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";

export const JointInspectionAdd = () => {
    const navigate = useNavigate();

    //
    // States
    //

    const { control } = useForm({
        mode: "onTouched",
    });

    //
    // Functions
    //

    const getWorkSchedule = useCallback(async () => {
        // const response = await preventiveMaintenanceApi.getChecklistTypes();
        // setTableData(response.data.data);
    }, []);

    //
    // UseEffects
    //

    useEffect(() => {
        getWorkSchedule();
    }, [getWorkSchedule]);

    return (
        <>
            <React.Fragment>
                <Helmet title="Settings" />
                <h1 className="h3 mb-3">Joint inspection edit</h1>
                <Card className="p-0">
                    <Card.Header className="pb-0">
                        <h5>External CCTV</h5>
                        <Row>
                            <Col md={3}>
                                <Form.Label>Location</Form.Label>
                                <p>Marsiling Mall Hawker Centre</p>
                            </Col>
                            <Col md={3}>
                                <Form.Label>FG inspection date</Form.Label>
                                <Controller
                                    control={control}
                                    defaultValue=""
                                    name="frequency"
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <DatePicker
                                            // selected={value}
                                            // onChange={onChange}
                                            className="form-control"
                                            placeholderText="Checklist month / year"
                                        />
                                    )}
                                />{" "}
                            </Col>
                            <Col md={3}>
                                <Form.Label>Joint inspection date</Form.Label>
                                <Controller
                                    control={control}
                                    defaultValue=""
                                    name="frequency"
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <DatePicker
                                            // selected={value}
                                            // onChange={onChange}
                                            className="form-control"
                                            placeholderText="Checklist month / year"
                                        />
                                    )}
                                />{" "}
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        {tableData && (
                            <DynamicTable
                                columns={tableColumns}
                                data={tableData}
                            />
                        )}
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <h5>Feedback</h5>
                        <Row className="mb-2">
                            <Col md={12}>
                                <Form.Label>Remarks</Form.Label>
                                <Controller
                                    control={control}
                                    defaultValue=""
                                    name="frequency"
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <Form.Control
                                            // className={errors.name}
                                            // onBlur={onBlur}
                                            // onChange={onChange}
                                            as="textarea"
                                            // value={value}
                                            rows={6}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={6}>
                                <Form.Label>Supervisor / technician</Form.Label>
                                <Controller
                                    control={control}
                                    defaultValue=""
                                    name="frequency"
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <Form.Control
                                            // className={errors.name}
                                            // onBlur={onBlur}
                                            // onChange={onChange}
                                            type="text"
                                            // value={value}
                                        />
                                    )}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Technical officer</Form.Label>
                                <Controller
                                    control={control}
                                    defaultValue=""
                                    name="frequency"
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <Form.Control
                                            // className={errors.name}
                                            // onBlur={onBlur}
                                            // onChange={onChange}
                                            type="text"
                                            // value={value}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Label>
                                    Supervisor / technician signature
                                </Form.Label>
                                <Controller
                                    control={control}
                                    defaultValue=""
                                    name="frequency"
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <Form.Control
                                            // className={errors.name}
                                            // onBlur={onBlur}
                                            // onChange={onChange}
                                            as="textarea"
                                            // value={value}
                                            rows={6}
                                        />
                                    )}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label>
                                    Technical officer signature
                                </Form.Label>
                                <Controller
                                    control={control}
                                    defaultValue=""
                                    name="frequency"
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <Form.Control
                                            // className={errors.name}
                                            // onBlur={onBlur}
                                            // onChange={onChange}
                                            as="textarea"
                                            // value={value}
                                            rows={6}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row className="pt-4">
                            <Col className="text-end">
                                <Button
                                    className="me-2"
                                    variant="secondary"
                                    onClick={() =>
                                        navigate(
                                            "/preventive-maintenance/joint-inspection"
                                        )
                                    }
                                >
                                    Cancel
                                </Button>
                                <Button className="me-2" variant="primary">
                                    Save
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </React.Fragment>
        </>
    );
};
