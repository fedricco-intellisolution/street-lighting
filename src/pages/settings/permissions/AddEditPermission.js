import React, { useCallback, useContext, useEffect, useState } from "react";
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
import Select from "react-select";
import * as lookUpApi from "@api/lookUpApi";

const AddEditPermission = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const add = id === "add" ? true : false;
  const [options, setOptions] = useState([]);
  const schema = yup.object().shape({
    name: yup.string().required("This field is required"),
    slug: yup.string().required("This field is required"),
    category: yup.string().required("This field is required"),
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

  //get categories
  const getCategories = useCallback(async () => {
    const response = await lookUpApi.getLookUp({
      search: { category: "PERMISSION" },
    });
    const data = response.data.data;
    const options = [];
    data.forEach((item) => {
      options.push({
        label: item.name,
        value: item.code,
      });
    });

    setOptions(options);
  }, []);

  //get permission
  const getPermission = useCallback(async () => {
    const response = await permissionApi.getPermission(id);
    reset({
      name: response.data.data?.name,
      slug: response.data.data?.slug,
      category: response.data.data?.category.name,
      description: response.data.data?.description,
    });
  }, [id, reset]);

  useEffect(() => {
    getCategories();

    if (!add) {
      getPermission();
    }
  }, [getPermission, getCategories, add]);

  return (
    <React.Fragment>
      <Helmet title={add ? "Create permission" : "Update permission"} />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">{add ? "Create" : "Update"} permission</h1>
        <Card>
          <Card.Body>
            <Row>
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
              <Form className="col-md-4 col-sm-12 mb-2">
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
              <Form className="col-md-4 col-sm-12 mb-2">
                <Form.Label>Category</Form.Label>
                <Controller
                  control={control}
                  name="category"
                  defaultValue=""
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <Select
                      inputRef={ref}
                      classNamePrefix="react-select"
                      options={options}
                      onBlur={onBlur}
                      className={
                        "react-select-container" + errors.category &&
                        "is-invalid"
                      }
                      onChange={(val) => onChange(val.value)}
                      value={
                        value
                          ? options.filter((c) => value.includes(c.value))
                          : ""
                      }
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="category"
                  render={({ message }) => (
                    <small className="text-danger">{message}</small>
                  )}
                />
              </Form>
            </Row>
            <Row>
              <Form className="col-md-12 col-sm-12 mb-2">
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
                      className={errors.description && "is-invalid"}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="description"
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
