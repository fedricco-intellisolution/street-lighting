import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Row, } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from '@hookform/error-message';
import * as yup from "yup";
import * as propertyManagementApi from "@api/propertyManagementApi";
import * as lookUpApi from "@api/lookUpApi";
import Select from "react-select";

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
    const [job_types, setJobTypes] = useState([])
    const [call_types, setCallTypes] = useState([])
    const [call_type_options, setCallTypeOptions] = useState([])
    const [technicians, setTechnicians] = useState([])
    const watchCallType = watch("call_type", 'value')

    const getSites = useCallback(async () => {
        const response = await propertyManagementApi.getSites()
        const data = response.data.data
        const temp = []
        data.forEach(item => {
            temp.push({
                label: item.name,
                value: item.id
            })
        })
        setSites(temp)
    }, [])
    
    const getJobTypes = async () => {
        const response = await lookUpApi.getLookUp({search: { category: 'JOB_TYPE' }})
        const data = response.data.data
        const options = []
        data.forEach(item => {
            options.push({
                label: item.name,
                value: item.code
            })
        })
        setJobTypes(options)
    }

    const getCallTypes = async () => {
        const response = await lookUpApi.getLookUp({search: { category: 'CALL_TYPE' }})
        const data = response.data.data
        setCallTypes(data)
        const options = []
        data.forEach(item => {
            options.push({
                label: item.name,
                value: item.code
            })
        })
        setCallTypeOptions(options)
    }

    useEffect(() => {
        const result = call_types.find(item => item.code === watchCallType)
        setValue('response_time', result?.description)
    }, [call_types, watchCallType, setValue])

    const getTechnicians = () => {
        const data = [
            {
                label: 'Teck Ken Wong',
                value: '15ad6e1b-df43-4911-bd50-350f83c23d7c'
            },
            {
                label: 'Moorthy Samikannu',
                value: '56a63643-1d10-4a71-a5f8-e04263524a31'
            }
        ]
        setTechnicians(data)
    }

    useEffect(() => {
        getSites()
        getJobTypes()
        getCallTypes()
        getTechnicians()
    }, [getSites])

    useEffect(() => {
        if (props.mode === 'register') {
            setInterval(() => {
                setValue('complaint_at', new Date().toLocaleString())
            }, 1000)
        }
    }, [props.mode, setValue])
    
    useEffect(() => {   
        reset(props.fault)
        setValue('site_id', props.fault?.site?.id)
        setValue('job_type', props.fault?.job_type?.code)
        setValue('call_type', props.fault?.call_type?.code)
        setValue('technician_id', props.fault?.technician?.id)
    }, [reset, props.fault, setValue])
    
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
                                <Select
                                    placeholder="Choose an option"
                                    classNamePrefix="react-select"
                                    options={sites}
                                    onBlur={onBlur}
                                    className={
                                        "react-select-container" + errors.site_id && "is-invalid"
                                    }
                                    onChange={(val) => onChange(val.value)}
                                    value={sites.filter((c) => value.includes(c.value))}
                                    isDisabled={!props.editable}
                                />
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
                                    disabled={!props.editable}
                                  
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
                                    disabled={!props.editable}
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
                                    disabled={!props.editable}
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
                                <Select
                                    placeholder="Choose an option"
                                    classNamePrefix="react-select"
                                    options={job_types}
                                    onBlur={onBlur}
                                    className={
                                        "react-select-container" + errors.job_type && "is-invalid"
                                    }
                                    onChange={(val) => onChange(val.value)}
                                    value={job_types.filter((c) => value.includes(c.value))}
                                    isDisabled={!props.editable}
                                />
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
                                <Select
                                    placeholder="Choose an option"
                                    classNamePrefix="react-select"
                                    options={call_type_options}
                                    onBlur={onBlur}
                                    className={
                                        "react-select-container" + errors.call_type && "is-invalid"
                                    }
                                    onChange={(val) => {
                                            onChange(val.value)
                                            console.log(val.value)
                                            
                                        }
                                    }
                                    value={call_type_options.filter((c) => value.includes(c.value))}
                                    isDisabled={!props.editable}
                                />
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
                                <Select
                                    placeholder="Choose an option"
                                    classNamePrefix="react-select"
                                    options={technicians}
                                    onBlur={onBlur}
                                    className={
                                        "react-select-container" + errors.technician_id && "is-invalid"
                                    }
                                    onChange={(val) => onChange(val.value)}
                                    value={technicians.filter((c) => value.includes(c.value))}
                                    isDisabled={!props.editable}
                                />
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
            {props.editable && 
                <Row className="pt-4">
                    <Col className="text-end">
                        <Button variant="secondary" className="me-2" onClick={props.onCancel}>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleSubmit(props.onSubmit)}
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