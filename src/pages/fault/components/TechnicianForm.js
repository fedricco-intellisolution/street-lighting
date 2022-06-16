import { Card, Col, Form, Image, Row } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { useEffect } from "react";
import FileUploader from "../../../components/ui/FileUploader";

const TechnicianForm = (props) => {
    const {
        editable,
        control,
        errors,
        reset,
        fault,
        setValue
    } = props

    useEffect(() => {
        reset(fault) 
    }, [reset, fault])

    return (
        <>
            <Card>
                <Card.Header className="pb-0">
                    <Card.Title className="mb-0">Technician</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Attended date</Form.Label>
                                <Controller
                                    control={control}
                                    name="attended_at"
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
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Asset ID (Optional)</Form.Label>
                                <Controller
                                    control={control}
                                    name="asset_id"
                                    defaultValue=""
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <Form.Control
                                            type="text"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            disabled={!editable}
                                        />
                                    )}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Action taken / Recommendation </Form.Label>
                                <Controller
                                    control={control}
                                    name="action_taken"
                                    defaultValue=""
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <Form.Control
                                            type="text"
                                            as="textarea"
                                            rows={5}
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                             className={(errors.action_taken && 'is-invalid')}
                                            disabled={!editable}
                                        />
                                    )}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="action_taken"
                                    render={({ message }) => <small className="text-danger">{message}</small>}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <FileUploader
                                defaultValue=""
                                label="Before photos"
                                control={control}
                                name="before_photos"
                                disabled={false}
                                errors={errors}
                                setValue={setValue}
                                data={fault.before_photos}
                            />
                        </Col>
                        <Col md={12}>
                           <FileUploader
                                defaultValue=""
                                label="After photos"
                                control={control}
                                name="after_photos"
                                disabled={false}
                                errors={errors}
                                setValue={setValue}
                                data={fault?.after_photos}
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
             {props.children}
       </>                                 
    )
}

export default TechnicianForm;