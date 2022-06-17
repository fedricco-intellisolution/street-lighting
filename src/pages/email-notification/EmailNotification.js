import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, Col, Container, Form, Row, Badge } from "react-bootstrap";
import * as emailNotificationApi from "@api/emailNotificationApi";
import debounce from "debounce";
import DynamicTable from "../../components/ui/DynamicTable";

const EmailNotification = () => {
  const [filter, setFilter] = useState();
  const [sectors, setSectors] = useState([]);
  const tableColumns = [
    {
      Header: "Subject",
      accessor: "subject",
    },
    {
      Header: "Sent to",
      accessor: "sent_to_name",
    },
    {
      Header: "Sent to email",
      accessor: "sent_to_email",
    },
    {
      Header: "CC email",
      accessor: "cc_email",
      Cell: ({ cell: { value } }) => {
        return value.join(" ");
      },
    },
    {
      Header: "Body",
      accessor: "body",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ cell: { value } }) => {
        return (
          <>
            <Badge bg={value ? "success" : "danger"}>
              {value ? "Success" : "Failed"}
            </Badge>
          </>
        );
      },
    },
    {
      Header: "Sent date",
      accessor: "created_at",
      Cell: ({ row, value }) => {
        return row.original.status ? value : "";
      },
    },
  ];

  //call get emails
  const getEmails = useCallback(async () => {
    const response = await emailNotificationApi.getEmails(filter);
    setSectors(response.data.data);
  }, [filter]);

  useEffect(() => {
    getEmails();
  }, [getEmails]);

  return (
    <React.Fragment>
      <Helmet title="Email notification" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Email notification</h1>
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

export default EmailNotification;
