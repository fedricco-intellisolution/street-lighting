import React, { useCallback, useEffect, useState } from "react";
import { Card, Col, Container, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import DynamicTable from "@components/ui/DynamicTable";
import * as faultApi from "@api/faultApi";
import { Eye } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";

const FaultIncidentReportList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [tableData, setTableData] = useState([])
    const tableColumns = [
        {
            Header: "Actions",
            accessor: "actions",
            
        },
        {
            Header: "Status",
            accessor: "status",
        },
        {
            Header: "Date",
            accessor: "fault.complaint_at",
        },
        {
            Header: "Incident background",
            accessor: "details.incident_background",
        },
        {
            Header: "Description",
            accessor: "details.description",
        },
        {
            Header: "Findings",
            accessor: "details.findings",
        },
        {
            Header: "Summary and recommendation",
            accessor: "details.summary_and_recommendation",
        },
        {
            Header: "Date sent",
            accessor: "reported_at",
        },
    ]

    const getFaultIncidentReports = useCallback(async () => {
        const response = await faultApi.getIncidentReports()
        const reports = response.data.data
        const data = [];
        reports.forEach((report) => {
            data.push({
                actions: (
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip> View </Tooltip>}
                    >
                        <Eye
                            className="align-middle me-2"
                            size={16}
                            onClick={() => navigate(location.pathname+'/'+report.id)}
                        />
                    </OverlayTrigger>
                ),
                status: report.status,
                date: report.reported_at,
                details: report.details,
                fault: report.fault,
                reported_at : report.reported_at

            })
        })
        setTableData(data)
    }, [location, navigate])
    
    useEffect(() => {
       getFaultIncidentReports();
    }, [getFaultIncidentReports])

    return (
        <React.Fragment>
            <Helmet title="Fault Incident Report" />
            <Container fluid className="p-0">
                <h1 className="h3 mb-3">Fault Incident Reports</h1>    
                <Card>
                    <Card.Header className="pb-0">
                        <Row>
                            <Col md={3}>
                                <Form.Control
                                    placeholder="Search keyword"
                                    className="d-inline-block"
                                    // onChange={debounce((e) => {
                                    //      setFilter(prevState => ({
                                    //         search: {
                                    //             ...prevState.search,
                                    //             keyword : e.target.value
                                    //         }
                                    //     }));
                                    // }, 1000)}
                                />
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <DynamicTable data={tableData} columns={tableColumns} />
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>
    )
}

export default FaultIncidentReportList;