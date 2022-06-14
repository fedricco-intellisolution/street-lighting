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
import * as assetManagementApi from "@api/assetManagementApi";
import NotyfContext from "../../contexts/NotyfContext";
import * as lookUpApi from "@api/lookUpApi";

const EditAsset = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const schema = yup.object().shape({
    sector: yup.string().required("This field is required"),
    site: yup.string().required("This field is required"),
    name: yup.string().required("This field is required"),
    asset_code: yup.string().required("This field is required"),
    asset_type: yup.string().required("This field is required"),
    condition: yup.string().required("This field is required"),
  });
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const [sectors, setSectors] = useState([]);
  const [sites, setSites] = useState([]);
  const [rawSites, setRawSites] = useState([]);
  const [rawLevels, setRawLevels] = useState([]);
  const [rawAreas, setRawAreas] = useState([]);
  const [levels, setLevels] = useState([]);
  const [areas, setAreas] = useState([]);
  const [types, setTypes] = useState([]);
  const [conditions, setConditions] = useState([]);
  const notyf = useContext(NotyfContext);

  //update asset
  const updateAsset = useCallback(async (data) => {
    try {
      const response = await assetManagementApi.updateAsset(id, data);
      if (response.status === 200) {
        notyf.open({
          type: "success",
          message: response.data.message,
        });
        navigate("/assets-management/assets");
      }
    } catch (error) {
      throw new Error();
    }
  }, []);

  //get asset
  const getAsset = useCallback(async () => {
    const response = await assetManagementApi.getAsset(id);
    const asset = response.data.data;

    reset({
      sector: asset.sector_id,
      site: asset.site_id,
      level: asset.level_id,
      area: asset.area_id,
      name: asset.name,
      asset_code: asset.code,
      asset_type: asset.type?.code,
      serial_no: asset.serial_no,
      condition: asset.condition?.code,
      brand: asset.details?.brand,
      model: asset.details?.model,
      description: asset.details?.description,
    });
  }, [id, reset]);

  //get sectors
  const getSectors = useCallback(async () => {
    const response = await propertyManagementApi.getSectors();
    let sectors = [];

    response.data.data.forEach((sector) => {
      sectors.push({
        value: sector.id,
        label: sector.name,
      });
    });

    setSectors(sectors);
  }, []);

  //get sites
  const getSites = useCallback(async () => {
    const response = await propertyManagementApi.getSites();
    const data = response.data.data;
    setRawSites(data);
  }, []);

  //get levels
  const getLevels = useCallback(async () => {
    const response = await propertyManagementApi.getLevels();
    const data = response.data.data;
    setRawLevels(data);
  }, []);

  //get areas
  const getAreas = useCallback(async () => {
    const response = await propertyManagementApi.getAreas();
    const data = response.data.data;
    setRawAreas(data);
  }, []);

  //use effect
  useEffect(() => {
    if (rawSites) {
      const sites = rawSites.filter(
        (site) => site.sector_id === watch("sector")
      );
      let finalSites = [];
      sites.forEach((site) => {
        finalSites.push({
          value: site.id,
          label: site.name,
        });
      });
      setSites(finalSites);
    }
  }, [rawSites, watch("sector")]);

  //use effect
  useEffect(() => {
    if (rawLevels) {
      const levels = rawLevels.filter(
        (level) => level.site_id === watch("site")
      );
      let finalLevels = [];
      levels.forEach((site) => {
        finalLevels.push({
          value: site.id,
          label: site.name,
        });
      });
      setLevels(finalLevels);
    }
  }, [rawLevels, watch("site")]);

  //use effect
  useEffect(() => {
    if (rawAreas) {
      const areas = rawAreas.filter((area) => area.level_id === watch("level"));
      let finalAreas = [];
      areas.forEach((area) => {
        finalAreas.push({
          value: area.id,
          label: area.name,
        });
      });
      setAreas(finalAreas);
    }
  }, [rawAreas, watch("level")]);

  //reset dropdown
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change" && name === "sector") {
        setValue("site", "");
        setValue("level", "");
        setValue("area", "");
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  //get types
  const getTypes = useCallback(async () => {
    const response = await lookUpApi.getLookUp({
      search: { category: "ASSET_TYPE" },
    });
    let finalTypes = [];

    response.data.data.forEach((type) => {
      finalTypes.push({
        value: type.code,
        label: type.name,
      });
    });

    setTypes(finalTypes);
  }, []);

  //get conditions
  const getConditions = useCallback(async () => {
    const response = await lookUpApi.getLookUp({
      search: { category: "ASSET_CONDITION" },
    });
    let conditions = [];

    response.data.data.forEach((condition) => {
      conditions.push({
        value: condition.code,
        label: condition.name,
      });
    });

    setConditions(conditions);
  }, []);

  //use effect
  useEffect(() => {
    getAsset();
    getSectors();
    getSites();
    getLevels();
    getAreas();
    getTypes();
    getConditions();
  }, []);

  return (
    <React.Fragment>
      <Helmet title="Update asset" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Update asset</h1>
        <Card>
          <Card.Body>
            <Row>
              <h5>Property details</h5>
              <Form className="col-md-3 col-sm-12 mb-2">
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
                        "react-select-container" + errors.sector && "is-invalid"
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
              <Form className="col-md-3 col-sm-12 mb-2">
                <Form.Label>Site</Form.Label>
                <Controller
                  control={control}
                  name="site"
                  defaultValue=""
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <Select
                      classNamePrefix="react-select"
                      options={sites}
                      onBlur={onBlur}
                      className={
                        "react-select-container" + errors.site && "is-invalid"
                      }
                      onChange={(val) => onChange(val.value)}
                      value={sites.filter((c) => value.includes(c.value))}
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
              <Form className="col-md-3 col-sm-12 mb-2">
                <Form.Label>Level</Form.Label>
                <Controller
                  control={control}
                  name="level"
                  defaultValue=""
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <Select
                      classNamePrefix="react-select"
                      options={levels}
                      onBlur={onBlur}
                      className={
                        "react-select-container" + errors.level && "is-invalid"
                      }
                      onChange={(val) => onChange(val.value)}
                      value={
                        value
                          ? levels.filter((c) => value.includes(c.value))
                          : null
                      }
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
              <Form className="col-md-3 col-sm-12 mb-2">
                <Form.Label>Area</Form.Label>
                <Controller
                  control={control}
                  name="area"
                  defaultValue=""
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <Select
                      classNamePrefix="react-select"
                      options={areas}
                      onBlur={onBlur}
                      className={
                        "react-select-container" + errors.area && "is-invalid"
                      }
                      onChange={(val) => onChange(val.value)}
                      value={
                        value
                          ? areas.filter((c) => value.includes(c.value))
                          : null
                      }
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
            </Row>
            <hr />
            <Row>
              <h5>Asset details</h5>
              <Form className="col-md-6 col-sm-12 mb-2">
                <Form.Label>Asset name</Form.Label>
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
            </Row>
            <Row>
              <Form className="col-md-6 col-sm-12 mb-2">
                <Form.Label>Asset type</Form.Label>
                <Controller
                  control={control}
                  name="asset_type"
                  defaultValue=""
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <Select
                      classNamePrefix="react-select"
                      options={types}
                      onBlur={onBlur}
                      className={
                        "react-select-container" + errors.asset_type &&
                        "is-invalid"
                      }
                      onChange={(val) => onChange(val.value)}
                      value={types.filter((c) => value.includes(c.value))}
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
              <Form className="col-md-6 col-sm-12 mb-2">
                <Form.Label>Serial no</Form.Label>
                <Controller
                  control={control}
                  name="serial_no"
                  defaultValue=""
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Form.Control
                      type="text"
                      value={value ?? ""}
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
            </Row>
            <hr />
            <Row>
              <h5>Other details</h5>
              <Form className="col-md-4 col-sm-12 mb-2">
                <Form.Label>Brand</Form.Label>
                <Controller
                  control={control}
                  name="brand"
                  defaultValue=""
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Form.Control
                      type="text"
                      value={value ?? ""}
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
              <Form className="col-md-4 col-sm-12 mb-2">
                <Form.Label>Model</Form.Label>
                <Controller
                  control={control}
                  name="model"
                  defaultValue=""
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Form.Control
                      type="text"
                      value={value ?? ""}
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
              <Form className="col-md-4 col-sm-12 mb-2">
                <Form.Label>condition</Form.Label>
                <Controller
                  control={control}
                  name="condition"
                  defaultValue=""
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <Select
                      classNamePrefix="react-select"
                      options={conditions}
                      onBlur={onBlur}
                      className={
                        "react-select-container" + errors.condition &&
                        "is-invalid"
                      }
                      onChange={(val) => onChange(val.value)}
                      value={conditions.filter((c) => value.includes(c.value))}
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
                  onClick={() => navigate("/assets-management/assets")}
                >
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit(updateAsset)}>
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

export default EditAsset;
