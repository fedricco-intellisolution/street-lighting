import React from "react";

import { Button, Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Must be a valid email address")
        .required("This field is required"),
    password: yup.string().required("This field is required"),
});

const SignInForm = () => {
    // const { signIn } = useAuth();
    const {
        control,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();

    //
    // Functions
    //

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Controller
                    control={control}
                    name="email"
                    defaultValue=""
                    render={({ field: { value, onChange, onBlur } }) => (
                        <Form.Control
                            size="lg"
                            type="text"
                            placeholder="Enter your email in lower case"
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            className={errors.email && "is-invalid"}
                        />
                    )}
                />
                <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => (
                        <small className="text-danger">{message}</small>
                    )}
                />
            </Form.Group>

            <Form.Group className="mb-1">
                <Form.Label>Password</Form.Label>
                <Controller
                    control={control}
                    name="password"
                    defaultValue=""
                    render={({ field: { value, onChange, onBlur } }) => (
                        <Form.Control
                            size="lg"
                            type="password"
                            placeholder="Enter your password"
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            className={errors.password && "is-invalid"}
                        />
                    )}
                />
                <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => (
                        <small className="text-danger">{message}</small>
                    )}
                />
            </Form.Group>
            <Form.Group className="text-start">
                <Button
                    variant="link"
                    className="ps-0"
                    onClick={() => navigate("/forgot-password")}
                >
                    Reset password
                </Button>
            </Form.Group>

            <div className="text-end mt-3">
                <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate("/")}
                >
                    Sign in
                </Button>
            </div>
        </Form>
    );
};

export default SignInForm;
