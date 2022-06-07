import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useNavigate, useParams } from "react-router-dom";
import CallCentreForm from "./components/CallCentreForm";
import TechnicianForm from "./components/TechnicianForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as faultApi from "@api/faultApi";

const schema = yup.object().shape({
    action_taken: yup
        .string()
        .required('This field is required')
    
});
const FaultRectifiedView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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
                            <Breadcrumb.Item onClick={() => navigate('/faults/rectified')}>Fault rectified</Breadcrumb.Item>
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
                </Form>
            </Container>
        </React.Fragment>    
    )
}

export default FaultRectifiedView;