import React, { useCallback, useEffect } from "react";

import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { tableColumns, tableData } from "./WorkScheduleTable";
import DynamicTable from "@components/ui/DynamicTable";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { WorkScheduleAddCustomFields } from "./WorkScheduleAddCustomFields";

import * as yup from "yup";
import "react-datepicker/dist/react-datepicker.css";

const schema = yup.object().shape({
    hawkerCentre: yup.string().required("This field is required"),
});

export const WorkScheduleAdd = () => {
    const navigate = useNavigate();

    //
    // States
    //

    // const [tableData, setTableData] = useState([]);
    const { control, errors } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
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
                <h1 className="h3 mb-3">Create work schedule</h1>
                <Card className="p-0">
                    <Card.Body>
                        <h6 className="py-2">Work schedule details</h6>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Label>Hawker centre</Form.Label>
                                <Form.Control className="d-inline-block" />
                            </Col>
                        </Row>
                        <h6 className="py-2">Frequency start dates</h6>
                        <WorkScheduleAddCustomFields
                            control={control}
                            error={errors}
                        />
                        {/* <Row className="mb-2">
                            <Col md={6}>
                                <Form.Label>Weekly</Form.Label>
                                <Controller
                                    control={control}
                                    defaultValue=""
                                    name="frequency"
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <DatePicker
                                            selected={value}
                                            onChange={onChange}
                                            showWeekNumbers
                                            className="form-control"
                                        />
                                    )}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Monthly</Form.Label>
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
                                            showMonthYearPicker
                                            dateFormat="MM/yyyy"
                                            className="form-control"
                                        />
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Label>Bi Monthly</Form.Label>
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
                                            showMonthYearPicker
                                            dateFormat="MM/yyyy"
                                            className="form-control"
                                        />
                                    )}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Quarterly</Form.Label>
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
                                            showMonthYearPicker
                                            dateFormat="MM/yyyy"
                                            className="form-control"
                                        />
                                    )}
                                />
                            </Col>
                        </Row> */}
                        <Row className="pt-4">
                            <Col className="text-end">
                                <Button
                                    variant="secondary"
                                    className="me-2"
                                    onClick={() =>
                                        navigate(
                                            "/preventive-maintenance/work-schedule"
                                        )
                                    }
                                >
                                    Cancel
                                </Button>
                                <Button variant="primary">Save</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card className="p-0">
                    <Card.Body>
                        <Row>
                            <Col md={4} className="text-end">
                                <Form.Control
                                    className="d-inline-block"
                                    placeholder="Search"
                                />
                            </Col>
                        </Row>
                        <br />
                        {tableData && (
                            <DynamicTable
                                columns={tableColumns}
                                data={tableData}
                            />
                        )}
                    </Card.Body>
                </Card>
            </React.Fragment>
        </>
    );
};
