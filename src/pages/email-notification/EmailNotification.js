import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, Col, Container, Form, Row, Badge } from "react-bootstrap";
import * as emailNotificationApi from "@api/emailNotificationApi";
import debounce from "debounce";
import DynamicTable from "../../components/ui/DynamicTable";

const EmailNotification = () => {
  const [filter, setFilter] = useState();
  const [emailNotifications, setEmailNotifications] = useState([]);
  const tableColumns = [
    {
      Header: "Subject",
      accessor: "subject",
    },
    {
      Header: "Sent to",
      accessor: "sent_to",
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
      Cell: ({ cell: { value } }) => {
        const [height, setHeight] = useState("100px");
        const [overflowY, setOverflowy] = useState("hidden");
        const [readMore, setReadMore] = useState(0);

        const loadMore = (e) => {
          setHeight(null);
          setOverflowy();
          setReadMore(1);

          e.preventDefault();
        };

        const loadLess = (e) => {
          setHeight("100px");
          setOverflowy("hidden");
          setReadMore(0);

          e.preventDefault();
        };

        const content = React.createElement("div", {
          dangerouslySetInnerHTML: { __html: value },
        });

        return (
          <div>
            <div
              style={{
                height: height,
                overflowY: overflowY,
              }}
            >
              {content}
            </div>
            <div>
              <a href="#" onClick={readMore ? loadLess : loadMore}>
                {readMore ? "Read less" : "Read more"}
              </a>
            </div>
          </div>
        );
      },
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
    setEmailNotifications(response.data.data);
  }, [filter]);

  useEffect(() => {
    getEmails();
  }, [getEmails]);

  return (
    <React.Fragment>
      <Helmet title="Email notifications" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Email notifications</h1>
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
            <DynamicTable data={emailNotifications} columns={tableColumns} />
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default EmailNotification;
