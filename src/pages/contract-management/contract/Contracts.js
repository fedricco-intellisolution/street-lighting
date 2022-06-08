import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Map, Edit2 } from "react-feather";
import { useNavigate, useLocation } from "react-router-dom";
import * as contractManagementApi from "@api/contractManagementApi";
import DynamicTable from "../../../components/ui/DynamicTable";

const Contracts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sectors, setSectors] = useState([]);
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
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Contract no",
      accessor: "contract_no",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Start date",
      accessor: "start_date",
    },
    {
      Header: "End date",
      accessor: "end_date",
    },
  ];

  //call get sectors api
  const getSectorsApi = useCallback(async () => {
    const response = await contractManagementApi.getContracts();
    setSectors(response.data.data);
  }, []);

  useEffect(() => {
    getSectorsApi();
  }, [getSectorsApi]);

  return (
    <React.Fragment>
      <Helmet title="Contracts" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Contracts</h1>
        <Card>
          <Card.Header className="pb-0">
            <Row>
              <Col md={3}>
                <Form.Control
                  onChange={() => {}}
                  placeholder="Search keyword"
                  className="d-inline-block"
                />
              </Col>
              <Col md={{ span: 3, offset: 6 }} className="text-end">
                <Button
                  variant="primary"
                  className="me-1 mb-1"
                  onClick={() => navigate(location.pathname + "/add")}
                >
                  <Map className="align-middle me-1" size={16} />
                  Create new contract
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DynamicTable data={sectors} columns={tableColumns} />
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Contracts;
