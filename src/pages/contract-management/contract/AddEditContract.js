import React, { useCallback, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Container, Row, Button, Col } from "react-bootstrap";
import { Card, Form } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import * as contractManagementApi from "@api/contractManagementApi";
import NotyfContext from "../../../contexts/NotyfContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEditContract = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const add = id === "add" ? true : false;
  const schema = yup.object().shape({
    name: yup.string().required("This field is required"),
    contract_no: yup.string().required("This field is required"),
    start_date: yup.date().required("This field is required"),
    end_date: yup.date().required("This field is required"),
    description: yup.string().required("This field is required"),
  });
  const notyf = useContext(NotyfContext);
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  //create contract
  const createContract = async (data) => {
    data.start_date = new Date(data.start_date).toLocaleDateString("en-CA");
    data.end_date = new Date(data.end_date).toLocaleDateString("en-CA");

    try {
      const response = await contractManagementApi.createContract(data);
      if (response.status === 200) {
        notyf.open({
          type: "success",
          message: response.data.message,
        });
        navigate("/contract-management/contracts");
      }
    } catch (error) {
      throw new Error();
    }
  };

  //update contract
  const updateContract = async (data) => {
    data.start_date = new Date(data.start_date).toLocaleDateString("en-CA");
    data.end_date = new Date(data.end_date).toLocaleDateString("en-CA");

    try {
      const response = await contractManagementApi.updateContract(id, data);
      if (response.status === 200) {
        notyf.open({
          type: "success",
          message: response.data.message,
        });
        navigate("/contract-management/contracts");
      }
    } catch (error) {
      throw new Error();
    }
  };

  //get contract
  const getContract = useCallback(async () => {
    const response = await contractManagementApi.getContract(id);
    reset({
      name: response.data.data.name,
      contract_no: response.data.data.contract_no,
      description: response.data.data.description,
      start_date: new Date(response.data.data.start_date),
      end_date: new Date(response.data.data.end_date),
    });
  }, [id, reset]);

  //use effect
  useEffect(() => {
    if (!add) {
      getContract();
    }
  }, [getContract, add]);

  return (
    <React.Fragment>
      <Helmet title={add ? "Create contract" : "Update contract"} />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">{add ? "Create" : "Update"} contract</h1>
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
                <Form.Label>Contract no</Form.Label>
                <Controller
                  control={control}
                  name="contract_no"
                  defaultValue=""
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Form.Control
                      type="text"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      className={errors.contract_no && "is-invalid"}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="contract_no"
                  render={({ message }) => (
                    <small className="text-danger">{message}</small>
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
                  render={({ field: { value, onChange, onBlur } }) => (
                    <DatePicker
                      dateFormat="yyyy-MM-dd"
                      selected={value}
                      onChange={onChange}
                      className={`form-control ${
                        errors.start_date && "is-invalid"
                      }`}
                      value={value}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="start_date"
                  render={({ message }) => (
                    <small className="text-danger">{message}</small>
                  )}
                />
              </Form>
              <Form className="col-md-6 col-sm-12 mb-2">
                <Form.Label>End date</Form.Label>
                <Controller
                  control={control}
                  name="end_date"
                  render={({ field: { value, onChange, onBlur } }) => (
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
                      value={value}
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
                  onClick={() => navigate("/contract-management/contracts")}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={
                    add
                      ? handleSubmit(createContract)
                      : handleSubmit(updateContract)
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

export default AddEditContract;
