import React, { useCallback, useContext, useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import RegistrationForm from "./components/RegistrationForm";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FileUploader from "../../../components/ui/FileUploader";
import { ErrorMessage } from "@hookform/error-message";
import * as preventiveMaintenanceApi from "@api/preventiveMaintenanceApi";
import { useNavigate, useParams } from "react-router-dom";
import NotyfContext from "@contexts/NotyfContext";

const schema = yup.object().shape({
    action_taken  : yup.string().nullable().required('This field is required'),
});

const RectifyDefectView = () => {
    const { id } = useParams()
    const [defect, setDefect] = useState({})
    const navigate = useNavigate()
    const notyf = useContext(NotyfContext)
    const {
        control,
        reset,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    const getDefect = useCallback(async () => {
        const response = await preventiveMaintenanceApi.getDefect(id) 
        setDefect(response.data.data)
    }, [id])
    
    useEffect(() => {
        getDefect()
    }, [getDefect])
    
    const saveHandler = async (data) => {
        
        let before_photos = data.before_photos ? data.before_photos : []
        let after_photos = data.after_photos ? data.after_photos : []
        
        const formData = new FormData();

        formData.append("job_type", data.job_type)
        formData.append("status", data.status)
        formData.append("sector_id", data.sector_id)
        formData.append("site_id", data.site_id)
        formData.append("level_id", data.level_id)
        formData.append("area_id", data.area_id)
        formData.append("defect", data.defect)
        formData.append("action_taken", data.action_taken)
        formData.append("remarks", data.remarks)
        
        before_photos.forEach(file => {
            formData.append("before_photos[]", file);
        })

        after_photos.forEach(file => {
            formData.append("after_photos[]", file);
        })
        
        const response = await preventiveMaintenanceApi.updateDefect(id, formData)
        if (response.data.status === 'SUCCESS') {
            notyf.open({
                type: 'success',
                message: response.data.message,
            })
            navigate('/preventive-maintenance/defects/rectify')
        }
    }

    return (
        <React.Fragment>
            <Helmet title="View defect" />
            <Container fluid className="p-0">
                <Row>
                    <Col md={6}>
                        <h1 className="h3 mb-3">View defect</h1>
                    </Col>
                    <Col md={6}>
                        <Breadcrumb>
                           
                        </Breadcrumb>
                    </Col>
                </Row>

                <Form>
                    <Card>
                        <Card.Body>
                            <RegistrationForm
                                editable={false}
                                control={control}
                                errors={errors}
                                reset={reset}
                                defect={defect}
                                setValue={setValue}
                                mode="view"
                            >
                                <Row>
                                    <Col md={12}>
                                        <FileUploader
                                            defaultValue=""
                                            label="After photos"
                                            control={control}
                                            name="after_photos"
                                            errors={errors}
                                            setValue={setValue}
                                            data={defect.after_photos}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Action taken</Form.Label>
                                            <Controller
                                                control={control}
                                                name="action_taken"
                                                defaultValue=""
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <Form.Control
                                                        type="text"
                                                        as="textarea"
                                                        rows={5}
                                                        value={value}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        className={(errors.action_taken && 'is-invalid')}
                                                        
                                                    />
                                                )}
                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                name="action_taken"
                                                render={({ message }) => <small className="text-danger">{message}</small>}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Remarks</Form.Label>
                                            <Controller
                                                control={control}
                                                name="remarks"
                                                defaultValue=""
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <Form.Control
                                                        type="text"
                                                        as="textarea"
                                                        rows={5}
                                                        value={value}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        className={(errors.remarks && 'is-invalid')}
                                                        
                                                    />
                                                )}
                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                name="remarks"
                                                render={({ message }) => <small className="text-danger">{message}</small>}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col className="text-end">
                                        <Button
                                            variant="secondary"
                                            onClick={() => { }}
                                            className="me-2"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="primary"
                                            onClick={handleSubmit(saveHandler)}
                                        >
                                            Save
                                        </Button>
                                    </Col> 
                                </Row>   

                            </RegistrationForm>
                        
                        </Card.Body>
                    </Card>
                </Form>
                
            </Container>
        </React.Fragment>    
    );
}

export default RectifyDefectView;