import React from "react";
import { Helmet } from "react-helmet-async";
import { Container,Nav, Tab } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useNavigate, useParams } from "react-router-dom";
import BasicInformationTab from "./components/BasicInformationTab";
import PrivacySecurityTab from "./components/PrivacySecurityTab";  

const AddEditUser = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const add_page = id === 'add' ? true : false;

    return (
        <React.Fragment>
            <Helmet title="Create new user" />
            <Container fluid className="p-0">
                <Breadcrumb>
                    <Breadcrumb.Item onClick={ () => navigate('/settings/users')}>Users</Breadcrumb.Item>
                    <Breadcrumb.Item active>{add_page ? 'Add user' : 'Edit user'}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="tab custom-tab tab-vertical">
                    <Tab.Container defaultActiveKey="basic_information">
                        <Nav variant="tabs">
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="basic_information"
                                    onClick={() => null}
                                >
                                    Basic Information        
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="groups_permissions"
                                    onClick={() => null}
                                >
                                   Groups & Permissions        
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="notifications"
                                    onClick={() => null}
                                >
                                   Notifications        
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="privacy_security"
                                    onClick={() => null}
                                >
                                   Privacy & Security        
                                </Nav.Link>
                            </Nav.Item>
                           
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="basic_information">
                                <BasicInformationTab />
                            </Tab.Pane>
                            <Tab.Pane eventKey="groups_permissions">
                                <h1>hello</h1>
                            </Tab.Pane>
                            <Tab.Pane eventKey="notifications">
                                <h1>hello</h1>
                            </Tab.Pane>
                            <Tab.Pane eventKey="privacy_security">
                                <PrivacySecurityTab />
                            </Tab.Pane>
                        </Tab.Content>
                            
                    </Tab.Container>
                </div>
                
            </Container>
        </React.Fragment>    
    )
}

export default AddEditUser;