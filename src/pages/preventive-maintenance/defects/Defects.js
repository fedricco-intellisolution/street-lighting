import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import * as preventiveMaintenanceApi from "@api/preventiveMaintenanceApi";
import DynamicTable from "@components/ui/DynamicTable";
import SearchForm from "./components/SearchForm";
import { useLocation, useNavigate } from "react-router-dom";
import { AlignJustify, Eye, PhoneCall, Plus, Tool } from "react-feather";

const Defects = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const tableColumns = [
        {
            Header: "Actions",
            accessor: "actions",
            width: "80px",
            Cell: ({ row }) => {
                return (
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>View defect</Tooltip>}
                    >
                        <Eye
                            className="align-middle me-1"
                            size={18}
                            onClick={() => navigate(location.pathname + '/rectify/' + row.original.id)}
                        />
                    </OverlayTrigger>
                );
            },
        },
        {
            Header: "Reported date",
            accessor: "reported_at",
            width: "170px"
        },
        {
            Header: "Sector",
            accessor: "sector.name",
        },
        {
            Header: "Site",
            accessor: "site.name",
        },
        {
            Header: "Level",
            accessor: "level.name",
        },
        {
            Header: "Area",
            accessor: "area.name",
        },
        {
            Header: "Defect",
            accessor: "defect",
            width: "350px"
        },
        {
            Header: "Action taken",
            accessor: "action_taken",
            width: "350px"
        },
        {
            Header: "Job type",
            accessor: "job_type.name",
        },
        {
            Header: "Status",
            accessor: "status.name",
        },
        {
            Header: "Technician",
            accessor: "technician.full_name",
        },
        {
            Header: "OIC",
            accessor: "place_manager.full_name",
        },
        {
            Header: "Inspection time from",
            accessor: "inspection_time_from",
            width: "170px"
        },
        {
            Header: "Inspection time to",
            accessor: "inspection_time_to",
            width: "170px"
        },
        {
            Header: "Created by",
            accessor: "created_by.full_name",
        },
        {
            Header: "Updated by",
            accessor: "updated_by.full_name",
        },
    
    ];

    const [defects, setDefects] = useState([])
    const [tempFilter, setTempFilter] = useState({})
    const [filter, setFilter] = useState({
        search: {
            status: ''
        }
    });
    const [defectCount, setDefectCount] = useState({})

    const getDefects = useCallback(async () => {
        const response = await preventiveMaintenanceApi.getDefects(filter)
        const data = response.data
        setDefects(data.data)
        setDefectCount({
            total_defects      : data.total_defects,
            total_for_response : data.total_for_response,
            total_new          : data.total_new,
            total_rectified    : data.total_rectified
        })
    }, [filter])

    useEffect(() => {
        getDefects()
    },[getDefects])
    
    const searchHandler = () => {
        setFilter(prevState => ({
            search: {
                ...prevState.search,
                job_type  : tempFilter.job_type,
                sector_id : tempFilter.sector_id,
                site_id   : tempFilter.site_id,
                level_id  : tempFilter.level_id,
                area_id: tempFilter.area_id,
                reported_date_from : tempFilter.reported_date_from,
                reported_date_to : tempFilter.reported_date_to,
            }
        }));
    }

    const resetHandler = () => {
        setFilter({
            search: {
            }
        });
    }

    return (
       <React.Fragment>
            <Helmet title="Defects" />
            <Container fluid className="p-0">
                <Row>
                    <Col md={6}>
                        <h1 className="h3 mb-3">Defects</h1>
                    </Col>
                    <Col md={6}>
                        <Breadcrumb>
                           
                        </Breadcrumb>
                    </Col>
                </Row>
                
                <Row>
                    <Col lg={3} md={6}>
                        <Card>
                            <Card.Body className="bg-primary">
                                <Row>
                                    <Col md={4} className="text-start ">
                                        <Plus size={50}className="text-white" />
                                    </Col>
                                    <Col className="text-start">
                                        <h3 className="text-white">NEW</h3>
                                        <h4 className="text-white">{defectCount.total_new}</h4>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={3} md={6}>
                        <Card>
                            <Card.Body className="bg-warning">
                                <Row>
                                    <Col md={4} className="text-start ">
                                        <PhoneCall size={45}className="text-white" />
                                    </Col>
                                    <Col className="text-start">
                                        <h3 className="text-white">FOR RESPONSE</h3>
                                        <h4 className="text-white">{defectCount.total_for_response}</h4>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={3} md={6}>
                        <Card>
                            <Card.Body className="bg-success">
                                <Row>
                                    <Col md={4} className="text-start ">
                                        <Tool size={45}className="text-white" />
                                    </Col>
                                    <Col className="text-start">
                                        <h3 className="text-white">RECTIFIED</h3>
                                        <h4 className="text-white">{defectCount.total_rectified}</h4>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={3} md={6}>
                        <Card>
                            <Card.Body className="bg-secondary">
                                <Row>
                                    <Col md={4} className="text-start ">
                                        <AlignJustify size={45}className="text-white" />
                                    </Col>
                                    <Col className="text-start">
                                        <h3 className="text-white">TOTAL</h3>
                                        <h4 className="text-white">{defectCount.total_defects}</h4>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                    
                <SearchForm
                    onSearch={searchHandler}
                    onReset={resetHandler}
                    setTempFilter={setTempFilter}
                    tempFilter={tempFilter}
                />
                <Card>
                    <Card.Body>
                        <DynamicTable
                            data={defects}
                            columns={tableColumns}
                            className="table-layout-fixed"
                        />                                     
                    </Card.Body>
                </Card>                                      

            </Container>
        </React.Fragment>    
    );
}

export default Defects;