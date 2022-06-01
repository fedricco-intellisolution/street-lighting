import React, { useCallback, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Container, Row, Button, Col } from "react-bootstrap";
import { Card, Form } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import * as propertyManagementApi from "@api/propertyManagementApi";
import NotyfContext from "../../../contexts/NotyfContext";

const AddEditSector = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const add = id === "add" ? true : false;
  const schema = yup.object().shape({
    code: yup.string().required("This field is required"),
    name: yup.string().required("This field is required"),
    description: yup.string(),
  });
  const notyf = useContext(NotyfContext);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  //create sector
  const createSector = async (data) => {
    try {
      const response = await propertyManagementApi.createSector(data);

      if (response.status === 200) {
        notyf.open({
          type: "success",
          message: response.data.message,
        });
        navigate("/property-management/sectors");
      }
    } catch (error) {
      throw new Error();
    }
  };

  //update sector
  const updateSector = async (data) => {
    try {
      const response = await propertyManagementApi.updateSector(id, data);
      if (response.status === 200) {
        notyf.open({
          type: "success",
          message: response.data.message,
        });
        navigate("/property-management/sectors");
      }
    } catch (error) {
      throw new Error();
    }
  };

  //get sector
  const getSectors = useCallback(async () => {
    const response = await propertyManagementApi.getSector(id);
    reset(response.data.data);
  }, [id, reset]);

  useEffect(() => {
    if (!add) {
      getSectors();
    }
  }, [getSectors, add]);

  return (
    <React.Fragment>
      <Helmet title="Create sector" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">{add ? "Create" : "Update"} sector</h1>
        <Card>
          <Card.Body>
            <Row>
              <Form className="col-md-6 col-sm-12 mb-2">
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
              <Form className="col-md-6 col-sm-12 mb-2">
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
            <Row>
              <Form>
                <Form.Label>Description</Form.Label>
                <Controller
                  control={control}
                  name="description"
                  defaultValue=""
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Form.Control
                      as="textarea"
                      value={value == null ? "" : value}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
              </Form>
            </Row>
            <Row className="pt-4">
              <Col className="text-end">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() => navigate("/property-management/sectors")}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={
                    add
                      ? handleSubmit(createSector)
                      : handleSubmit(updateSector)
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

export default AddEditSector;
