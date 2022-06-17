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
import { Map, Edit2 } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import DynamicTable from "../../../components/ui/DynamicTable";
import * as propertyManagementApi from "@api/propertyManagementApi";
import debounce from "debounce";

const Sites = () => {
  const [filter, setFilter] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [sites, setSites] = useState([]);
  const tableColumns = [
    {
      Header: "Actions",
      accessor: "actions",
      Cell: (cell) => (
        <div>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Edit site</Tooltip>}
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
    const response = await propertyManagementApi.getSites(filter);
    setSites(response.data.data);
  }, [filter]);

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
                  onChange={debounce((e) => {
                    const searchValue = {
                      search: {
                        keyword: e.target.value || undefined,
                      },
                    };
                    setFilter(searchValue);
                  }, 1000)}
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
            <DynamicTable data={sites} columns={tableColumns} />
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Sites;
