import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Search, Edit2 } from "react-feather";
import { useNavigate, useLocation } from "react-router-dom";
import * as propertyManagementApi from "@api/propertyManagementApi";
import * as assetManagementApi from "@api/assetManagementApi";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { ErrorMessage } from "@hookform/error-message";
import DynamicTable from "@components/ui/DynamicTable";

const Assets = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sectors, setSectors] = useState([]);
  const [sites, setSites] = useState([]);
  const [levels, setLevels] = useState([]);
  const [areas, setAreas] = useState([]);
  const [assets, setAssets] = useState([]);
  const [filter, setFilter] = useState();
  const tableColumns = [
    {
      Header: "Actions",
      accessor: "actions",
      Cell: (cell) => (
        <div>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Edit asset</Tooltip>}
          >
            <Edit2
              className="align-middle me-1"
              size={18}
              onClick={() =>
                navigate(location.pathname + "/" + cell.row.original.id)
              }
            />
          </OverlayTrigger>
        </div>
      ),
    },
    {
      Header: "Sector",
      accessor: "sector.name",
    },
    {
      Header: "Site",
      accessor: "site.name",
    },
    {
      Header: "Level",
      accessor: "level.name",
    },
    {
      Header: "Area",
      accessor: "area.name",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Asset code",
      accessor: "code",
    },
    {
      Header: "Asset type",
      accessor: "type.name",
    },
    {
      Header: "Serial no",
      accessor: "serial_no",
    },
    {
      Header: "Brand",
      accessor: "details.brand",
    },
    {
      Header: "Model",
      accessor: "details.model",
    },
    {
      Header: "Description",
      accessor: "details.description",
    },
    {
      Header: "Condition",
      accessor: "condition.name",
    },
  ];
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  //watch specified inputs
  watch(["sector", "site", "level", "area"]);

  //handle filter
  const handleFilter = useCallback(async () => {
    let sector = watch("sector", "value");
    let site = watch("site", "value");
    let level = watch("level", "value");
    let area = watch("area", "value");

    setFilter({
      sector: sector.value,
      site: site.value,
      level: level.value,
      area: area.value,
    });
  }, []);

  //call get area
  const getAreas = useCallback(async (e) => {
    const result = await propertyManagementApi.getAreas();
    let finalAreas = [];
    result.data.data
      .filter((area) => area.level_id === e.value)
      .forEach((area) => {
        finalAreas.push({
          label: area.name,
          value: area.id,
        });
      });
    setAreas(finalAreas);
  }, []);

  //call get levels
  const getLevels = useCallback(async (e) => {
    const result = await propertyManagementApi.getLevels();
    let finalLevels = [];
    result.data.data
      .filter((level) => level.site_id === e.value)
      .forEach((level) => {
        finalLevels.push({
          label: level.name,
          value: level.id,
        });
      });
    setLevels(finalLevels);
  }, []);

  //call get sites
  const getSites = useCallback(async (e) => {
    const result = await propertyManagementApi.getSites();
    let finalSites = [];
    result.data.data
      .filter((site) => site.sector_id === e.value)
      .forEach((site) => {
        finalSites.push({
          label: site.name,
          value: site.id,
        });
      });
    setSites(finalSites);
  }, []);

  //call get sector
  const getSectors = useCallback(async () => {
    //get sectors
    const sectors = await propertyManagementApi.getSectors();
    let finalSectors = [];

    sectors.data.data.forEach((sector) => {
      finalSectors.push({
        value: sector.id,
        label: sector.name,
      });
    });
    setSectors(finalSectors);
  }, []);

  //call get assets
  const getAssets = useCallback(async () => {
    const response = await assetManagementApi.getAssets({ search: filter });
    setAssets(response.data.data);
  }, [filter]);

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

  useEffect(() => {
    getAssets();
    getSectors();
  }, [getAssets, getSectors]);

  return (
    <React.Fragment>
      <Helmet title="Assets" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Assets</h1>
        <Card>
          <Card.Body>
            <Row>
              <Col md={2}>
                <Form.Label>Sector</Form.Label>
                <Controller
                  control={control}
                  name="sector"
                  defaultValue=""
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <Select
                      value={value}
                      classNamePrefix="react-select"
                      onBlur={onBlur}
                      className={
                        "react-select-container" + errors.sector && "is-invalid"
                      }
                      onChange={onChange}
                      options={sectors}
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
              </Col>
              <Col md={3}>
                <Form.Label>Site</Form.Label>
                <Controller
                  control={control}
                  name="site"
                  defaultValue=""
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <Select
                      value={value}
                      classNamePrefix="react-select"
                      onBlur={onBlur}
                      className={
                        "react-select-container" + errors.sector && "is-invalid"
                      }
                      options={sites}
                      onChange={onChange}
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
              </Col>
              <Col md={3}>
                <Form.Label>Level</Form.Label>
                <Controller
                  control={control}
                  name="level"
                  defaultValue=""
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <Select
                      classNamePrefix="react-select"
                      onBlur={onBlur}
                      className={
                        "react-select-container" + errors.level && "is-invalid"
                      }
                      onChange={onChange}
                      options={levels}
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
              </Col>
              <Col md={2}>
                <Form.Label>Area</Form.Label>
                <Controller
                  control={control}
                  name="area"
                  defaultValue=""
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <Select
                      classNamePrefix="react-select"
                      onBlur={onBlur}
                      className={
                        "react-select-container" + errors.area && "is-invalid"
                      }
                      onChange={onChange}
                      options={areas}
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
              </Col>
              <Col md={2}>
                <Button
                  variant="primary"
                  className="me-1 mb-1"
                  style={{ marginTop: "30px", width: "100%" }}
                  onClick={handleFilter}
                >
                  <Search className="align-middle me-1" size={16} />
                  Search
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Row>
              <DynamicTable data={assets} columns={tableColumns} />
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Assets;
