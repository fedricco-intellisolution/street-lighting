import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from '@hookform/error-message';
import * as yup from "yup";

const schema = yup.object().shape({
    current_password: yup
        .string()
        .required("This field is required"),
    new_password: yup
        .string()
        .required("This field is required")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'Length must be at least 8 characters \nMust contain at least one uppercase letter \nMust contain at least one lowercase letter \nMust contain at least one special character'),
    confirm_password: yup
      .string()
      .required("This field is required")
      .oneOf([yup.ref('new_password')], 'Password does not match'),
  });

const PrivacySecurityTab = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
       mode: "onTouched", 
       resolver: yupResolver(schema),
    });

    const submit = (data) => {
        console.log(data)
    }

    return (
        <Form>
            <Row>
                <Col md={12}>
                    <h6 className="pt-2 pb-3">Change password</h6>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Current password</Form.Label>
                        <Controller
                            control={control}
                            name="current_password"
                            defaultValue=""
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Form.Control
                                    type="password"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    className={(errors.current_password && 'is-invalid')}
                                />
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="current_password"
                            render={({ message }) => <small className="text-danger">{message}</small>}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>New password</Form.Label>
                        <Controller
                            control={control}
                            name="new_password"
                            defaultValue=""
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Form.Control
                                    type="password"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    className={(errors.new_password && 'is-invalid')}
                                />
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="new_password"
                            render={({ message }) => <small className="text-danger" style={{whiteSpace: "pre-wrap" }}>{message}</small>}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm new password</Form.Label>
                        <Controller
                            control={control}
                            name="confirm_password"
                            defaultValue=""
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Form.Control
                                    type="password"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    className={(errors.confirm_password && 'is-invalid')}
                                />
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="confirm_password"
                            render={({ message }) => <small className="text-danger">{message}</small>}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 3, offset: 9 }} className="text-end">
                    <Button variant="primary" onClick={handleSubmit(submit)}>
                        Submit
                    </Button>
                </Col>
            </Row> 
        </Form>
    )
}

export default PrivacySecurityTab;