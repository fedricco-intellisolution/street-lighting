import { Card, Col, Form, Row } from "react-bootstrap";
import { Controller } from "react-hook-form";

const SignatoriesForm = (props) => {
    const {
        control
    } = props
    
    return (
        <Card>
                <Card.Header>
                    <Card.Title className="mb-0">Signatories</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Supervisor</Form.Label>
                                <Controller
                                    control={control}
                                    name="supervisor"
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
                                    name="supervisor_comment"
                                    defaultValue=""
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <Form.Control
                                            type="text"
                                            value={value}
                                            as="textarea"
                                            rows={5}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            disabled
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
                                    name="nea_authorised"
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
                                    name="nea_authorised_comment"
                                    defaultValue=""
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <Form.Control
                                            type="text"
                                            value={value}
                                            as="textarea"
                                            rows={5}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            disabled
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
    )
}

export default SignatoriesForm;