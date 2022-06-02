import React, { useCallback, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, Col, Container, Row } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useNavigate } from "react-router-dom";
import CallCentreForm from "./components/CallCentreForm";
import { useParams } from "react-router-dom";
import * as faultApi from "@api/faultApi";
import NotyfContext from "@contexts/NotyfContext";

const CallCentreFaultView = () => {
    const navigate = useNavigate();
    const notyf = useContext(NotyfContext)
    const { id } = useParams();
    const register_page = id === 'register' ? true : false
    const [fault, setFault] = useState({})
    
    const registerFault = async (data) => {
        try {
            const response = await faultApi.registerFault(data)
            if (response.data.status === 'SUCCESS') {
                notyf.open({
                    type: 'success',
                    message: response.data.message,
                })
                navigate('/faults/callcentre')
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const updateFault = async (data) => {
        try {
            const response = await faultApi.updateFaultRegistration(id, data)
            if (response.data.status === 'SUCCESS') {
                notyf.open({
                    type: 'success',
                    message: response.data.message,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const getFault = useCallback(async () => {
        const response = await faultApi.getFault(id);
        setFault(response.data.data)
    }, [id])

    useEffect(() => {
        if (!register_page) getFault()
    }, [getFault, register_page])

    return (
        <React.Fragment>
            <Helmet title={ register_page ? 'Register Fault' : 'Edit Fault'} />
            <Container fluid className="p-0">
                <Row>
                    <Col md={6}>
                        <h1 className="h3 mb-3">{ register_page ? 'Register Fault' : 'Edit Fault'}</h1>
                    </Col>
                    <Col md={6}>
                         <Breadcrumb>
                            <Breadcrumb.Item onClick={() => navigate('/faults/callcentre')}>Faults</Breadcrumb.Item>
                            <Breadcrumb.Item active>{ register_page ? 'Register' : 'Edit'}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <CallCentreForm
                            editable={true}
                            onSubmit={
                                register_page
                                ? registerFault
                                : updateFault
                            }
                            onCancel={() => navigate('/faults/callcentre')}
                            fault={fault}
                            mode={register_page ? 'register' : 'view'}
                        />                     
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>    
    )
}

export default CallCentreFaultView;