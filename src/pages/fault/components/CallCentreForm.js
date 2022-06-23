import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Row, } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from '@hookform/error-message';
import * as yup from "yup";
import * as propertyManagementApi from "@api/propertyManagementApi";
import * as lookUpApi from "@api/lookUpApi";
import * as usersApi from "@api/usersApi";

const schema = yup.object().shape({
    site_id: yup
        .string()
        .required("This field is required"),
    complainant: yup.object().shape({
        name: yup
            .string()
            .required("This field is required"),
        contact_no: yup
            .string()
            .required("This field is required"),
    }),
    nature_of_fault: yup
        .string()
        .required("This field is required"),
    job_type: yup
        .string()
        .required("This field is required"),
    call_type: yup
        .string()
        .required("This field is required"),
    technician_id: yup
        .string()
        .required("This field is required"),
    
});

const CallCentreForm = (props) => {
    const {
        editable,
        fault,
        mode,
        onSubmit,
        onCancel
    } = props;

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });
    
    const [sites, setSites] = useState([])
    const [jobTypes, setJobTypes] = useState([])
    const [callTypes, setCallTypes] = useState([])
    const [technicians, setTechnicians] = useState([])
    const watchCallType = watch("call_type", 'value')

    const getSites = useCallback(async () => {
        const response = await propertyManagementApi.getSites()
        setSites(response.data.data)
    }, [])
    
    const getJobTypes = useCallback(async () => {
        const response = await lookUpApi.getLookUp({search: { category: 'JOB_TYPE' }})
        setJobTypes(response.data.data)
    },[])

    const getCallTypes = useCallback(async() => {
        const response = await lookUpApi.getLookUp({search: { category: 'CALL_TYPE' }})
        setCallTypes(response.data.data)
    },[])
    
    const getTechnicians = useCallback(async() => {
        const response = await usersApi.getUsers();
        setTechnicians(response.data.data)
    }, [])
    
    useEffect(() => {
        getSites()
        getJobTypes()
        getCallTypes()
        getTechnicians()
    }, [
        getSites,
        getJobTypes,
        getCallTypes,
        getTechnicians
    ])

    useEffect(() => {
        const result = callTypes.find(item => item.code === watchCallType)
        setValue('response_time', result?.description)
    }, [callTypes, watchCallType, setValue])

    useEffect(() => {
        if (mode === 'register') {
            setInterval(() => {
                setValue('complaint_at', new Date().toLocaleString())
            }, 1000)
        }
    }, [mode, setValue])
    
    useEffect(() => {   
        reset(fault)
        setValue('site_id', fault?.site?.id)
        setValue('job_type', fault?.job_type?.code)
        setValue('call_type', fault?.call_type?.code)
        setValue('technician_id', fault?.technician?.id)
        setValue('response_time', fault?.call_type?.description)
    }, [reset, fault, setValue])
    
    return (
        <Form>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Site</Form.Label>
                        <Controller
                            control={control}
                            name="site_id"
                            defaultValue=""
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Form.Select
                                    name="site_id"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    className={(errors.site_id && 'is-invalid')}
                                    disabled={!editable}
                                >
                                    <option value="">Choose an option</option>
                                    {sites.map((site, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={site.id}
                                                >
                                                    {site.name}
                                                </option>
                                            );
                                        }
                                    )}
                                </Form.Select>
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="site_id"
                            render={({ message }) => <small className="text-danger">{message}</small>}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Complaint date</Form.Label>
                        <Controller
                            control={control}
                            name="complaint_at"
                            defaultValue={new Date().toLocaleString()}
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
                <Col md={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Complainant name</Form.Label>
                        <Controller
                            control={control}
                            name="complainant.name"
                            defaultValue=""
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Form.Control
                                    type="text"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    className={(errors.complainant?.name && 'is-invalid')}
                                    disabled={!editable}
                                  
                                />
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="complainant.name"
                            render={({ message }) => <small className="text-danger">{message}</small>}
                        />
                    </Form.Group>
                   
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Contact no.</Form.Label>
                        <Controller
                            control={control}
                            name="complainant.contact_no"
                            defaultValue=""
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Form.Control
                                    type="text"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    className={(errors.complainant?.contact_no && 'is-invalid')}
                                    disabled={!editable}
                                />
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="complainant.contact_no"
                            render={({ message }) => <small className="text-danger">{message}</small>}
                        />
                    </Form.Group>
                   
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nature of fault</Form.Label>
                        <Controller
                            control={control}
                            name="nature_of_fault"
                            defaultValue=""
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Form.Control
                                    type="text"
                                    as="textarea"
                                    rows={5}
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    className={(errors.nature_of_fault && 'is-invalid')}
                                    disabled={!editable}
                                />
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="nature_of_fault"
                            render={({ message }) => <small className="text-danger">{message}</small>}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Job type</Form.Label>
                        <Controller
                            control={control}
                            name="job_type"
                            defaultValue=""
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Form.Select
                                    name="job_type"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    className={(errors.job_type && 'is-invalid')}
                                    disabled={!editable}
                                >
                                    <option value="">Choose an option</option>
                                    {jobTypes.map((job_type, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={job_type.code}
                                                >
                                                    {job_type.name}
                                                </option>
                                            );
                                        }
                                    )}
                                </Form.Select>
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="job_type"
                            render={({ message }) => <small className="text-danger">{message}</small>}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Fault call type</Form.Label>
                        <Controller
                            control={control}
                            name="call_type"
                            defaultValue=""
                            render={({ field: { value, onChange, onBlur } }) => (
                                 <Form.Select
                                    name="call_type"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    className={(errors.call_type && 'is-invalid')}
                                    disabled={!editable}
                                >
                                    <option value="">Choose an option</option>
                                    {callTypes.map((call_type, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={call_type.code}
                                                >
                                                    {call_type.name}
                                                </option>
                                            );
                                        }
                                    )}
                                </Form.Select>
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="call_type"
                            render={({ message }) => <small className="text-danger">{message}</small>}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Technician</Form.Label>
                        <Controller
                            control={control}
                            name="technician_id"
                            defaultValue=""
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Form.Select
                                    name="technician_id"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    className={(errors.technician_id && 'is-invalid')}
                                    disabled={!editable}
                                >
                                    <option value="">Choose an option</option>
                                    {technicians.map((technician, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={technician.id}
                                                >
                                                    {technician.full_name}
                                                </option>
                                            );
                                        }
                                    )}
                                </Form.Select>
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="technician_id"
                            render={({ message }) => <small className="text-danger">{message}</small>}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Response time</Form.Label>
                        <Controller
                            control={control}
                            name="response_time"
                            defaultValue=""
                            render={({ field: { value} }) => (
                                <Form.Control
                                    type="text"
                                    value={value}
                                    disabled
                                />
                            )}
                        />
                    </Form.Group>
                </Col>
                
            </Row>
            {editable && 
                <Row className="pt-4">
                    <Col className="text-end">
                        <Button variant="secondary" className="me-2" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Submit
                        </Button>
                    </Col>
                </Row> 
            }
        </Form>
                   
    )
}

export default CallCentreForm;