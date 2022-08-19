import React from "react";
import { Helmet } from "react-helmet-async";
import { Card } from "react-bootstrap";

import Logo from "../../assets/img/fonda-logo.png";
import SignInForm from "./components/SignInForm";

const SignInPage = () => (
    <React.Fragment>
        <Helmet title="Sign In" />
        <Card>
            <Card.Body>
                <div className="m-sm-4">
                    <div className="text-center">
                        <img
                            src={Logo}
                            alt="Fonda Logo"
                            className="img-fluid"
                            width="132"
                            height="132"
                        />
                    </div>
                    <SignInForm />
                </div>
            </Card.Body>
        </Card>
    </React.Fragment>
);

export default SignInPage;
