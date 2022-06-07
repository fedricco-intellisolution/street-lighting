import React, { useCallback, useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Card, Col, Container, Form, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Camera, Eye } from "react-feather";
import { useNavigate, useLocation } from "react-router-dom";
import DynamicTable from "@components/ui/DynamicTable";
import * as faultApi from "@api/faultApi";
import QRScanner from "../../components/QRScanner"
import NotyfContext from "@contexts/NotyfContext";
import debounce from 'debounce';

const FaultResponseList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const notyf = useContext(NotyfContext);
    const [filter, setFilter] = useState({
        search: {
            status: 'FOR_RESPONSE'
        }
    });
    const [tableData, setTableData] = useState([])
    const [showScanner, setShowScanner] = useState(false)
    const [fault_id, setFaultID] = useState('')

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
                       
                        {!fault.attended_at &&
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Scan QR Code</Tooltip>}
                            >
                                <Camera
                                    className="align-middle me-1"
                                    size={16}
                                    onClick={() => openScanner(fault.id)}
                                />
                            </OverlayTrigger>
                           
                        }
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

    const openScanner = (id) => {
        setFaultID(id)
        setShowScanner(true)
    }

    const scanQRAttendance = async (site_id) => {
        if (!!site_id) {
            try {
                const response = await faultApi.attendFault(fault_id, site_id)
                if (response.data.status === 'SUCCESS') {
                    notyf.open({
                        type: 'success',
                        message: response.data.message,
                    })
                    setShowScanner(false)
                    navigate(location.pathname+'/'+fault_id)
                }

                if (response.data.status === 'ERROR') {
                    notyf.open({
                        type: 'danger',
                        message: response.data.message,
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }

        
    }
        

    return (
        <React.Fragment>
            <Helmet title="Fault Response" />
            <Container fluid className="p-0">
                <h1 className="h3 mb-3">Fault response</h1>
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
                        <DynamicTable data={tableData} columns={tableColumns} />
                    </Card.Body>
                </Card>
            </Container>
            <QRScanner
                show={showScanner}
                header="Scan QR Attendance"
                onHide={() => setShowScanner(false)}
                onScan={(result, error) => scanQRAttendance(result?.text) }

            />
        </React.Fragment>    
    )
}

export default FaultResponseList;