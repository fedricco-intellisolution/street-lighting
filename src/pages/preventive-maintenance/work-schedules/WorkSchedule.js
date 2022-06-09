import React, { useCallback, useEffect } from "react";

import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "react-feather";

import { tableColumns, tableData } from "./tableColumns";
import DynamicTable from "@components/ui/DynamicTable";

export const WorkSchedule = () => {
    const navigate = useNavigate();

    //
    // States
    //

    // const [tableData, setTableData] = useState([]);

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
                <h1 className="h3 mb-3">Work schedule</h1>
                <Card className="p-0">
                    <Card.Header className="pb-0">
                        <Row>
                            <Col md={3}>
                                <Form.Control
                                    className="d-inline-block"
                                    placeholder="Search keyword"
                                />
                            </Col>
                            <Col
                                md={{ span: 3, offset: 6 }}
                                className="text-end"
                            >
                                <Button
                                    className="me-1 mb-1"
                                    variant="primary"
                                    onClick={() =>
                                        navigate(
                                            "/preventive-maintenance/work-schedule/add"
                                        )
                                    }
                                >
                                    <PlusCircle
                                        className="align-middle me-1"
                                        size={16}
                                    />
                                    Add work schedule
                                </Button>
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
            </React.Fragment>
        </>
    );
};
