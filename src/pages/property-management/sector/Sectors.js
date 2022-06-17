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
import { useNavigate, useLocation } from "react-router-dom";
import * as propertyManagementApi from "@api/propertyManagementApi";
import debounce from "debounce";
import DynamicTable from "../../../components/ui/DynamicTable";

const Sectors = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState();
  const [sectors, setSectors] = useState([]);
  const tableColumns = [
    {
      Header: "Actions",
      accessor: "actions",
      Cell: (cell) => (
        <div>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Edit sector</Tooltip>}
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
    const response = await propertyManagementApi.getSectors(filter);
    setSectors(response.data.data);
  }, [filter]);

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
                  Create new sector
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

export default Sectors;
