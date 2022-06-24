import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import DynamicTableNoPagination from "components/ui/DynamicTableNoPagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as preventiveMaintenanceApi from "@api/preventiveMaintenanceApi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const JointInspectionAdd = () => {
  const navigate = useNavigate();
  const { action } = useParams();
  //
  // States
  //
  const [tableData, setTableData] = useState([]);
  const [dynamicTableColumn, setDynamicTableColumn] = useState([]);
  const schema = yup.object().shape({
    technical_officer: yup.string().required("This field is required"),
  });
  const {
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  //
  // Functions
  //

  const generateDynamicColumns = useCallback((response) => {
    let tableColumns = [
      {
        Header: "S/N",
      },
      {
        Header: "Checklist sub item",
        accessor: "checklist_subitem.name",
      },
      {
        Header: "Frequency",
        accessor: "checklist_subitem.frequency",
      },
    ];

    response.checklist_item?.columns &&
      JSON.parse(response.checklist_item?.columns).forEach((element) => {
        return tableColumns.push({
          Header: element.column,
          Cell: ({ row }) => {
            const [isChecked, setIsChecked] = useState(
              row.original.inspection[element.column]
            );
            const handleOnChange = () => {
              setIsChecked(!isChecked);
            };

            return (
              <Controller
                control={control}
                defaultValue=""
                name={`pm_submitted_checklist_subitems.${element.column}`}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Form.Check
                      type="checkbox"
                      onChange={handleOnChange}
                      value={value}
                      checked={isChecked}
                    />
                  );
                }}
              />
            );
          },
        });
      });

    setDynamicTableColumn(tableColumns);
  }, []);

  const getJointInspection = useCallback(async () => {
    const response = await preventiveMaintenanceApi.getPendingChecklist(action);

    if (response.status === 200) {
      reset({
        inspection_date: new Date(response.data.data?.inspection_date),
        technician: response.data.data?.technician,
      });
      setTableData(response.data.data.pm_submitted_checklist_subitem);
      generateDynamicColumns(response.data.data);
    }
  }, [generateDynamicColumns, action, reset]);

  //
  // UseEffects
  //

  useEffect(() => {
    getJointInspection();
  }, [getJointInspection]);

  return (
    <>
      <React.Fragment>
        <Helmet title="Settings" />
        <h1 className="h3 mb-3">Joint inspection edit</h1>
        <Card className="p-0">
          <Card.Header className="pb-0">
            <h5>External CCTV</h5>
            <Row>
              <Col md={3}>
                <Form.Label>Location</Form.Label>
                <p>Marsiling Mall Hawker Centre</p>
              </Col>
              <Col md={3}>
                <Form.Label>FG inspection date</Form.Label>
                <Controller
                  control={control}
                  name="inspection_date"
                  render={({ field: { value, onChange, onBlur } }) => (
                    <DatePicker
                      dateFormat="MM/dd/yyyy"
                      selected={value}
                      onChange={onChange}
                      className="form-control"
                      placeholderText="Checklist month / year"
                    />
                  )}
                />
              </Col>
              <Col md={3}>
                <Form.Label>Joint inspection date</Form.Label>
                <Controller
                  control={control}
                  defaultValue=""
                  name="frequency"
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      // selected={value}
                      // onChange={onChange}
                      className="form-control"
                      placeholderText="Checklist month / year"
                    />
                  )}
                />{" "}
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            {tableData && dynamicTableColumn && (
              <DynamicTableNoPagination
                columns={dynamicTableColumn}
                data={tableData}
              />
            )}
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <h5>Feedback</h5>
            <Row className="mb-2">
              <Col md={12}>
                <Form.Label>Remarks</Form.Label>
                <Controller
                  control={control}
                  defaultValue=""
                  name="remarks"
                  render={({ field: { onChange, value } }) => (
                    <Form.Control
                      className={errors.remarks}
                      // onChange={onChange}
                      as="textarea"
                      value={value}
                      rows={6}
                    />
                  )}
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md={6}>
                <Form.Label>Supervisor / technician</Form.Label>
                <Controller
                  control={control}
                  defaultValue=""
                  name="technician"
                  render={({ field: { onChange, value } }) => (
                    <Form.Control
                      className={errors.technician}
                      readOnly={true}
                      type="text"
                      value={value}
                    />
                  )}
                />
              </Col>
              <Col md={6}>
                <Form.Label>Technical officer</Form.Label>
                <Controller
                  control={control}
                  defaultValue=""
                  name="technical_officer"
                  render={({ field: { onChange, value } }) => (
                    <Form.Control
                      className={errors.technical_officer}
                      type="text"
                      value={value}
                    />
                  )}
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Label>Supervisor / technician signature</Form.Label>
              </Col>
              <Col md={6}>
                <Form.Label>Technical officer signature</Form.Label>
              </Col>
            </Row>
            <Row className="pt-4">
              <Col className="text-end">
                <Button
                  className="me-2"
                  variant="secondary"
                  onClick={() =>
                    navigate("/preventive-maintenance/joint-inspection")
                  }
                >
                  Cancel
                </Button>
                <Button className="me-2" variant="primary">
                  Save
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </React.Fragment>
    </>
  );
};
