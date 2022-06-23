import React, { useCallback, useContext, useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as faultApi from "@api/faultApi";
import NotyfContext from "@contexts/NotyfContext";
import EOTForm from "./components/EOTForm";
const schema = yup.object().shape({
    details: yup.object().shape({
        to: yup
            .string()
            .required('This field is required'),
        title: yup
            .string()
            .required('This field is required'),
        description: yup
            .string()
            .required('This field is required'),
    }),
    requested_extension_date: yup
        .string()
        .required('This field is required')
    
});

const FaultEOTView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const notyf = useContext(NotyfContext)
    const { id } = useParams();
    const create = location.pathname.indexOf('apply') > -1 ? true : false
    const [fault, setFault] = useState();
    const {
        handleSubmit,
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

    const submitHandler = async (data) => {
        console.log(data)
        data.fault_id = data.fault.id
        try {
            const response = await faultApi.applyEOT(data)
            if (response.data.status === 'SUCCESS') {
                notyf.open({
                    type: 'success',
                    message: response.data.message,
                })
                navigate(`/faults/eot-requests`)
            }
        } catch (error) {
        }
    }

    const approveHandler = async (data) => {
        console.log(data)
        
        try {
            const response = await faultApi.approveEOT(fault.eot.id, data)
            if (response.data.status === 'SUCCESS') {
                notyf.open({
                    type: 'success',
                    message: response.data.message,
                })
                navigate(`/faults/eot-approval`)
            }
        } catch (error) {
        }
    }

    return (
        <React.Fragment>
            <Helmet title={create? 'Fault Apply EOT' : 'Fault View EOT' } />
            <Container fluid className="p-0">
                <Row>
                    <Col md={6}>
                        <h1 className="h3 mb-3">{
                            create
                                ? 'Apply EOT'
                                : 'View EOT'
                        }</h1>
                    </Col>
                    <Col md={6}>
                        <Breadcrumb>
                           
                        </Breadcrumb>
                    </Col>
                </Row>
                <Form>
                    <EOTForm
                        editable={create ? true : false }
                        control={control}
                        errors={errors}
                        reset={reset}
                        fault={fault}
                        setValue={setValue}
                        mode={create ? 'create' : 'view'}
                        
                    />
                    {
                        !create && fault?.eot?.status === 'FOR_APPROVAL' && 
                        <Row>
                            <Col md={12} className="text-end">
                                    <Button
                                        variant="danger"
                                        className="me-2"
                                        onClick={() => {}}
                                    >
                                        Reject
                                    </Button>
                                    <Button
                                        variant="primary"
                                        className="me-2"
                                        onClick={
                                            create
                                                ? handleSubmit(submitHandler)
                                                : handleSubmit(approveHandler)
                                            }
                                    >
                                        Approve
                                    </Button>            
                                
                            </Col>
                        </Row>
                    }

                    {
                        create &&
                        <Row>
                            <Col md={12} className="text-end">
                                    <Button
                                        variant="primary"
                                        className="me-2"
                                        onClick={handleSubmit(submitHandler)}
                                    >
                                        Submit
                                    </Button>            
                                
                            </Col>
                        </Row>
                    }
                    
                </Form>
                
            </Container>
            
        </React.Fragment>    
    )
}

export default FaultEOTView;