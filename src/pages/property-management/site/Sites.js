import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Map } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import SiteTable from "./SiteTable";
import * as propertyManagementApi from "@api/propertyManagementApi";

const Sites = () => {
  const [filter, setFilter] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [sites, setSites] = useState([]);
  const tableColumns = [
    {
      Header: "Actions",
      accessor: "actions",
    },
    {
      Header: "Sector",
      accessor: "sector.name",
    },
    {
      Header: "Site",
      accessor: "name",
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "QR code",
      accessor: "qr_code_path",
    },
  ];

  //get sites
  const getSites = useCallback(async () => {
    const response = await propertyManagementApi.getSites();
    setSites(response.data.data);
  }, []);

  useEffect(() => {
    getSites();
  }, [getSites]);

  return (
    <React.Fragment>
      <Helmet title="Sites" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Sites</h1>
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
                  Create new site
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <SiteTable data={sites} columns={tableColumns} />
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Sites;
