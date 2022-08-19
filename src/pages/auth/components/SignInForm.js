import React, { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import * as yup from "yup";
import useAuth from "../../../hooks/useAuth";
import NotyfContext from "contexts/NotyfContext";

const schema = yup.object().shape({
    // email: yup.string().required("This field is required"),
    // password: yup.string().required("This field is required"),
});

const SignInForm = () => {
    const { signIn } = useAuth();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });
    const notyf = useContext(NotyfContext);

    //
    // Functions
    //

    const signInHandler = async (data) => {
        try {
            await signIn(data);
            notyf.open({
                type: "success",
                message: "Login successful, welcome back.",
            });
        } catch (error) {
            notyf.open({
                type: "danger",
                message: error.response.data.message,
            });
        }
    };

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
                            placeholder="Enter your email"
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

            <Form.Group className="mb-3">
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

            <div className="text-end mt-3">
                <Button
                    variant="primary"
                    size="lg"
                    onClick={handleSubmit(signInHandler)}
                >
                    Sign in
                </Button>
            </div>
        </Form>
    );
};

export default SignInForm;
