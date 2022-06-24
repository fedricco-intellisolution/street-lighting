import React, { useCallback, useEffect, useState, useContext } from "react";

import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import DynamicTableNoPagination from "components/ui/DynamicTableNoPagination";
import * as preventiveMaintenanceApi from "@api/preventiveMaintenanceApi";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NotyfContext from "contexts/NotyfContext";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";

const schema = yup.object().shape({
  inspection_date: yup.string().required("This field is required"),
  technician: yup.string().required("This field is required"),
});

export const ChecklistPendingCheck = () => {
  const navigate = useNavigate();
  const { action } = useParams();
  const notyf = useContext(NotyfContext);

  //
  // States
  //

  const [pendingChecklist, setPendingChecklist] = useState([]);
  const [dynamicTableColumn, setDynamicTableColumn] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  //
  // Functions
  //

  const generateDynamicColumns = useCallback(
    (response) => {
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
    },
    [control]
  );

  const getPendingChecklist = useCallback(async () => {
    const response = await preventiveMaintenanceApi.getPendingChecklist(action);
    const responseData = response.data.data;

    setPendingChecklist(responseData);
    generateDynamicColumns(responseData);

    responseData &&
      reset({
        inspection_date: responseData.inspection_date
          ? new Date(responseData.inspection_date)
          : "",
        technician: responseData.technician || "",
        remarks: responseData.remarks || "",
        checklist_subitems: responseData.pm_submitted_checklist_subitem
          ? formatChecklistItemsResults(
              responseData.pm_submitted_checklist_subitem
            )
          : "",
      });
  }, [generateDynamicColumns, action, reset]);

  const submitPendingChecklist = async (data) => {
    data.inspection_date = new Date(data.inspection_date).toLocaleDateString(
      "en-CA"
    );
    data.status = "JOINT_INSPECTION";

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
        navigate("/preventive-maintenance/checklist-pending");
      }
    } catch (error) {
      notyf.open({
        type: "danger",
        message: "Something went wrong with the server",
      });
    }
  };

  const formatChecklistItemsResults = (checklistSubItem) => {
    let checklistItemsResult = {};

    checklistSubItem.forEach((element) => {
      checklistItemsResult[element.id] = JSON.parse(element.inspection);
    });

    return checklistItemsResult;
  };

  //
  // UseEffects
  //

  useEffect(() => {
    getPendingChecklist();
  }, [reset, getPendingChecklist]);

  return (
    <>
      <Helmet title="Settings" />
      <h1 className="h3 mb-3">Pending checklist check</h1>
      <Card className="p-0">
        <Card.Header className="pb-0">
          <h4 className="mb-4">
            {pendingChecklist.checklist_item?.checklist?.name}
          </h4>
          <Row>
            <Col md={3}>
              <Form.Label>Checklist item</Form.Label>
              <p>{pendingChecklist.checklist_item?.name}</p>
            </Col>
            <Col md={3}>
              <Form.Label>Location</Form.Label>
              <p>{pendingChecklist.site?.name}</p>
            </Col>
            <Col md={3}>
              <Form.Label>Inspection date</Form.Label>
              <Controller
                control={control}
                defaultValue=""
                name="inspection_date"
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    selected={value}
                    onChange={onChange}
                    className="form-control"
                    placeholderText="Checklist month / year"
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name="inspection_date"
                render={({ message }) => (
                  <small className="text-danger">{message}</small>
                )}
              />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          {pendingChecklist &&
            dynamicTableColumn &&
            pendingChecklist.pm_submitted_checklist_subitem && (
              <DynamicTableNoPagination
                columns={dynamicTableColumn}
                data={pendingChecklist.pm_submitted_checklist_subitem}
              />
            )}
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <h5>Feedback</h5>
          <Row className="mb-2">
            <Col md={12}>
              <Form.Label>Supervisor / technician</Form.Label>
              <Controller
                control={control}
                defaultValue=""
                name="technician"
                render={({ field: { onChange, value, onBlur } }) => (
                  <Form.Control
                    className={errors.name}
                    onBlur={onBlur}
                    onChange={onChange}
                    type="text"
                    value={value}
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name="inspection_date"
                render={({ message }) => (
                  <small className="text-danger">{message}</small>
                )}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={12}>
              <Form.Label>Remarks</Form.Label>
              <Controller
                control={control}
                defaultValue=""
                name="remarks"
                render={({ field: { onChange, value, onBlur } }) => (
                  <Form.Control
                    className={errors.name}
                    onBlur={onBlur}
                    onChange={onChange}
                    as="textarea"
                    value={value}
                    rows={6}
                  />
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Label>Supervisor / technician signature</Form.Label>
              <Controller
                control={control}
                defaultValue=""
                name="signature"
                render={({ field: { onChange, value, onBlur } }) => (
                  <Form.Control
                    className={errors.name}
                    onBlur={onBlur}
                    onChange={onChange}
                    as="textarea"
                    value={value}
                    rows={6}
                  />
                )}
              />
            </Col>
          </Row>
          <Row className="pt-4">
            <Col className="text-end">
              <Button
                className="me-2"
                variant="secondary"
                onClick={() =>
                  navigate("/preventive-maintenance/checklist-pending")
                }
              >
                Cancel
              </Button>
              <Button
                className="me-2"
                variant="primary"
                onClick={handleSubmit(submitPendingChecklist)}
              >
                Save
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};
