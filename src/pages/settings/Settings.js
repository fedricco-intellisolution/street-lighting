import React from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

const Settings = () => {
    return (
        <React.Fragment>
            <Helmet title="Settings" />
            <Container fluid className="p-0">
                <h1 className="h3 mb-3">Settings</h1>
            </Container>
        </React.Fragment>
    );
};

export default Settings;
