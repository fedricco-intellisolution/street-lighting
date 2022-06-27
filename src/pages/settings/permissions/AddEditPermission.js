import React, { useCallback, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Container, Row, Button, Col } from "react-bootstrap";
import { Card, Form } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import * as permissionApi from "@api/permissionApi";
import NotyfContext from "../../../contexts/NotyfContext";

const AddEditPermission = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const add = id === "add" ? true : false;
  const schema = yup.object().shape({
    name: yup.string().required("This field is required"),
    slug: yup.string().required("This field is required"),
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

  //create permission
  const createPermission = async (data) => {
    try {
      const response = await permissionApi.createPermission(data);
      if (response.status === 200) {
        notyf.open({
          type: "success",
          message: response.data.message,
        });
        navigate("/settings/permissions");
      }
    } catch (error) {
      setError("name", {
        type: "custom",
        message: error.response.data.errors.name[0],
      });
      setError("slug", {
        type: "custom",
        message: error.response.data.errors.slug[0],
      });

      throw new Error();
    }
  };

  //update permission
  const updatePermission = async (data) => {
    try {
      const response = await permissionApi.updatePermission(id, data);
      if (response.status === 200) {
        notyf.open({
          type: "success",
          message: response.data.message,
        });
        navigate("/settings/permissions");
      }
    } catch (error) {
      setError("name", {
        type: "custom",
        message: error.response.data.errors.name[0],
      });
      setError("slug", {
        type: "custom",
        message: error.response.data.errors.slug[0],
      });

      throw new Error();
    }
  };

  //get permission
  const getPermission = useCallback(async () => {
    const response = await permissionApi.getPermission(id);
    reset(response.data.data);
  }, [id, reset]);

  useEffect(() => {
    if (!add) {
      getPermission();
    }
  }, [getPermission, add]);

  return (
    <React.Fragment>
      <Helmet title={add ? "Create permission" : "Update permission"} />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">{add ? "Create" : "Update"} permission</h1>
        <Card>
          <Card.Body>
            <Row>
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
              <Form className="col-md-6 col-sm-12 mb-2">
                <Form.Label>Slug</Form.Label>
                <Controller
                  control={control}
                  name="slug"
                  defaultValue=""
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Form.Control
                      type="text"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      className={errors.slug && "is-invalid"}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="slug"
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
                  onClick={() => navigate("/settings/permissions")}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={
                    add
                      ? handleSubmit(createPermission)
                      : handleSubmit(updatePermission)
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

export default AddEditPermission;
