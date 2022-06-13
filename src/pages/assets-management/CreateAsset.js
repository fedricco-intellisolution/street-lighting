import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Trash, Plus } from "react-feather";
import { Container, Row, Button, Col, Card, Form } from "react-bootstrap";
import Select from "react-select";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import * as propertyManagementApi from "@api/propertyManagementApi";
import * as assetManagementApi from "@api/assetManagementApi";
import NotyfContext from "@contexts/NotyfContext";
import DynamicTable from "@components/ui/DynamicTable";
import * as lookUpApi from "@api/lookUpApi";

const CreateAsset = () => {
  const navigate = useNavigate();
  const [sectors, setSectors] = useState([]);
  const [sites, setSites] = useState([]);
  const [levels, setLevels] = useState([]);
  const [areas, setAreas] = useState([]);
  const [types, setTypes] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [assets, setAssets] = useState([]);
  const [assetDetails, setAssetDetails] = useState({
    sector_name: "",
    site_name: "",
    type_name: "",
    condition_name: "",
  });
  const tableColumns = [
    {
      Header: "Actions",
      accessor: "actions",
      Cell: (cell) => (
        <Trash
          className="align-middle me-1"
          size={18}
          onClick={() => {
            const new_sites = [...assets];
            new_sites.splice(cell.row.id, 1);
            setAssets(new_sites);
          }}
        />
      ),
    },
    {
      Header: "Sector",
      accessor: "sector_name",
    },
    {
      Header: "Site",
      accessor: "site_name",
    },
    {
      Header: "Level",
      accessor: "level_name",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Asset code",
      accessor: "asset_code",
    },
    {
      Header: "Asset type",
      accessor: "type_name",
    },
    {
      Header: "Serial no",
      accessor: "serial_no",
    },
    {
      Header: "Brand",
      accessor: "brand",
    },
    {
      Header: "Model",
      accessor: "model",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Condition",
      accessor: "condition_name",
    },
  ];
  const schema = yup.object().shape({
    sector: yup.string().required("This field is required"),
    site: yup.string().required("This field is required"),
    name: yup.string().required("This field is required"),
    asset_code: yup.string().required("This field is required"),
    asset_type: yup.string().required("This field is required"),
    condition: yup.string().required("This field is required"),
  });
  const notyf = useContext(NotyfContext);
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  //watch specified inputs
  watch(["sector", "site", "level"]);

  //create asset
  const createAsset = useCallback(async () => {
    try {
      const response = await assetManagementApi.createAsset(assets);
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
  }, [assets]);

  //add to list
  const addToList = useCallback(
    async (data) => {
      data.sector_name = assetDetails.sector_name;
      data.site_name = assetDetails.site_name;
      data.level_name = assetDetails.level_name;
      data.type_name = assetDetails.type_name;
      data.condition_name = assetDetails.condition_name;

      setAssets((prevState) => [...prevState, data]);
    },
    [assetDetails]
  );

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

  //get sites
  const getSites = useCallback(async (e) => {
    const response = await propertyManagementApi.getSites();
    let finalSites = [];

    response.data.data
      .filter((site) => site.sector_id === e)
      .forEach((site) => {
        finalSites.push({
          label: site.name,
          value: site.id,
        });
      });

    setSites(finalSites);
  }, []);

  //get levels
  const getLevels = useCallback(async (e) => {
    const response = await propertyManagementApi.getLevels();
    let finalLevels = [];

    response.data.data
      .filter((level) => level.site_id === e)
      .forEach((level) => {
        finalLevels.push({
          label: level.name,
          value: level.id,
        });
      });

    setLevels(finalLevels);
  }, []);

  //get areas
  const getAreas = useCallback(async (e) => {
    const response = await propertyManagementApi.getAreas();
    let finalAreas = [];

    response.data.data
      .filter((area) => area.level_id === e)
      .forEach((area) => {
        finalAreas.push({
          label: area.name,
          value: area.id,
        });
      });

    setAreas(finalAreas);
  }, []);

  //get types
  const getTypes = useCallback(async () => {
    const response = await lookUpApi.getLookUp({
      search: { category: "ASSET_TYPE" },
    });
    const data = response.data.data;
    const options = [];
    data.forEach((item) => {
      options.push({
        label: item.name,
        value: item.code,
      });
    });
    setTypes(options);
  }, []);

  const getConditions = useCallback(async () => {
    const response = await lookUpApi.getLookUp({
      search: { category: "ASSET_CONDITION" },
    });
    const data = response.data.data;
    const options = [];
    data.forEach((item) => {
      options.push({
        label: item.name,
        value: item.code,
      });
    });
    setConditions(options);
  }, []);

  //use effect
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      switch (name) {
        case "sector":
          setValue("site", "");
          setValue("level", "");
          setValue("area", "");
          getSites(value.sector);
          break;
        case "site":
          getLevels(value.site);
          break;
        case "level":
          getAreas(value.level);
          break;
        default:
          break;
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  //use effect
  useEffect(() => {
    getSectors();
    getTypes();
    getConditions();
  }, []);

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
                        onChange={(val) => {
                          onChange(val.value);
                          setAssetDetails((prevState) => ({
                            ...prevState,
                            sector_name: val.label,
                          }));
                        }}
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
                        options={sites}
                        onBlur={onBlur}
                        className={
                          "react-select-container" + errors.site && "is-invalid"
                        }
                        onChange={(e) => {
                          onChange(e.value);
                          setAssetDetails((prevState) => ({
                            ...prevState,
                            site_name: e.label,
                          }));
                        }}
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
                <Form className="col-md-12 col-sm-12 mb-2">
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
                          "react-select-container" + errors.level &&
                          "is-invalid"
                        }
                        onChange={(e) => {
                          onChange(e.value);
                          setAssetDetails((prevState) => ({
                            ...prevState,
                            level_name: e.label,
                          }));
                        }}
                        value={levels.filter((c) => value.includes(c.value))}
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
                        options={areas}
                        onBlur={onBlur}
                        className={
                          "react-select-container" + errors.area && "is-invalid"
                        }
                        onChange={(e) => onChange(e.value)}
                        value={areas.filter((c) => value.includes(c.value))}
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
                        classNamePrefix="react-select"
                        options={types}
                        onBlur={onBlur}
                        className={
                          "react-select-container" + errors.asset_type &&
                          "is-invalid"
                        }
                        onChange={(val) => {
                          onChange(val.value);
                          setAssetDetails((prevState) => ({
                            ...prevState,
                            type_name: val.label,
                          }));
                        }}
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
                        options={conditions}
                        onBlur={onBlur}
                        className={
                          "react-select-container" + errors.condition &&
                          "is-invalid"
                        }
                        onChange={(val) => {
                          onChange(val.value);
                          setAssetDetails((prevState) => ({
                            ...prevState,
                            condition_name: val.label,
                          }));
                        }}
                        value={conditions.filter((c) =>
                          value.includes(c.value)
                        )}
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
                  <Button variant="primary" onClick={handleSubmit(addToList)}>
                    <Plus className="align-middle me-1" size={16} />
                    Add to list
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="col-md-8 col-sm-12">
            <Card.Body>
              <Row>
                <DynamicTable data={assets} columns={tableColumns} />
              </Row>
              <Row>
                <Col className="text-end">
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={() => navigate("/assets-management/assets")}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSubmit(createAsset)}>
                    Submit
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default CreateAsset;
