
import { useEffect } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import useAuth from "../../../hooks/useAuth";
const EOTForm = (props) => {
    const {
        editable,
        control,
        errors,
        reset,
        fault,
        setValue
    } = props
    const { user } = useAuth();

    useEffect(() => {   
        setValue('fault', fault)
        setValue('details', fault?.eot?.details)
        setValue('requested_by', fault?.eot?.requested_by?.full_name)
        setValue('requestor_remarks', fault?.eot?.requestor_remarks)
        setValue('approver_remarks', fault?.eot?.approver_remarks)
        setValue('requested_extension_date', fault?.eot?.requested_extension_date)
        
        if (fault?.eot?.status === 'APPROVED') {
            setValue('approved_by', fault?.eot?.approved_by?.full_name)
        } else if (fault?.eot?.status === 'REJECTED') {
            setValue('approved_by', fault?.eot?.rejected_by?.full_name)
        } else {
            setValue('approved_by', fault?.eot?.approved_by ? fault?.eot?.approved_by.full_name : user?.full_name)
            setValue('requested_by', fault?.eot?.requested_by ? fault?.eot?.requested_by.full_name : user?.full_name)
        }
        
    }, [reset, fault, user, setValue])
    
    return (
         <Card>
            <Card.Body>
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
                                <Form.Label>EOT application date</Form.Label>
                                <Controller
                                    control={control}
                                    name="requested_at"
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
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>To</Form.Label>
                                <Controller
                                    control={control}
                                    name="details.to"
                                    defaultValue="NATIONAL ENVIRONMENTAL AGENCY HDB Hub East Wing #26-01 480 Lorong 6 Toa Payoh Singapore 310480"
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <Form.Control
                                            type="text"
                                            as="textarea"
                                            rows={3}
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            className={(errors.details?.to && 'is-invalid')}
                                            disabled={!editable}
                                        />
                                    )}
                            />
                                <ErrorMessage
                                    errors={errors}
                                    name="details.to"
                                    render={({ message }) => <small className="text-danger">{message}</small>}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                                <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Controller
                                    control={control}
                                    name="details.title"
                                    defaultValue=""
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <Form.Control
                                            type="text"
                                            as="textarea"
                                            rows={2}
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            className={(errors.details?.title && 'is-invalid')}
                                            disabled={!editable}
                                        />
                                    )}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="details.title"
                                    render={({ message }) => <small className="text-danger">{message}</small>}
                                />
                            </Form.Group>
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
                                            disabled={!editable}
                                        />
                                    )}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="details.description"
                                    render={({ message }) => <small className="text-danger">{message}</small>}
                                />
                            </Form.Group>

                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Complaint date</Form.Label>
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
                                            className={(errors.details?.complaint_at && 'is-invalid')}
                                            disabled
                                        />
                                    )}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="details.complaint_at"
                                    render={({ message }) => <small className="text-danger">{message}</small>}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Attended date</Form.Label>
                                <Controller
                                    control={control}
                                    name="fault.attended_at"
                                    defaultValue=""
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <Form.Control
                                            type="text"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            className={(errors.details?.attended_at && 'is-invalid')}
                                            disabled
                                        />
                                    )}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="details.attended_at"
                                    render={({ message }) => <small className="text-danger">{message}</small>}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Requested extension date</Form.Label>
                                <Controller
                                    control={control}
                                    name="requested_extension_date"
                                    defaultValue=""
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <Form.Control
                                            type="date"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            className={(errors.requested_extension_date && 'is-invalid')}
                                            disabled={!editable}
                                            
                                        />
                                    )}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="requested_extension_date"
                                    render={({ message }) => <small className="text-danger">{message}</small>}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Technician/Supervisor</Form.Label>
                                <Controller
                                    control={control}
                                    name="requested_by"
                                    defaultValue=""
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <Form.Control
                                            type="text"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            className={(errors.requested_by && 'is-invalid')}
                                            disabled
                                        />
                                    )}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="requested_by"
                                    render={({ message }) => <small className="text-danger">{message}</small>}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Remarks</Form.Label>
                                <Controller
                                    control={control}
                                    name="requestor_remarks"
                                    defaultValue=""
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <Form.Control
                                            type="text"
                                            as="textarea"
                                            rows={3}
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            disabled={fault?.eot?.requested_by ? true : false}
                                            
                                        />
                                    )}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                    <Form.Label>Signature</Form.Label>
                                    
                            </Form.Group> 
                        
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>NEA's Authorised</Form.Label>
                                <Controller
                                    control={control}
                                    name="approved_by"
                                    defaultValue=""
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <Form.Control
                                            type="text"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            className={(errors.details?.approved_by && 'is-invalid')}
                                            disabled
                                        />
                                    )}
                                />
                               
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Remarks</Form.Label>
                                <Controller
                                    control={control}
                                    name="approver_remarks"
                                    defaultValue=""
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <Form.Control
                                            type="text"
                                            as="textarea"
                                            rows={3}
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            className={(errors.details?.approver_remarks && 'is-invalid')}
                                            disabled={fault?.eot?.approved_by ? true : false}
                                        />
                                    )}
                                />
                              
                            </Form.Group>
                            <Form.Group className="mb-3">
                                    <Form.Label>Signature</Form.Label>
                                
                            </Form.Group> 
                        
                        </Col>
                    </Row>
            </Card.Body>
        </Card>
    );
}

export default EOTForm;