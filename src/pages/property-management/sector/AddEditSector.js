import React from "react";
import { useNavigate, Link } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import { Container, Row, Button, Anchor } from "react-bootstrap";
import { Card, Form } from "react-bootstrap";

const AddEditSector = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Helmet title="Create sector" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Create sector</h1>
        <Card>
          <Card.Body>
            <Row>
              <Form className="col-md-6 col-sm-12 mb-2">
                <Form.Label>Code</Form.Label>
                <Form.Control type="text" name="input" />
              </Form>
              <Form className="col-md-6 col-sm-12 mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="input" />
              </Form>
            </Row>
            <Row>
              <Form>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="input" />
              </Form>
            </Row>
            <Row className="mt-2">
              <Form>
                <Button type="submit">Save</Button>
                <Anchor
                  onClick={() => navigate("/property-management/sector")}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </Anchor>
              </Form>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default AddEditSector;
