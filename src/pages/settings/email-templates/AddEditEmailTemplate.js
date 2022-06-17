import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Container, Row, Button, Col } from "react-bootstrap";
import { Card, Form } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import * as emailApi from "@api/emailApi";
import NotyfContext from "../../../contexts/NotyfContext";

const AddEditEmailTemplate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const add = id === "add" ? true : false;
  const schema = yup.object().shape({
    code: yup.string().required("This field is required"),
    title: yup.string().required("This field is required"),
    name: yup.string().required("This field is required"),
  });
  const notyf = useContext(NotyfContext);
  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  //create email template
  const createEmailTemplate = async (data) => {
    try {
      const response = await emailApi.createEmailTemplate(data);
      if (response.status === 200) {
        notyf.open({
          type: "success",
          message: response.data.message,
        });
        navigate("/settings/email-templates");
      }
    } catch (error) {
      setError("code", {
        type: "custom",
        message: error.response.data.errors.code[0],
      });

      throw new Error();
    }
  };

  //update email template
  const updateEmailTemplate = async (data) => {
    try {
      const response = await emailApi.updateEmailTemplate(id, data);

      if (response.status === 200) {
        notyf.open({
          type: "success",
          message: response.data.message,
        });
        navigate("/settings/email-templates");
      }
    } catch (error) {
      setError("code", {
        type: "custom",
        message: error.response.data.errors.code[0],
      });

      throw new Error();
    }
  };

  //get email template
  const getEmailTemplate = useCallback(async () => {
    const response = await emailApi.getEmail(id);
    reset(response.data.data);
  }, [id, reset]);

  useEffect(() => {
    if (!add) {
      getEmailTemplate();
    }
  }, [getEmailTemplate, add]);

  return (
    <React.Fragment>
      <Helmet title={add ? "Create sector" : "Update email template"} />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">{add ? "Create" : "Update"} email template</h1>
        <Card>
          <Card.Body>
            <Row>
              <Form className="col-md-4 col-sm-12 mb-2">
                <Form.Label>Code</Form.Label>
                <Controller
                  control={control}
                  name="code"
                  defaultValue=""
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Form.Control
                      type="text"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      className={errors.code && "is-invalid"}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="code"
                  render={({ message }) => (
                    <small className="text-danger">{message}</small>
                  )}
                />
              </Form>
              <Form className="col-md-4 col-sm-12 mb-2">
                <Form.Label>Title</Form.Label>
                <Controller
                  control={control}
                  name="title"
                  defaultValue=""
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Form.Control
                      type="text"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      className={errors.title && "is-invalid"}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="title"
                  render={({ message }) => (
                    <small className="text-danger">{message}</small>
                  )}
                />
              </Form>
              <Form className="col-md-4 col-sm-12 mb-2">
                <Form.Label>Name</Form.Label>
                <Controller
                  control={control}
                  name="name"
                  defaultValue=""
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Form.Control
                      type="text"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      className={errors.name && "is-invalid"}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => (
                    <small className="text-danger">{message}</small>
                  )}
                />
              </Form>
            </Row>
            <Row className="pt-4">
              <Col className="text-end">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() => navigate("/settings/email-templates")}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={
                    add
                      ? handleSubmit(createEmailTemplate)
                      : handleSubmit(updateEmailTemplate)
                  }
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

export default AddEditEmailTemplate;
