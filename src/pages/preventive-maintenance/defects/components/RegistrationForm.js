import React, { useCallback, useEffect, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Col, Form, Row } from "react-bootstrap";
import { Controller } from "react-hook-form";
import FileUploader from "../../../../components/ui/FileUploader";
import * as propertyManagementApi from "@api/propertyManagementApi";
import * as lookUpApi from "@api/lookUpApi";

const RegistrationForm = (props) => {
    const {
        editable,
        control,
        errors,
        setValue,
        defect,
        mode,
        reset
    } = props

    const [sectors, setSectors] = useState([])
    const [sites, setSites] = useState([])
    const [levels, setLevels] = useState([])
    const [areas, setAreas] = useState([])
    const [jobTypes, setJobTypes] = useState([])
    const [status, setStatus] = useState([])

    const getSectors = useCallback(async () => {
        const response = await propertyManagementApi.getSectors()
        setSectors(response.data.data)
    }, [])

    const getSites = useCallback(async () => {
        const response = await propertyManagementApi.getSites()
        setSites(response.data.data)
    }, [])

    const getLevels = useCallback(async () => {
        const response = await propertyManagementApi.getLevels()
        setLevels(response.data.data)
    }, [])

    const getAreas = useCallback(async () => {
        const response = await propertyManagementApi.getAreas()
        setAreas(response.data.data)
    }, [])

    const getJobTypes = useCallback(async () => {
        const response = await lookUpApi.getLookUp({search: { category: 'JOB_TYPE' }})
        setJobTypes(response.data.data)
    }, [])
    
    const getStatus = useCallback(async () => {
        const response = await lookUpApi.getLookUp({search: { category: 'DEFECT_STATUS' }})
        setStatus(response.data.data)
    },[])

    useEffect(() => {
        getSectors()
        getSites()
        getLevels()
        getAreas()
        getJobTypes()
        getStatus()
    }, [
        getSectors,
        getSites,
        getLevels,
        getAreas,
        getJobTypes,
        getStatus
    ])

    useEffect(() => {
        if (mode === 'register') {
            setInterval(() => {
                setValue('reported_at', new Date().toLocaleString())
            }, 1000)
        }
        
    }, [setValue, mode])

    useEffect(() => {   
        reset(defect)
        setValue('status', defect?.status?.code)
        setValue('job_type', defect?.job_type?.code)
        setValue('sector_id', defect?.sector?.id)
        setValue('site_id', defect?.site?.id)
        setValue('level_id', defect?.level?.id)
        setValue('area_id', defect?.area?.id)
        setValue('before_photos', defect?.before_photos)
    }, [reset, defect, setValue])
    
    return (
        <>
            <Row>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Reported date</Form.Label>
                        <Controller
                            control={control}
                            name="reported_at"
                            defaultValue=""
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Form.Control
                                    type="text"
                                    name="reported_at"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    disabled
                                />
                            )}
                        />
                    </Form.Group>    
                </Col>
                <Col md={4}>
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
                                    disabled={editable}
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
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Controller
                            control={control}
                            name="status"
                            defaultValue={mode ==='register' ? 'NEW' : ''}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Form.Select
                                    name="status"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    disabled={mode==='register' ? true : false}
                                >
                                    <option value="">Choose an option</option>
                                    {status.map((status, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={status.code}
                                                >
                                                    {status.name}
                                                </option>
                                            );
                                        }
                                    )}
                                </Form.Select>
                            )}
                        />
                    </Form.Group>    
                </Col>
            </Row>    
            <Row>    
                <Col md={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Sector</Form.Label>
                        <Controller
                            control={control}
                            name="sector_id"
                            defaultValue=""
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Form.Select
                                    name="sector_id"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    className={(errors.sector_id && 'is-invalid')}
                                    disabled={editable}
                                >
                                    <option value="">Choose an option</option>
                                    {sectors.map((sector, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={sector.id}
                                                >
                                                    {sector.name}
                                                </option>
                                            );
                                        }
                                    )}
                                </Form.Select>
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="sector_id"
                            render={({ message }) => <small className="text-danger">{message}</small>}
                        />
                    </Form.Group>
                </Col>
                    <Col md={3}>
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
                                    className={(errors.level_id && 'is-invalid')}
                                    disabled={editable}
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
                <Col md={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Level</Form.Label>
                        <Controller
                            control={control}
                            name="level_id"
                            defaultValue=""
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Form.Select
                                    name="level_id"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    className={(errors.level_id && 'is-invalid')}
                                    disabled={editable}
                                >
                                    <option value="">Choose an option</option>
                                    {levels.map((level, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={level.id}
                                                >
                                                    {level.name}
                                                </option>
                                            );
                                        }
                                    )}
                                </Form.Select>
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="level_id"
                            render={({ message }) => <small className="text-danger">{message}</small>}
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Area</Form.Label>
                        <Controller
                            control={control}
                            name="area_id"
                            defaultValue=""
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Form.Select
                                    name="area_id"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    className={(errors.area_id && 'is-invalid')}
                                    disabled={editable}
                                >
                                    <option value="">Choose an option</option>
                                    {areas.map((area, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={area.id}
                                                >
                                                    {area.name}
                                                </option>
                                            );
                                        }
                                    )}
                                </Form.Select>
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="area_id"
                            render={({ message }) => <small className="text-danger">{message}</small>}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form.Group className="mb-3">
                        <Form.Label>Defect</Form.Label>
                        <Controller
                            control={control}
                            name="defect"
                            defaultValue=""
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Form.Control
                                    type="text"
                                    as="textarea"
                                    rows={5}
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    className={(errors.defect && 'is-invalid')}
                                    disabled={editable}
                                />
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="defect"
                            render={({ message }) => <small className="text-danger">{message}</small>}
                        />
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <FileUploader
                        defaultValue=""
                        label="Before photos"
                        control={control}
                        name="before_photos"
                        errors={errors}
                        setValue={setValue}
                        data={defect?.before_photos ? defect?.before_photos : []}
                    />
                </Col>
            </Row>

            {props.children}
        
        </>
    );
}

export default RegistrationForm;