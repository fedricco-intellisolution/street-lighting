import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Card,
  Col,
  Container,
  Form,
  Row,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";
import { Edit2, Mail, Users } from "react-feather";
import { useNavigate, useLocation } from "react-router-dom";
import * as emailApi from "@api/emailApi";
import DynamicTable from "../../../components/ui/DynamicTable";

const EmailTemplates = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState();
  const [emailTemplates, setEmailTemplates] = useState([]);
  const tableColumns = [
    {
      Header: "Actions",
      accessor: "actions",
      Cell: (cell) => (
        <div>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Edit template</Tooltip>}
          >
            <Edit2
              className="align-middle me-1"
              size={18}
              onClick={() =>
                navigate(location.pathname + "/" + cell.row.original.id)
              }
            />
          </OverlayTrigger>
          {/* <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Assign user</Tooltip>}
          >
            <Users
              className="align-middle me-1"
              size={18}
              onClick={() =>
                navigate(location.pathname + "/" + cell.row.original.id)
              }
            />
          </OverlayTrigger> */}
        </div>
      ),
    },
    {
      Header: "Code",
      accessor: "code",
    },
    // {
    //   Header: "Title",
    //   accessor: "title",
    // },
    {
      Header: "Name",
      accessor: "name",
    },
  ];

  //call get email templates
  const getEmailTemplates = useCallback(async () => {
    const response = await emailApi.getEmailTemplates(filter);
    setEmailTemplates(response.data.data);
  }, [filter]);

  useEffect(() => {
    getEmailTemplates();
  }, [getEmailTemplates]);

  return (
    <React.Fragment>
      <Helmet title="Email templates" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Email templates</h1>
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
                  <Mail className="align-middle me-1" size={16} />
                  Create new email template
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DynamicTable data={emailTemplates} columns={tableColumns} />
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default EmailTemplates;
