import React from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from '@hookform/error-message';
import * as yup from "yup";
import useAuth from "../../../hooks/useAuth";


const schema = yup.object().shape({
    username: yup
      .string()
      .required("This field is required"),
    password: yup
      .string()
      .required("This field is required")
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

  const signInHandler = async(data) => {
    try {
      await signIn(data);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Controller
              control={control}
              name="username"
              defaultValue=""
              render={({ field: { value, onChange, onBlur } }) => (
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Enter your username"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  className={errors.username && "is-invalid"}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="username"
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
            <small className="d-block text-end">
              <Link to="/auth/reset-password">Forgot password?</Link>
            </small>
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
}

export default SignInForm;
