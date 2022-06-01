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
        .nullable()
        .required('This field is required')
    
});
const FaultResponseView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const notyf = useContext(NotyfContext)
    const [fault, setFault] = useState({});

    const {
        handleSubmit,
        control,
        reset,
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

    const saveHandler = async (data) => {
        try {
            const response = await faultApi.updateFaultTechnician(id, data)
            if (response.data.status === 'SUCCESS') {
                notyf.open({
                    type : 'success',
                    message: response.data.message,
                })
            }
        } catch (error) {
            console.log(error)            
        }
    }

    const requestForEOTHandler = () => {
        notyf.open({
            type: 'success',
            message: 'Request for EOT called'
        })
    }

    const toVerifyHandler = async (data) => {
        try {
            const response = await faultApi.forVerificationTO(id, data)
            if (response.data.status === 'SUCCESS') {
                notyf.open({
                    type : 'success',
                    message: response.data.message,
                })
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
                            <Breadcrumb.Item onClick={() => navigate('/faults/response')}>Fault Response</Breadcrumb.Item>
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
                        editable={true}
                        control={control}
                        errors={errors}
                        reset={reset}
                        fault={fault}
                    />
                    <Row>
                        <Col md={12} className="text-end">
                            <Button
                                variant="primary"
                                className="me-2"
                                onClick={handleSubmit(saveHandler)}
                            >
                                Save
                            </Button>
                            <Button
                                variant="warning"
                                className="me-2"
                                onClick={() => requestForEOTHandler()}
                            >
                                Request for EOT
                            </Button>
                            <Button
                                variant="success"
                                onClick={handleSubmit(toVerifyHandler)}
                            >
                                To Verify
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </React.Fragment>    
    )
}

export default FaultResponseView;