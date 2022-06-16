import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Container, Form, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Eye, Zap } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import DynamicTable from "@components/ui/DynamicTable";
import * as faultApi from "@api/faultApi";
import debounce from 'debounce';

const CallCentreFaultList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [filter, setFilter] = useState({
        search: {
            status: 'FOR_RESPONSE',
        }
    });
    const [tableData, setTableData] = useState([])
    const tableColumns = [
        {
            Header: "Actions",
            accessor: "actions",
            width: 80,
            
        },
        {
            Header: "Site",
            accessor: "site.name",
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
            accessor: "job_type.name",
        },
        
    ]

    const getFaults = useCallback(async () => {
        const response = await faultApi.getFaults(filter);
        const faults = response.data.data
        const data = [];
        faults.forEach((fault) => {
            data.push({
                actions: (
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
    }, [navigate, filter, location])

    useEffect(() => {
       getFaults();
    }, [getFaults])

    return (
        <React.Fragment>
            <Helmet title="Fault Registration" />
            <Container fluid className="p-0">
                <h1 className="h3 mb-3">Faults</h1>
                <Card>
                    <Card.Header className="pb-0">
                        <Row>
                            <Col md={3}>
                                <Form.Control
                                    placeholder="Search keyword"
                                    className="d-inline-block"
                                    onChange={debounce((e) => {
                                         setFilter(prevState => ({
                                            search: {
                                                ...prevState.search,
                                                keyword : e.target.value
                                            }
                                        }));
                                    }, 1000)}
                                />
                            </Col>
                            <Col md={{ span: 3, offset: 6 }} className="text-end">
                                <Button
                                    variant="primary"
                                    className="me-1 mb-1"
                                    onClick={() => navigate('/faults/callcentre/register')}
                                >
                                    <Zap className="align-middle me-1" size={16} />
                                    Register a fault
                                </Button>
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

export default CallCentreFaultList;