import React from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Container, Row, Button, Col } from "react-bootstrap";
import { Card, Form } from "react-bootstrap";

// import NotyfContext from "../../../contexts/NotyfContext";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SubModule = () => {
    //
    // States
    //
    const navigate = useNavigate();
    const { id } = useParams();
    const add = id === "add" ? true : false;
    const schema = yup.object().shape({
        name: yup.string().required("This field is required"),
        sub_module_no: yup.string().required("This field is required"),
        start_date: yup.date().required("This field is required"),
        end_date: yup.date().required("This field is required"),
        description: yup.string().required("This field is required"),
    });
    // const notyf = useContext(NotyfContext);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    //
    // Functions
    //

    const createSubModule = () => {
        return;
    };

    //
    // UseEffects
    //

    return (
        <React.Fragment>
            <Helmet title={add ? "Create sub module" : "Update sub module"} />
            <Container fluid className="p-0">
                <h1 className="h3 mb-3">
                    {add ? "Create" : "Update"} sub module
                </h1>
                <Card>
                    <Card.Body>
                        <Row>
                            <Form className="col-md-6 col-sm-12 mb-2">
                                <Form.Label>Name</Form.Label>
                                <Controller
                                    control={control}
                                    name="name"
                                    defaultValue=""
                                    render={({
                                        field: { value, onChange, onBlur },
                                    }) => (
                                        <Form.Control
                                            type="text"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            className={
                                                errors.name && "is-invalid"
                                            }
                                        />
                                    )}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="name"
                                    render={({ message }) => (
                                        <small className="text-danger">
                                            {message}
                                        </small>
                                    )}
                                />
                            </Form>
                            <Form className="col-md-6 col-sm-12 mb-2">
                                <Form.Label>Sub module no</Form.Label>
                                <Controller
                                    control={control}
                                    name="sub_module_no"
                                    defaultValue=""
                                    render={({
                                        field: { value, onChange, onBlur },
                                    }) => (
                                        <Form.Control
                                            type="text"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            className={
                                                errors.sub_module_no &&
                                                "is-invalid"
                                            }
                                        />
                                    )}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="sub_module_no"
                                    render={({ message }) => (
                                        <small className="text-danger">
                                            {message}
                                        </small>
                                    )}
                                />
                            </Form>
                        </Row>
                        <Row>
                            <Form className="col-md-6 col-sm-12 mb-2">
                                <Form.Label>Start date</Form.Label>
                                <Controller
                                    control={control}
                                    name="start_date"
                                    render={({
                                        field: { value, onChange, onBlur },
                                    }) => (
                                        <DatePicker
                                            dateFormat="yyyy-MM-dd"
                                            selected={value}
                                            onChange={onChange}
                                            className={`form-control ${
                                                errors.start_date &&
                                                "is-invalid"
                                            }`}
                                            value={value}
                                        />
                                    )}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="start_date"
                                    render={({ message }) => (
                                        <small className="text-danger">
                                            {message}
                                        </small>
                                    )}
                                />
                            </Form>
                            <Form className="col-md-6 col-sm-12 mb-2">
                                <Form.Label>End date</Form.Label>
                                <Controller
                                    control={control}
                                    name="end_date"
                                    render={({
                                        field: { value, onChange, onBlur },
                                    }) => (
                                        <DatePicker
                                            dateFormat="yyyy-MM-dd"
                                            selected={value}
                                            onChange={onChange}
                                            className={`form-control ${
                                                errors.end_date && "is-invalid"
                                            }`}
                                        />
                                    )}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="end_date"
                                    render={({ message }) => (
                                        <small className="text-danger">
                                            {message}
                                        </small>
                                    )}
                                />
                            </Form>
                        </Row>
                        <Row>
                            <Form>
                                <Form.Label>Description</Form.Label>
                                <Controller
                                    control={control}
                                    name="description"
                                    defaultValue=""
                                    render={({
                                        field: { value, onChange, onBlur },
                                    }) => (
                                        <Form.Control
                                            as="textarea"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            className={
                                                errors.description &&
                                                "is-invalid"
                                            }
                                        />
                                    )}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="description"
                                    render={({ message }) => (
                                        <small className="text-danger">
                                            {message}
                                        </small>
                                    )}
                                />
                            </Form>
                        </Row>
                        <Row className="pt-4">
                            <Col className="text-end">
                                <Button
                                    variant="secondary"
                                    className="me-2"
                                    onClick={() => navigate("/module/sub")}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={handleSubmit(createSubModule)}
                                >
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>
    );
};

export default SubModule;
