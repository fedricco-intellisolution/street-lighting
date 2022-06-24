import React, { useCallback, useContext, useEffect, useState } from "react";

import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { WorkScheduleAddCustomFields } from "./WorkScheduleAddCustomFields";
import * as preventiveMaintenanceApi from "@api/preventiveMaintenanceApi";
import DynamicTableNoPagination from "components/ui/DynamicTableNoPagination";

import * as yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import NotyfContext from "contexts/NotyfContext";
import { ErrorMessage } from "@hookform/error-message";

const schema = yup.object().shape({
    site: yup.string().required("This field is required"),
});

export const WorkScheduleAdd = () => {
    const navigate = useNavigate();
    const notyf = useContext(NotyfContext);
    const {
        control,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    //
    // States
    //

    const [tableData, setTableData] = useState([]);
    const [sites, setSites] = useState([]);
    const [excludedChecklistItems, setExcludedChecklistItems] = useState([]);

    const tableColumns = [
        {
            Header: "Exclude",
            accessor: "action",
            Cell: ({ row }) => {
                return (
                    <Form.Check
                        checked={excludedChecklistItems.includes(
                            row.original.id
                        )}
                        type="checkbox"
                        onChange={(e) => {
                            var updatedCheckList = [...excludedChecklistItems];
                            if (e.target.checked) {
                                updatedCheckList = [
                                    ...excludedChecklistItems,
                                    row.original.id,
                                ];
                            } else {
                                updatedCheckList.splice(
                                    excludedChecklistItems.indexOf(
                                        row.original.id
                                    ),
                                    1
                                );
                            }
                            setExcludedChecklistItems(updatedCheckList);
                        }}
                    />
                );
            },
        },
        {
            Header: "Checklist item",
            accessor: "name",
        },
        {
            Header: "Sequence no",
            accessor: "sequence_no",
        },
    ];

    //
    // Functions
    //

    const getSites = useCallback(async () => {
        const response = await preventiveMaintenanceApi.getWorkScheduleSites();
        setSites(response.data);
    }, []);

    const getWorkSchedule = useCallback(async () => {
        const response = await preventiveMaintenanceApi.getChecklistItems();
        setTableData(response.data.data);
    }, []);

    const submitWorkSchedule = async (data) => {
        data.excluded_checklists = excludedChecklistItems;
        data.custom_field.map((value, index) => {
            return [
                ...data.custom_field,
                (data.custom_field[index].ends_at = value.ends_at
                    ? new Date(value.ends_at).toLocaleDateString("en-CA")
                    : null),
                (data.custom_field[index].starts_at = value.starts_at
                    ? new Date(value.starts_at).toLocaleDateString("en-CA")
                    : null),
            ];
        });

        try {
            const response = await preventiveMaintenanceApi.createWorkSchedule(
                data
            );
            if (response.data.status === "SUCCESS") {
                notyf.open({
                    type: "success",
                    message: response.data.message,
                });
                navigate("/preventive-maintenance/work-schedule");
            }
        } catch (error) {
            notyf.open({
                type: "danger",
                message: "Something went wrong with the server",
            });
        }
    };

    //
    // UseEffects
    //

    useEffect(() => {
        getWorkSchedule();
        getSites();
    }, [getWorkSchedule, getSites]);

    useEffect(() => {
        reset({
            custom_field: [
                { subItem: "DAILY", starts_at: new Date(), ends_at: null },
                { subItem: "WEEKLY", starts_at: new Date(), ends_at: null },
                { subItem: "MONTHLY", starts_at: new Date(), ends_at: null },
                { subItem: "BI-MONTHLY", starts_at: new Date(), ends_at: null },
                { subItem: "QUARTERLY", starts_at: new Date(), ends_at: null },
                {
                    subItem: "HALF YEARLY",
                    starts_at: new Date(),
                    ends_at: null,
                },
                { subItem: "YEARLY", starts_at: new Date(), ends_at: null },
            ],
        });
    }, [reset]);

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
                                <Form.Label>Site</Form.Label>
                                <Controller
                                    control={control}
                                    defaultValue=""
                                    name="site"
                                    render={({
                                        field: { onBlur, onChange, value },
                                    }) => (
                                        <Form.Select
                                            id="site"
                                            name="site"
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            value={value}
                                        >
                                            <option></option>
                                            {sites.map((data, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={data.id}
                                                    >
                                                        {data.name}
                                                    </option>
                                                );
                                            })}
                                        </Form.Select>
                                    )}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="site"
                                    render={({ message }) => (
                                        <small className="text-danger">
                                            {message}
                                        </small>
                                    )}
                                />
                            </Col>
                        </Row>
                        <h6 className="py-2">Frequency start dates</h6>
                        <WorkScheduleAddCustomFields
                            control={control}
                            error={errors}
                        />
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
                                <Button
                                    variant="primary"
                                    onClick={handleSubmit(submitWorkSchedule)}
                                >
                                    Save
                                </Button>
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
                            <DynamicTableNoPagination
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
