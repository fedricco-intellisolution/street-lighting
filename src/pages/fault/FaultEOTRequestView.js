import React, { useCallback, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useNavigate, useParams } from "react-router-dom";
import CallCentreForm from "./components/CallCentreForm";
import TechnicianForm from "./components/TechnicianForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as faultApi from "@api/faultApi";
import NotyfContext from "@contexts/NotyfContext";
import TechnicalOfficerForm from "./components/TechnicalOfficerForm";
import SignatoriesForm from "./components/SignatoriesForm";

const schema = yup.object().shape({
    action_taken: yup
        .string()
        .required('This field is required')
    
});
const FaultEOTRequestView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const notyf = useContext(NotyfContext);
    const [fault, setFault] = useState({});

    const {
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });
    
    const getFault = useCallback(async () => {
        const response = await faultApi.getFault(id);
        setFault(response.data.data)
    }, [id])
    
    useEffect(() => {
        getFault()
    }, [getFault])

    const applyEOTHandler = async () => {

        try {
            const response = await faultApi.applyEOT(id)
            if (response.data.status === 'SUCCESS') {
                notyf.open({
                    type : 'success',
                    message: response.data.message,
                })
                navigate('/faults/eot-requests')
            }
        } catch (error) {
            console.log(error)            
        }
    }

    return (
        <React.Fragment>
            <Helmet title="View fault" />
            <Container fluid className="p-0">
                <Row>
                    <Col md={6}>
                        <h1 className="h3 mb-3">View fault</h1>
                    </Col>
                    <Col md={6}>
                         <Breadcrumb>
                            <Breadcrumb.Item onClick={() => navigate('/faults/eot-requests')}>Fault EOT request (TO)</Breadcrumb.Item>
                            <Breadcrumb.Item active>View</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Card>
                    <Card.Header className="pb-0">
                        <Card.Title className="mb-0">Call Centre</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <CallCentreForm
                            editable={false}
                            fault={fault}
                        />
                    </Card.Body>
                </Card>
                <Form>
                     <TechnicianForm
                        editable={false}
                        control={control}
                        errors={errors}
                        reset={reset}
                        fault={fault}
                        setValue={setValue}
                    />
                    <TechnicalOfficerForm
                        editable={false}
                        control={control}
                        errors={errors}
                        reset={reset}
                        fault={fault}
                        setValue={setValue}
                    />
                    <SignatoriesForm
                        control={control}
                    />
                     <Row>
                        <Col md={12} className="text-end">
                            <Button
                                variant="primary"
                                className="me-2"
                                onClick={() => applyEOTHandler()}
                            >
                                Apply EOT
                            </Button>
                            
                        </Col>
                    </Row>
                   
                </Form>
            </Container>
        </React.Fragment>    
    )
}

export default FaultEOTRequestView;