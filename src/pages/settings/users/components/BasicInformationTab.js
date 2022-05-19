import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from '@hookform/error-message';
import * as yup from "yup";

const schema = yup.object().shape({
    full_name: yup
        .string()
        .required("This field is required"),
    username: yup
        .string()
        .required("This field is required"),
    email: yup
        .string()
        .email('Invalid email address')
        .required("This field is required"),
    password: yup
        .string()
        .required('This field is required')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'Length must be at least 8 characters \nMust contain at least one uppercase letter \nMust contain at least one lowercase letter \nMust contain at least one special character '),
});

const BasicInformationTab = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    const saveUser = (data) => {
        console.log(data)
    }

    return (
        <Form>
            <Row>
                <Col md={12}>
                    <h6 className="pt-2 pb-3">Basic Information</h6>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full name</Form.Label>
                        <Controller
                            control={control}
                            name="full_name"
                            defaultValue=""
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Form.Control
                                    type="text"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    className={(errors.full_name && 'is-invalid')}
                                />
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="full_name"
                            render={({ message }) => <small className="text-danger">{message}</small>}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Controller
                            control={control}
                            name="username"
                            defaultValue=""
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Form.Control
                                    type="text"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    className={(errors.username && 'is-invalid')}
                                />
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="username"
                            render={({ message }) => <small className="text-danger">{message}</small>}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Controller
                            control={control}
                            name="email"
                            defaultValue=""
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Form.Control
                                    type="text"
                                    placeholder="email@address.com"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    className={(errors.email && 'is-invalid')}
                                />
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ message }) => <small className="text-danger">{message}</small>}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Controller
                            control={control}
                            name="password"
                            defaultValue=""
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Form.Control
                                    type="password"
                                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    className={(errors.password && 'is-invalid')}
                                />
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="password"
                            render={({ message }) => <small className="text-danger" style={{whiteSpace: "pre-wrap" }}>{message}</small>}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="pt-4">
                <Col md={12}>
                    <h6 className="pt-2 pb-2">Other Details</h6>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Designation</Form.Label>
                        <Controller
                            control={control}
                            name="designation"
                            defaultValue=""
                            render={({ field: { value, onChange } }) => (
                                <Form.Control
                                    type="text"
                                    value={value}
                                    onChange={onChange}
                                    className={(errors.designation && 'is-invalid')}
                                />
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="designation"
                            render={({ message }) => <small className="text-danger">{message}</small>}
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>NRIC</Form.Label>
                        <Controller
                            control={control}
                            name="nric"
                            defaultValue=""
                            render={({ field: { value, onChange } }) => (
                                <Form.Control
                                    type="text"
                                    value={value}
                                    onChange={onChange}
                                    className={(errors.nric && 'is-invalid')}
                                />
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="nric"
                            render={({ message }) => <small className="text-danger">{message}</small>}
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Mobile no.</Form.Label>
                        <Controller
                            control={control}
                            name="mobile_no"
                            defaultValue=""
                            render={({ field: { value, onChange } }) => (
                                <Form.Control
                                    type="number"
                                    value={value}
                                    onChange={onChange}
                                    className={(errors.mobile_no && 'is-invalid')}
                                />
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="mobile_no"
                            render={({ message }) => <small className="text-danger">{message}</small>}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="pt-4">
                <Col md={{ span: 3, offset: 9 }} className="text-end">
                    <Button variant="primary" onClick={handleSubmit(saveUser)}>
                        Submit
                    </Button>
                </Col>
            </Row> 

           
        </Form>
    )
}

export default BasicInformationTab;