import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => (
  <footer className="footer">
    <Container fluid>
      <Row className="text-muted">
        <Col xs="6" className="text-start">
        </Col>
        <Col xs="6" className="text-end">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} -{" "}
            <span href="/" className="text-muted">
              Fonda
            </span>
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
