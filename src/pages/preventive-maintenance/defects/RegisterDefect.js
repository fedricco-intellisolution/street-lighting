import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as preventiveMaintenanceApi from "@api/preventiveMaintenanceApi";
import NotyfContext from "@contexts/NotyfContext";
import RegistrationForm from "./components/RegistrationForm";

const schema = yup.object().shape({
    job_type  : yup.string().required('This field is required'),
    sector_id : yup.string().required('This field is required'),
    site_id   : yup.string().required('This field is required'),
    level_id  : yup.string().required('This field is required'),
    area_id   : yup.string().required('This field is required'),
    defect    : yup.string().required('This field is required')
});

const RegisterDefect = () => {
    const notyf = useContext(NotyfContext)
    const {
        control,
        setValue,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });
    
    
    const submitHandler = async (data) => {
        
        let before_photos = data.before_photos ? data.before_photos : []
        
        const formData = new FormData();

        formData.append("job_type", data.job_type)
        formData.append("sector_id", data.sector_id)
        formData.append("site_id", data.site_id)
        formData.append("level_id", data.level_id)
        formData.append("area_id", data.area_id)
        formData.append("defect", data.defect)
        
        before_photos.forEach(file => {
            formData.append("before_photos[]", file);
        })
       
        try {
            const response = await preventiveMaintenanceApi.registerDefect(formData)
            if (response.data.status === 'SUCCESS') {
                notyf.open({
                    type: 'success',
                    message: response.data.message,
                })
                window.location.reload(true);
            }
 
        } catch (error) {
            
        }
    }

    return (
       <React.Fragment>
            <Helmet title="Register defect" />
            <Container fluid className="p-0">
                <Row>
                    <Col md={6}>
                        <h1 className="h3 mb-3">Register defect</h1>
                    </Col>
                    <Col md={6}>
                        <Breadcrumb>
                           
                        </Breadcrumb>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <Form>
                            <RegistrationForm
                                editable={false}
                                control={control}
                                errors={errors}
                                reset={reset}
                                defect={{  }}
                                setValue={setValue}
                                mode="register"
                            />
                            <Row className="pt-4">
                                <Col className="text-end">
                                    <Button
                                        variant="secondary"
                                        className="me-2"
                                        onClick={() => {}}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={handleSubmit(submitHandler)}
                                    >
                                        Submit
                                    </Button>
                                </Col>
                            </Row> 
                        </Form>    
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>    
    );
}

export default RegisterDefect;