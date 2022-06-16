import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, Col, Container, Form, Row, OverlayTrigger, Tooltip, Badge } from "react-bootstrap";
import { Clock, Eye } from "react-feather";
import { useNavigate } from "react-router-dom";
import DynamicTable from "@components/ui/DynamicTable";
import * as faultApi from "@api/faultApi";
import { prettyHoursMinutes } from "../../utils/dateHelper";
import debounce from 'debounce';

const FaultSummaryList = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState({
        search: {
            status: 'RECTIFIED'
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
            width: 100
        },
        {
            Header: "Complaint date",
            accessor: "complaint_date",
            width: 160
        },
        {
            Header: "Response time",
            accessor: "response_time",
            width: 160
        },
        {
            Header: "Down time",
            accessor: "down_time",
            width: 160
        },
        {
            Header: "Nature of fault",
            accessor: "nature_of_fault",
            width: 350
        },
        {
            Header: "Job type",
            accessor: "job_type.name",
            width: 100
        },
        {
            Header: "Call type",
            accessor: "call_type.name",
            width: 100
        },
        {
            Header: "Status",
            accessor: "status.name",
            width: 100
        },
        {
            Header: "Case category",
            accessor: "case_category.name",
            width: 150
        },
        {
            Header: "Technician",
            accessor: "technician.full_name",
            width: 160
        },
        {
            Header: "TO verification date",
            accessor: "to_verified_at",
            width: 160
        },
        {
            Header: "Place manager verification date",
            accessor: "nea_verified_at",
            width: 160
        },
         {
            Header: "Place manager verification days",
            accessor: "nea_verification_days",
            width: 160
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
                                onClick={() => navigate('/faults/rectified/'+fault.id)}
                            />
                        </OverlayTrigger>
                        
                    </>
                ),
                id: fault.id,
                site: fault.site,
                complainant: fault.complainant,
                complaint_date: fault.complaint_at,
                nature_of_fault: fault.nature_of_fault,
                job_type: fault.job_type,
                call_type: fault.call_type,
                status: fault.status,
                technician: fault.technician,
                case_category: fault.case_category,
                to_verified_at: fault.to_verified_at,
                nea_verified_at: fault.nea_verified_at,
                nea_verification_days : fault.nea_verification_days+' day(s)',
                response_time: <Badge className="badge bg-success me-2">
                                    <Clock size={11} className="me-2" />
                                    {prettyHoursMinutes(fault.response_time)}
                                </Badge>,
                down_time: <Badge className="badge bg-success me-2">
                                <Clock size={11} className="me-2" />
                                {prettyHoursMinutes(fault.down_time)}
                            </Badge> 

            })
        })
        setTableData(data)
    }, [navigate, filter])

    useEffect(() => {
       getFaults();
    }, [getFaults])

    return (
        <React.Fragment>
            <Helmet title="Fault Summary" />
            <Container fluid className="p-0">
                <h1 className="h3 mb-3">Fault summary</h1>
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
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <DynamicTable data={tableData} columns={tableColumns} className="table-layout-fixed"/>
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>    
    )
}

export default FaultSummaryList;