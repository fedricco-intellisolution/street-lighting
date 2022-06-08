import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Edit2 } from "react-feather";
import { Container, Row, Button, Col } from "react-bootstrap";
import { Card, Form } from "react-bootstrap";
import Select from "react-select";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import * as propertyManagementApi from "@api/propertyManagementApi";
import NotyfContext from "@contexts/NotyfContext";
import DynamicTable from "@components/ui/DynamicTable";
import { useLocation } from "react-router-dom";

const CreateAsset = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const add = id === "add" ? true : false;
  const [sectors, setSectors] = useState([]);
  const [generateQRCode, setGenerateQRCode] = useState();
  const tableColumns = [
    {
      Header: "Actions",
      accessor: "actions",
      Cell: (cell) => (
        <Edit2
          className="align-middle me-1"
          size={18}
          onClick={() =>
            navigate(location.pathname + "/" + cell.row.original.id)
          }
        />
      ),
    },
    {
      Header: "Sector",
      accessor: "",
    },
    {
      Header: "Site",
      accessor: "",
    },
    {
      Header: "Level",
      accessor: "",
    },
    {
      Header: "Name",
      accessor: "",
    },
    {
      Header: "Asset code",
      accessor: "",
    },
    {
      Header: "Asset type",
      accessor: "",
    },
    {
      Header: "Serial no",
      accessor: "",
    },
    {
      Header: "Brand",
      accessor: "",
    },
    {
      Header: "Model",
      accessor: "",
    },
    {
      Header: "Description",
      accessor: "",
    },
    {
      Header: "Condition",
      accessor: "",
    },
  ];
  const schema = yup.object().shape({
    sector: yup.string().required("This field is required"),
    site: yup.string().required("This field is required"),
    asset_name: yup.string().required("This field is required"),
    asset_code: yup.string().required("This field is required"),
    asset_type: yup.string().required("This field is required"),
    condition: yup.string().required("This field is required"),
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

  //create asset
  const createAsset = async (data) => {
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

    setSectors(temp);
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
      <Helmet title="Create asset" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Create asset</h1>
        <Row>
          <Card className="col-md-4 col-sm-12">
            <Card.Body>
              <Row>
                <Form className="col-md-12 col-sm-12 mb-2">
                  <Form.Label>Sector</Form.Label>
                  <Controller
                    control={control}
                    name="sector"
                    defaultValue=""
                    render={({ field: { value, onChange, onBlur, ref } }) => (
                      <Select
                        classNamePrefix="react-select"
                        options={sectors}
                        onBlur={onBlur}
                        className={
                          "react-select-container" + errors.sector &&
                          "is-invalid"
                        }
                        onChange={(val) => onChange(val.value)}
                        value={sectors.filter((c) => value.includes(c.value))}
                      />
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="sector"
                    render={({ message }) => (
                      <small className="text-danger">{message}</small>
                    )}
                  />
                </Form>
                <Form className="col-md-12 col-sm-12 mb-2">
                  <Form.Label>Site</Form.Label>
                  <Controller
                    control={control}
                    name="site"
                    defaultValue=""
                    render={({ field: { value, onChange, onBlur, ref } }) => (
                      <Select
                        classNamePrefix="react-select"
                        options={[]}
                        onBlur={onBlur}
                        className={
                          "react-select-container" + errors.site && "is-invalid"
                        }
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="site"
                    render={({ message }) => (
                      <small className="text-danger">{message}</small>
                    )}
                  />
                </Form>
                <Form className="col-md-12 col-sm-12 mb-2">
                  <Form.Label>Level</Form.Label>
                  <Controller
                    control={control}
                    name="level"
                    defaultValue=""
                    render={({ field: { value, onChange, onBlur, ref } }) => (
                      <Select
                        classNamePrefix="react-select"
                        options={[]}
                        onBlur={onBlur}
                        className={
                          "react-select-container" + errors.level &&
                          "is-invalid"
                        }
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="level"
                    render={({ message }) => (
                      <small className="text-danger">{message}</small>
                    )}
                  />
                </Form>
                <Form className="col-md-12 col-sm-12 mb-2">
                  <Form.Label>Area</Form.Label>
                  <Controller
                    control={control}
                    name="area"
                    defaultValue=""
                    render={({ field: { value, onChange, onBlur, ref } }) => (
                      <Select
                        classNamePrefix="react-select"
                        options={[]}
                        onBlur={onBlur}
                        className={
                          "react-select-container" + errors.site && "is-invalid"
                        }
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="area"
                    render={({ message }) => (
                      <small className="text-danger">{message}</small>
                    )}
                  />
                </Form>
                <Form className="col-md-12 col-sm-12 mb-2">
                  <Form.Label>Asset name</Form.Label>
                  <Controller
                    control={control}
                    name="asset_name"
                    defaultValue=""
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Form.Control
                        type="text"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className={errors.asset_name && "is-invalid"}
                      />
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="asset_name"
                    render={({ message }) => (
                      <small className="text-danger">{message}</small>
                    )}
                  />
                </Form>
                <Form className="col-md-12 col-sm-12 mb-2">
                  <Form.Label>Asset code</Form.Label>
                  <Controller
                    control={control}
                    name="asset_code"
                    defaultValue=""
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Form.Control
                        type="text"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className={errors.asset_code && "is-invalid"}
                      />
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="asset_code"
                    render={({ message }) => (
                      <small className="text-danger">{message}</small>
                    )}
                  />
                </Form>
                <Form className="col-md-12 col-sm-12 mb-2">
                  <Form.Label>Asset type</Form.Label>
                  <Controller
                    control={control}
                    name="asset_type"
                    defaultValue=""
                    render={({ field: { value, onChange, onBlur, ref } }) => (
                      <Select
                        inputRef={ref}
                        classNamePrefix="react-select"
                        options={[]}
                        onBlur={onBlur}
                        className={
                          "react-select-container" + errors.asset_type &&
                          "is-invalid"
                        }
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="asset_type"
                    render={({ message }) => (
                      <small className="text-danger">{message}</small>
                    )}
                  />
                </Form>
                <Form className="col-md-12 col-sm-12 mb-2">
                  <Form.Label>Serial no</Form.Label>
                  <Controller
                    control={control}
                    name="serial_no"
                    defaultValue=""
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Form.Control
                        type="text"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className={errors.serial_no && "is-invalid"}
                      />
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="serial_no"
                    render={({ message }) => (
                      <small className="text-danger">{message}</small>
                    )}
                  />
                </Form>
                <Form className="col-md-12 col-sm-12 mb-2">
                  <Form.Label>Brand</Form.Label>
                  <Controller
                    control={control}
                    name="brand"
                    defaultValue=""
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Form.Control
                        type="text"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className={errors.brand && "is-invalid"}
                      />
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="brand"
                    render={({ message }) => (
                      <small className="text-danger">{message}</small>
                    )}
                  />
                </Form>
                <Form className="col-md-12 col-sm-12 mb-2">
                  <Form.Label>Model</Form.Label>
                  <Controller
                    control={control}
                    name="model"
                    defaultValue=""
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Form.Control
                        type="text"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className={errors.model && "is-invalid"}
                      />
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="model"
                    render={({ message }) => (
                      <small className="text-danger">{message}</small>
                    )}
                  />
                </Form>
                <Form className="col-md-12 col-sm-12 mb-2">
                  <Form.Label>Condition</Form.Label>
                  <Controller
                    control={control}
                    name="condition"
                    defaultValue=""
                    render={({ field: { value, onChange, onBlur, ref } }) => (
                      <Select
                        classNamePrefix="react-select"
                        options={[]}
                        onBlur={onBlur}
                        className={
                          "react-select-container" + errors.condition &&
                          "is-invalid"
                        }
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="condition"
                    render={({ message }) => (
                      <small className="text-danger">{message}</small>
                    )}
                  />
                </Form>
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
                    onClick={() => navigate("/assets-management/assets")}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={
                      add ? handleSubmit(createAsset) : handleSubmit(updateSite)
                    }
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="col-md-8 col-sm-12">
            <Card.Body>
              <Row>
                <DynamicTable data={[]} columns={tableColumns} />
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default CreateAsset;
