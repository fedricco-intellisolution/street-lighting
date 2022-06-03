import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Map } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import AreaTable from "./AreaTable";
import * as propertyManagementApi from "@api/propertyManagementApi";

const Areas = () => {
  const [filter, setFilter] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [areas, setAreas] = useState([]);
  const tableColumns = [
    {
      Header: "Actions",
      accessor: "actions",
    },
    {
      Header: "Site",
      accessor: "level.site.name",
    },
    {
      Header: "Level",
      accessor: "level.name",
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

  //get areas
  const getAreas = useCallback(async () => {
    const response = await propertyManagementApi.getAreas();
    setAreas(response.data.data);
  }, []);

  useEffect(() => {
    getAreas();
  }, [getAreas]);

  return (
    <React.Fragment>
      <Helmet title="Areas" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Areas</h1>
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
                  Create new area
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <AreaTable data={areas} columns={tableColumns} />
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Areas;