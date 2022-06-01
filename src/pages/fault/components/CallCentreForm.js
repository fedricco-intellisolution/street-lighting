import React, { useEffect } from "react";
import { Button, Col, Form, Row, } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from '@hookform/error-message';
import * as yup from "yup";

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
    response_time: yup
        .string()
        .nullable()
        .required("This field is required"),
    
});

const CallCentreForm = (props) => {
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
    
    useEffect(() => {
        if (props.mode === 'register') {
            setInterval(() => {
                setValue('complaint_at', new Date().toLocaleString())
            }, 1000)
        }
    }, [props.mode, setValue])
    
    useEffect(() => {   
        reset(props.fault)
    }, [reset, props.fault])

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
                                    type="text"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    className={(errors.site_id && 'is-invalid')}
                                    disabled={!props.editable}
                                >
                                    <option value="">Choose an option</option>
                                    <option value="96553078-cd16-4b35-a1b6-093b8a1b7649">Site 1</option>
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
                                    disabled={!props.editable}
                                  
                                />
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="complainant?.name"
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
                            name="complainant?.contact_no"
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
                                <Form.Select
                                    type="text"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    className={(errors.job_type && 'is-invalid')}
                                    disabled={!props.editable}
                                >
                                    <option value="">Choose an option</option>
                                    <option value="ELECTRICAL">Electrical</option>
                                    <option value="2">Job type 2</option>
                                    <option value="3">Job type 3</option>
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
                                    type="text"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    className={(errors.call_type && 'is-invalid')}
                                    disabled={!props.editable}
                                >
                                    <option value="">Choose an option</option>
                                    <option value="NORMAL">Normal</option>
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
                                    type="text"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    className={(errors.technician_id && 'is-invalid')}
                                    disabled={!props.editable}
                                >
                                    <option value="">Choose an option</option>
                                    <option value="96553078-cd16-4b35-a1b6-093b8a1b7649">Technician 1</option>
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
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Form.Select
                                    type="text"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    className={(errors.response_time && 'is-invalid')}
                                    disabled={!props.editable}
                                >
                                    <option value="">Choose an option</option>
                                    <option value="1">Response time 1</option>
                                    <option value="2">Response time 2</option>
                                    <option value="3">Response time 3</option>
                                </Form.Select>
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="response_time"
                            render={({ message }) => <small className="text-danger">{message}</small>}
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