import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { UserPlus } from "react-feather";
import { useNavigate, useLocation } from "react-router-dom";
import UsersTable from "./components/UsersTable";
import * as usersApi from "@api/usersApi";

const tableColumns = [
  {
    Header: "Actions",
    accessor: "actions",
  },
  {
    Header: "Name",
    accessor: "full_name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Designation",
    accessor: "designation",
  },
];
const Users = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    const response = await usersApi.getUsers();
    setUsers(response.data.data);
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <React.Fragment>
      <Helmet title="Users" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Users</h1>
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
                  <UserPlus className="align-middle me-1" size={16} />
                  Create new user
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <UsersTable data={users} columns={tableColumns} />
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Users;
