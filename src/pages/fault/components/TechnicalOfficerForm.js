import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { Paperclip } from "react-feather";
import { useCallback, useEffect, useState } from "react";
import * as lookUpApi from "@api/lookUpApi";
import ReactSelect from "react-select";

const TechnicalOfficerForm = (props) => {
    const {
        editable,
        control,
        errors,
        reset,
        fault,
    } = props

    const [faultCaseCategory, setFaultCaseCategory] = useState([])
    useEffect(() => {
        reset(fault)
    }, [reset, fault])


    const getFaultCaseCategory = useCallback(async () => {
        const response = await lookUpApi.getLookUp({search: { category: 'FAULT_CASE_CATEGORY' }})
        const data = response.data.data
        const options = []
        data.forEach(item => {
            options.push({
                label: item.name,
                value: item.code
            })
        })
        setFaultCaseCategory(options)  
    }, [])
    
    useEffect(() => {
        getFaultCaseCategory()
    },[getFaultCaseCategory])
    return (
        <>
            <Card>
                <Card.Header className="pb-0">
                    <Row>
                        <Col  md={6} >
                            <Card.Title className="mb-0">Technical Officer</Card.Title>
                        </Col>
                        <Col md={6} className="text-end">
                            { fault?.incident_report && fault?.incident_report.length < 1 
                                ?   <Button variant="warning" onClick={() => window.open(`/faults/incident-reports/add/${fault.id}/`,'_blank')}>
                                        <Paperclip size={16} className="me-1"/>
                                        Attach incident report
                                    </Button>
                                :   <Button variant="warning" onClick={() => window.open(`/faults/incident-reports/${fault?.incident_report[0].id}/`,'_blank')}>
                                        <Paperclip size={16} className="me-1"/>
                                        View incident report
                                    </Button>
                            }
                        </Col>
                    </Row>
                   
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Fault case category</Form.Label>
                                <Controller
                                    control={control}
                                    name="case_category"
                                    defaultValue=""
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <ReactSelect
                                            placeholder="Choose an option"
                                            classNamePrefix="react-select"
                                            options={faultCaseCategory}
                                            onBlur={onBlur}
                                            className={
                                                "react-select-container" + errors.case_category && "is-invalid"
                                            }
                                            onChange={(val) => onChange(val.value)}
                                            value={faultCaseCategory.filter((c) => value?.includes(c.value))}
                                            isDisabled={!editable}
                                        />
                                    )}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="case_category"
                                    render={({ message }) => <small className="text-danger">{message}</small>}
                                />
                            </Form.Group>
                        </Col>
                      
                    </Row>
                </Card.Body>
            </Card>    
       </>                                 
    )
}

export default TechnicalOfficerForm;