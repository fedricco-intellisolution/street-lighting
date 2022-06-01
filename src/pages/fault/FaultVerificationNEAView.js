import React, { useCallback, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useNavigate, useParams } from "react-router-dom";
import CallCentreForm from "./components/CallCentreForm";
import * as faultApi from "../../api/faultApi";
import TechnicianForm from "./components/TechnicianForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import NotyfContext from "../../contexts/NotyfContext";

const schema = yup.object().shape({
    action_taken: yup
        .string()
        .required('This field is required')
    
});
const FaultVerificationNEAView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const notyf = useContext(NotyfContext);
    const [fault, setFault] = useState({});

    const {
        control,
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

    const verifyCompletionHandler = () => {
        notyf.open({
            type: 'success',
            message: 'Verify completion called'
        })
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
                            <Breadcrumb.Item onClick={() => navigate('/faults/verification-nea')}>Fault verification (NEA)</Breadcrumb.Item>
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
                    />
                     <Row>
                        <Col md={12} className="text-end">
                            <Button
                                variant="success"
                                onClick={() => verifyCompletionHandler()}
                            >
                                Verify completion
                            </Button>
                        </Col>
                    </Row>
                   
                </Form>
            </Container>
        </React.Fragment>    
    )
}

export default FaultVerificationNEAView;