import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Map } from "react-feather";
import { useNavigate, useLocation } from "react-router-dom";
import * as propertyManagementApi from "@api/propertyManagementApi";
import SectorTable from "./SectorTable";

const Sectors = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState();
  const [sectors, setSectors] = useState([]);
  const tableColumns = [
    {
      Header: "Actions",
      accessor: "actions",
    },
    {
      Header: "Code",
      accessor: "code",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Description",
      accessor: "description",
    },
  ];

  //call get sectors api
  const getSectorsApi = useCallback(async () => {
    const response = await propertyManagementApi.getSectors();
    setSectors(response.data.data);
  }, []);

  useEffect(() => {
    getSectorsApi();
  }, [getSectorsApi]);

  return (
    <React.Fragment>
      <Helmet title="Sectors" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Sectors</h1>
        <Card>
          <Card.Header className="pb-0">
            <Row>
              <Col md={3}>
                <Form.Control
                  value={filter || ""}
                  onChange={(e) => {
                    setFilter(e.target.value || undefined);
                  }}
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
                  Create new sector
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <SectorTable data={sectors} columns={tableColumns} />
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Sectors;
