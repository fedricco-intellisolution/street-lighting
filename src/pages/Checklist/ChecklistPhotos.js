import React from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import {
    Container,
    Row,
    Button,
    Col,
    Breadcrumb,
    Image,
} from "react-bootstrap";
import { Card, Form } from "react-bootstrap";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-datepicker/dist/react-datepicker.css";

import FileUploader from "../../components/ui/FileUploader";

const ChecklistPhotos = () => {
    //
    // States
    //
    const navigate = useNavigate();
    const { id } = useParams();

    const schema = yup.object().shape({
        name: yup.string().required("This field is required"),
        sub_module_no: yup.string().required("This field is required"),
        start_date: yup.date().required("This field is required"),
        end_date: yup.date().required("This field is required"),
        description: yup.string().required("This field is required"),
    });
    // const notyf = useContext(NotyfContext);

    const {
        control,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });
    const [value, setValue] = React.useState("");

    //
    // Functions
    //

    //
    // UseEffects
    //

    return (
        <React.Fragment>
            <Helmet title="Checklist photos" />
            <Container fluid className="p-0">
                <Row>
                    <Col md={6}></Col>
                    <Col md={6}>
                        <Breadcrumb>
                            <Breadcrumb.Item
                                onClick={() => navigate("/checklist/list")}
                            >
                                Checklist
                            </Breadcrumb.Item>
                            <Breadcrumb.Item
                                onClick={() =>
                                    navigate("/checklist/list/edit/1")
                                }
                            >
                                Checklist item 1
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>
                                Manage photos
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <Row className="mb-4">
                            <span className="text-center">
                                <h4>Checklist item 1</h4>
                                <p>
                                    (Checklist description - perform task number
                                    1)
                                </p>
                            </span>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Label className="d-block font-weight-bold">
                                    Before photos
                                </Form.Label>
                                <Row>
                                    <Col md={6} className="mb-2">
                                        <Image
                                            src="https://images.pexels.com/photos/3353242/pexels-photo-3353242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                            style={{ width: "100%" }}
                                        />
                                    </Col>
                                    <Col md={6} className="mb-2">
                                        <Image
                                            src="https://images.pexels.com/photos/3353242/pexels-photo-3353242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                            style={{ width: "100%" }}
                                        />
                                    </Col>
                                    <Col md={6} className="mb-2">
                                        <Image
                                            src="https://images.pexels.com/photos/3353242/pexels-photo-3353242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                            style={{ width: "100%" }}
                                        />
                                    </Col>
                                    <Col md={6} className="mb-2">
                                        <Image
                                            src="https://images.pexels.com/photos/3353242/pexels-photo-3353242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                            style={{ width: "100%" }}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <FileUploader
                                        control={control}
                                        name="before_photos"
                                        setValue={setValue}
                                    />
                                </Row>
                            </Col>
                            <Col md={6}>
                                <Form.Label className="d-block font-weight-bold">
                                    After photos
                                </Form.Label>
                                <Row>
                                    <Col md={6} className="mb-2">
                                        <Image
                                            src="https://images.pexels.com/photos/3353242/pexels-photo-3353242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                            style={{ width: "100%" }}
                                        />
                                    </Col>
                                    <Col md={6} className="mb-2">
                                        <Image
                                            src="https://images.pexels.com/photos/3353242/pexels-photo-3353242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                            style={{ width: "100%" }}
                                        />
                                    </Col>
                                    <Col md={6} className="mb-2">
                                        <Image
                                            src="https://images.pexels.com/photos/3353242/pexels-photo-3353242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                            style={{ width: "100%" }}
                                        />
                                    </Col>
                                    <Col md={6} className="mb-2">
                                        <Image
                                            src="https://images.pexels.com/photos/3353242/pexels-photo-3353242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                            style={{ width: "100%" }}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <FileUploader
                                        control={control}
                                        name="before_photos"
                                        setValue={setValue}
                                    />
                                </Row>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Row className="mt-4">
                    <Col md={12} className="text-center">
                        <Button
                            variant="link"
                            className="me-2"
                            onClick={() => navigate("/checklist/list/edit/1")}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="me-2"
                            variant="primary"
                            type="submit"
                        >
                            Save
                        </Button>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default ChecklistPhotos;
