import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, Col, Container, Form, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Eye } from "react-feather";
import { useNavigate, useLocation } from "react-router-dom";
import DynamicTable from "@components/ui/DynamicTable";
import * as faultApi from "@api/faultApi";

const FaultVerificationTOList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [filter, setFilter] = useState({
        search: {
            status: 'FOR_VERIFICATION_TO'
        }
    });
    const [tableData, setTableData] = useState([])

    const tableColumns = [
        {
            Header: "Actions",
            accessor: "actions",
            
        },
        {
            Header: "Site",
            accessor: "site",
        },
        {
            Header: "Complainant",
            accessor: "complainant.name",
        },
        {
            Header: "Complaint date",
            accessor: "complaint_date",
        },
        {
            Header: "Nature of fault",
            accessor: "nature_of_fault",
        },
        {
            Header: "Job type",
            accessor: "job_type",
        },
        
    ]

    const getFaults = useCallback(async () => {
        const response = await faultApi.getFaults(filter);
        const faults = response.data.data
        const data = [];
        faults.forEach((fault) => {
            data.push({
                actions: (
                    <>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip>View fault</Tooltip>}
                        >
                            <Eye
                                className="align-middle me-2"
                                size={16}
                                onClick={() => navigate(location.pathname+'/'+fault.id)}
                            />
                        </OverlayTrigger>
                        
                    </>
                ),
                id: fault.id,
                site: fault.site,
                complainant: fault.complainant,
                complaint_date: fault.complaint_at,
                nature_of_fault: fault.nature_of_fault,
                job_type : fault.job_type

            })
        })
        setTableData(data)
    }, [navigate, location.pathname, filter])

    useEffect(() => {
       getFaults();
    }, [getFaults])

    return (
        <React.Fragment>
            <Helmet title="Fault Verification" />
            <Container fluid className="p-0">
                <h1 className="h3 mb-3">Fault verification (TO)</h1>
                <Card>
                    <Card.Header className="pb-0">
                        <Row>
                            <Col md={3}>
                                <Form.Control
                                    value=""
                                    onChange={() => {}}
                                    placeholder="Search keyword"
                                    className="d-inline-block"
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

export default FaultVerificationTOList;