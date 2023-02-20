import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, Col, Row } from "react-bootstrap";
import Logo from "../../assets/img/fonda-logo.png";
import IntelliSolution from "../../assets/img/intellisolution.png";
import SignInForm from "./components/SignInForm";

const SignInPage = () => {
    const [width] = useState(window.innerWidth);
    let isMobile = width < 768;

    return (
        <React.Fragment>
            <Helmet title="Sign In" />
            <Card>
                <Card.Body>
                    <div className="m-sm-4">
                        <div className="text-center">
                            <Row className="justify-content-md-center">
                                <Col md={2}>
                                    <img
                                        src={Logo}
                                        alt="Moe Logo"
                                        style={{
                                            maxWidth: isMobile
                                                ? "80px"
                                                : "110px",
                                        }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <p
                                        style={{ fontSize: "18px" }}
                                        className="p-2 mb-0 mt-2 font-weight-bold"
                                    >
                                        Fonda Global Engineering Pte. Ltd.
                                    </p>
                                </Col>
                            </Row>
                        </div>
                        <SignInForm />
                        <div className="text-left mt-4">
                            If you have any questions, please contact our{" "}
                            <a href="mailto:proj_moe@intellisolution.tech">
                                support team
                            </a>
                            .<br />
                            Empowered by Intellect Solution. <br />
                            <img
                                src={IntelliSolution}
                                alt="Intelli solution Logo"
                                style={{ maxWidth: "100px" }}
                            />
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
};

export default SignInPage;
