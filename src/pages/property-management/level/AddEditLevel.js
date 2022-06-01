import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Container, Row, Button, Col } from "react-bootstrap";
import { Card, Form } from "react-bootstrap";
import Select from "react-select";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import * as propertyManagementApi from "@api/propertyManagementApi";
import NotyfContext from "../../../contexts/NotyfContext";

const AddEditLevel = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const add = id === "add" ? true : false;
  const [options, setOptions] = useState([]);
  const schema = yup.object().shape({
    site_id: yup.string().required("This field is required"),
    name: yup.string().required("This field is required"),
    description: yup.string().required("This field is required"),
  });
  const notyf = useContext(NotyfContext);
  const {
    // setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  //create level
  const createLevel = async (data) => {
    try {
      const response = await propertyManagementApi.createLevel(data);
      if (response.status === 200) {
        notyf.open({
          type: "success",
          message: response.data.message,
        });
        navigate("/property-management/levels");
      }
    } catch (error) {
      throw new Error();
    }
  };

  //update level
  const updateLevel = async (data) => {
    try {
      const response = await propertyManagementApi.updateLevel(id, data);
      if (response.status === 200) {
        notyf.open({
          type: "success",
          message: response.data.message,
        });
        navigate("/property-management/levels");
      }
    } catch (error) {
      throw new Error();
    }
  };

  //get sites
  const getSites = useCallback(async () => {
    const response = await propertyManagementApi.getSites();
    const sites = response.data.data;
    let temp = [];
    sites.forEach((site) => {
      temp.push({
        value: site.id,
        label: site.name,
      });
    });

    setOptions(temp);
  }, []);

  //get level
  const getLevel = useCallback(async () => {
    const response = await propertyManagementApi.getLevel(id);

    if (response.status === 200) {
      reset({
        site_id: response.data.data.site_id,
        name: response.data.data.name,
        description: response.data.data.description,
      });
    }
  }, [id, reset]);

  //use effect
  useEffect(() => {
    getSites();

    if (!add) {
      getLevel();
    }
  }, [getSites, getLevel, add]);

  return (
    <React.Fragment>
      <Helmet title="Create level" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">{add ? "Create" : "Update"} level</h1>
        <Card>
          <Card.Body>
            <Row>
              <Form className="col-md-6 col-sm-12 mb-2">
                <Form.Label>Site</Form.Label>
                <Controller
                  control={control}
                  name="site_id"
                  defaultValue=""
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <Select
                      inputRef={ref}
                      classNamePrefix="react-select"
                      options={options}
                      onBlur={onBlur}
                      className={
                        "react-select-container" + errors.sector && "is-invalid"
                      }
                      onChange={(val) => onChange(val.value)}
                      value={options.filter((c) => value.includes(c.value))}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="site_id"
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
                  onClick={() => navigate("/property-management/levels")}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={
                    add ? handleSubmit(createLevel) : handleSubmit(updateLevel)
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

export default AddEditLevel;
