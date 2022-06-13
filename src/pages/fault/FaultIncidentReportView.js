import React, { useCallback, useContext, useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from '@hookform/error-message';
import * as yup from "yup";
import Select from "react-select";
import * as faultApi from "@api/faultApi";
import useAuth from "../../hooks/useAuth";
import * as lookUpApi from "@api/lookUpApi";
import NotyfContext from "@contexts/NotyfContext";

const schema = yup.object().shape({
    details: yup.object().shape({
        incident_background: yup
            .string()
            .required('This field is required'),
        description: yup
            .string()
            .required('This field is required'),
        findings: yup
            .string()
            .required('This field is required'),
        summary_and_recommendation: yup
            .string()
            .required('This field is required'),
    })
    
});

const FaultIncidentReportView = () => {
    const navigate = useNavigate();
    const notyf = useContext(NotyfContext)
    const { user } = useAuth();
    const { id, fault_id } = useParams();
    const add_page = id === 'add' ? true : false;
    const [fault, setFault] = useState();
    const [incident_report, setIncidentReport] = useState();
    const [status, setStatus] = useState([]);
    
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    const getFault = useCallback(async () => {
        const response = await faultApi.getFault(fault_id);
        setFault(response.data.data)
    }, [fault_id])

    const getIncidentReport = useCallback(async () => {
        const response = await faultApi.getIncidentReport(id);
        setIncidentReport(response.data.data)
    }, [id])

    useEffect(() => {
          if(add_page) getFault()
    }, [getFault, add_page])

    useEffect(() => {
        if (fault) {
            setValue('fault.id', fault.id)
            setValue('fault.complaint_at', fault.complaint_at)
            setValue('reported_by.full_name', user?.full_name)
            setValue('fault.site.name', fault.site.name)
        }
    }, [fault, reset, user, setValue])

    useEffect(() => {
        if(!add_page) getIncidentReport()
    }, [id, getIncidentReport, add_page])

    useEffect(() => {
        if (incident_report) {
            reset(incident_report)
        }
    }, [incident_report, reset])
    
    const getStatus = async () => {
        const response = await lookUpApi.getLookUp({search: { category: 'FAULT_INCIDENT_REPORT_STATUS' }})
        const data = response.data.data
        const options = []
        data.forEach(item => {
            options.push({
                label: item.name,
                value: item.code
            })
        })
        setStatus(options)
    }

    useEffect(() => {
        getStatus()
    },[])
    
    const printReportHandler = () => [

    ]

    const saveReportHandler = async (data) => {
        data.fault_id = data.fault.id
        try {
            const response = await faultApi.saveIncidentReport(data)
            if (response.data.status === 'SUCCESS') {
                notyf.open({
                    type: 'success',
                    message: response.data.message,
                })
                navigate(`/faults/incident-reports/${response.data.data.id}`)
            }
        } catch (error) {
        }
    }

    const updateReportHandler = async (data) => {
        try {
            const response = await faultApi.updateIncidentReport(id, data)
            if (response.data.status === 'SUCCESS') {
                notyf.open({
                    type: 'success',
                    message: response.data.message,
                })
            }
        } catch (error) {
        }
    }
    
    return (
        <React.Fragment>
            <Helmet title="Fault Incident Report"/>
            <Container fluid className="p-0">
                <Row>
                    <Col md={6}>
                        <h1 className="h3 mb-3">
                            { add_page
                                ? 'Add incident report'
                                : 'Edit incident report'
                            }</h1>
                    </Col>
                    <Col md={6}>
                        <Breadcrumb>
                            {
                                add_page 
                                    ?  <Breadcrumb.Item onClick={() => navigate('/faults/'+fault_id)}>Fault</Breadcrumb.Item>
                                    :  <Breadcrumb.Item onClick={() => navigate('/faults/incident-reports')}>Fault incident reports</Breadcrumb.Item>
                            }
                           
                            <Breadcrumb.Item active>
                                { add_page
                                    ? 'Add'
                                    : 'Edit'
                                }
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Form>
                    <Card>
                        <Card.Body>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Status</Form.Label>
                                            <Controller
                                                control={control}
                                                name="status"
                                                defaultValue=""
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <Select
                                                        placeholder="Choose an option"
                                                        classNamePrefix="react-select"
                                                        options={status}
                                                        onBlur={onBlur}
                                                        className={
                                                            "react-select-container" + errors.site_id && "is-invalid"
                                                        }
                                                        onChange={(val) => onChange(val.value)}
                                                        value={status.filter((c) => value.includes(c.value))}
                                                    
                                                    />
                                                )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="status"
                                            render={({ message }) => <small className="text-danger">{message}</small>}
                                        />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Reference No. / Fault ID</Form.Label>
                                            <Controller
                                                control={control}
                                                name="fault.id"
                                                defaultValue=""
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <Form.Control
                                                        type="text"
                                                        value={value}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        disabled
                                                    />
                                                )}
                                            />
                                            
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Fault date</Form.Label>
                                            <Controller
                                                control={control}
                                                name="fault.complaint_at"
                                                defaultValue=""
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <Form.Control
                                                        type="text"
                                                        value={value}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        disabled
                                                    />
                                                )}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Incident background</Form.Label>
                                            <Controller
                                                control={control}
                                                name="details.incident_background"
                                                defaultValue=""
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <Form.Control
                                                        type="text"
                                                        value={value}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        className={(errors.details?.incident_background && 'is-invalid')}
                                                    />
                                                )}
                                        />
                                            <ErrorMessage
                                                errors={errors}
                                                name="details.incident_background"
                                                render={({ message }) => <small className="text-danger">{message}</small>}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Reported by</Form.Label>
                                            <Controller
                                                control={control}
                                                name="reported_by.full_name"
                                                defaultValue=""
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <Form.Control
                                                        type="text"
                                                        value={value}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        disabled
                                                    />
                                                )}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Location</Form.Label>
                                            <Controller
                                                control={control}
                                                name="fault.site.name"
                                                defaultValue=""
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <Form.Control
                                                        type="text"
                                                        value={value}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        disabled
                                                    />
                                                )}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Date of the report sent</Form.Label>
                                            <Controller
                                                control={control}
                                                name="reported_at"
                                                defaultValue=""
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <Form.Control
                                                        type="text"
                                                        value={value}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        disabled
                                                    />
                                                )}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Description</Form.Label>
                                            <Controller
                                                control={control}
                                                name="details.description"
                                                defaultValue=""
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <Form.Control
                                                        type="text"
                                                        as="textarea"
                                                        rows={10}
                                                        value={value}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        className={(errors.details?.description && 'is-invalid')}
                                                    />
                                                )}
                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                name="details.description"
                                                render={({ message }) => <small className="text-danger">{message}</small>}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Findings</Form.Label>
                                            <Controller
                                                control={control}
                                                name="details.findings"
                                                defaultValue=""   
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <Form.Control
                                                        type="text"
                                                        as="textarea"
                                                        rows={3}
                                                        value={value}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        className={(errors.details?.findings && 'is-invalid')} 
                                                    />
                                                )}
                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                name="details.findings"
                                                render={({ message }) => <small className="text-danger">{message}</small>}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Summary and recommendation</Form.Label>
                                            <Controller
                                                control={control}
                                                name="details.summary_and_recommendation"
                                                defaultValue=""    
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <Form.Control
                                                        type="text"
                                                        as="textarea"
                                                        rows={4}
                                                        value={value}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        className={(errors.details?.summary_and_recommendation && 'is-invalid')}
                                                    />
                                                )}
                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                name="details.summary_and_recommendation"
                                                render={({ message }) => <small className="text-danger">{message}</small>}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Attachments</Form.Label>
                                            <Controller
                                                control={control}
                                                name="attachments"
                                                defaultValue=""
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <Form.Control
                                                        type="file"
                                                        multiple
                                                        accept="*"
                                                        value={value}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                    />
                                                )}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                        </Card.Body>
                    </Card>
                    {/* <Card>
                        <Card.Header>
                            <Card.Title className="mb-0">Signatories</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Contractor</Form.Label>
                                        <Controller
                                            control={control}
                                            name="contractor"
                                            defaultValue=""
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <Form.Control
                                                    type="text"
                                                    value={value}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    disabled
                                                />
                                            )}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Comments</Form.Label>
                                        <Controller
                                            control={control}
                                            name="comments"
                                            defaultValue=""
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <Form.Control
                                                    type="text"
                                                    value={value}
                                                    as="textarea"
                                                    rows={5}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                />
                                            )}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Vetted by</Form.Label>
                                    </Form.Group>
                                </Col>
                            
                            </Row>
                        </Card.Body>
                    </Card>  */}
                    <Row>
                        <Col md={12} className="text-end">
                            <Button
                                variant="success"
                                className="me-2"
                                onClick={handleSubmit(printReportHandler)}
                            >
                                Print
                            </Button>
                            <Button
                                variant="primary"
                                className="me-2"
                                onClick={
                                    add_page
                                        ? handleSubmit(saveReportHandler)
                                        : handleSubmit(updateReportHandler)
                                }
                            >
                                Save
                            </Button>
                            
                        </Col>
                    </Row>   
                </Form>
                
            </Container>
            
        </React.Fragment>    
    )
}

export default FaultIncidentReportView;