import React, { useCallback, useEffect, useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import DynamicTableNoPagination from "components/ui/DynamicTableNoPagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as preventiveMaintenanceApi from "@api/preventiveMaintenanceApi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import NotyfContext from "../../../../contexts/NotyfContext";

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
    joint_inspection_date: yup.string().required("This field is required"),
  });
  const notyf = useContext(NotyfContext);
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  //
  // Functions
  //

  //update joint inspection
  const updateJointInspection = async (data) => {
    data.inspection_date = new Date(data.inspection_date).toLocaleDateString(
      "en-CA"
    );
    data.joint_inspection_date = new Date(
      data.joint_inspection_date
    ).toLocaleDateString("en-CA");
    data.status = "SUBMITTED_CHECKLIST";

    try {
      const response = await preventiveMaintenanceApi.updatePendingChecklist(
        action,
        data
      );
      if (response.data.status === "SUCCESS") {
        notyf.open({
          type: "success",
          message: response.data.message,
        });
        navigate("/preventive-maintenance/joint-inspection");
      }
    } catch (error) {
      notyf.open({
        type: "danger",
        message: "Something went wrong with the server",
      });
    }
  };

  //get dynamic columns
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
            return (
              <Controller
                control={control}
                defaultValue=""
                name={`checklist_subitems.${row.original.id}.${element.column}`}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Form.Check
                      type="checkbox"
                      onChange={onChange}
                      value={value || ""}
                      checked={value || ""}
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

  const formatChecklistItemsResults = (checklistSubItem) => {
    let checklistItemsResult = {};

    checklistSubItem.forEach((element) => {
      checklistItemsResult[element.id] = element.inspection;
    });

    return checklistItemsResult;
  };

  //get joint inspection
  const getJointInspection = useCallback(async () => {
    const response = await preventiveMaintenanceApi.getPendingChecklist(action);

    if (response.status === 200) {
      reset({
        inspection_date: new Date(response.data.data?.inspection_date),
        technician: response.data.data?.technician,
        checklist_subitems: response.data.data?.pm_submitted_checklist_subitem
          ? formatChecklistItemsResults(
              response.data.data?.pm_submitted_checklist_subitem
            )
          : "",
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
                  name="joint_inspection_date"
                  render={({ field: { value, onChange, onBlur } }) => (
                    <DatePicker
                      dateFormat="MM/dd/yyyy"
                      selected={value}
                      onChange={onChange}
                      className={`form-control ${
                        errors.joint_inspection_date && "is-invalid"
                      }`}
                      placeholderText="Checklist month / year"
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="joint_inspection_date"
                  render={({ message }) => (
                    <small className="text-danger">{message}</small>
                  )}
                />
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
                  render={({ field: { onChange } }) => (
                    <Form.Control
                      className={errors.remarks}
                      onChange={onChange}
                      as="textarea"
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
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Form.Control
                      className={errors.technical_officer && "is-invalid"}
                      type="text"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="technical_officer"
                  render={({ message }) => (
                    <small className="text-danger">{message}</small>
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
                <Button
                  className="me-2"
                  variant="primary"
                  onClick={handleSubmit(updateJointInspection)}
                >
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
