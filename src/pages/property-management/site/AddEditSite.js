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

const AddEditSite = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const add = id === "add" ? true : false;
  const [options, setOptions] = useState([]);
  const [generateQRCode, setGenerateQRCode] = useState();
  const schema = yup.object().shape({
    sector_id: yup.string().required("This field is required"),
    name: yup.string().required("This field is required"),
    generate_qr_code: yup.bool(),
    address: yup.string().required("This field is required"),
  });
  const notyf = useContext(NotyfContext);
  // const [sector, setSector] = useState([]);
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

  //create site
  const createSite = async (data) => {
    data.generate_qr_code = generateQRCode;

    try {
      const response = await propertyManagementApi.createSite(data);
      if (response.status === 200) {
        notyf.open({
          type: "success",
          message: response.data.message,
        });
        navigate("/property-management/sites");
      }
    } catch (error) {
      throw new Error();
    }
  };

  //update site
  const updateSite = async (data) => {
    try {
      const response = await propertyManagementApi.updateSite(id, data);
      if (response.status === 200) {
        notyf.open({
          type: "success",
          message: response.data.message,
        });
        navigate("/property-management/sites");
      }
    } catch (error) {
      throw new Error();
    }
  };

  //get sectors
  const getSectors = useCallback(async () => {
    const response = await propertyManagementApi.getSectors();
    const sectors = response.data.data;
    let temp = [];
    sectors.forEach((sector) => {
      temp.push({
        value: sector.id,
        label: sector.name,
      });
    });

    setOptions(temp);
  }, []);

  //get site
  const getSite = useCallback(async () => {
    const response = await propertyManagementApi.getSite(id);
    reset({
      name: response.data.data.name,
      address: response.data.data.address,
      sector_id: response.data.data.sector.id,
    });
    setGenerateQRCode(response.data.data.qr_code_path);
  }, [id, reset]);

  //use effect
  useEffect(() => {
    getSectors();

    if (!add) {
      getSite();
    }
  }, [getSectors, getSite, add]);

  return (
    <React.Fragment>
      <Helmet title="Create site" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">{add ? "Create" : "Update"} site</h1>
        <Card>
          <Card.Body>
            <Row>
              <Form className="col-md-4 col-sm-12 mb-2">
                <Form.Label>Sector</Form.Label>
                <Controller
                  control={control}
                  name="sector_id"
                  defaultValue=""
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <Select
                      inputRef={ref}
                      classNamePrefix="react-select"
                      options={options}
                      // onChange={(e) => {
                      //   setValue("sector_id", e.value);
                      // }}
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
                  name="sector_id"
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
              <Form className="col-md-4 col-sm-4 mb-2">
                <Form.Group style={{ marginTop: "30px" }}>
                  <Controller
                    control={control}
                    name="generate_qr_code"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Form.Check
                        label="Generate QR code"
                        type="checkbox"
                        defaultChecked={generateQRCode}
                        onChange={(e) => setGenerateQRCode(e.target.checked)}
                      />
                    )}
                  />
                </Form.Group>
              </Form>
            </Row>
            <Row>
              <Form>
                <Form.Label>Address</Form.Label>
                <Controller
                  control={control}
                  name="address"
                  defaultValue=""
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Form.Control
                      as="textarea"
                      value={value == null ? "" : value}
                      onChange={onChange}
                      onBlur={onBlur}
                      className={errors.address && "is-invalid"}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="address"
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
                  onClick={() => navigate("/property-management/sites")}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={
                    add ? handleSubmit(createSite) : handleSubmit(updateSite)
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

export default AddEditSite;
