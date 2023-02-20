import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import {
    Container,
    Row,
    Button,
    Col,
    Breadcrumb,
    Badge,
    Table,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import { Card, Form } from "react-bootstrap";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-datepicker/dist/react-datepicker.css";
import { status } from "../../utils/utilities";

import ReactSignatureCanvas from "react-signature-canvas";
import { Image } from "react-feather";

const FaultForm = () => {
    //
    // States
    //
    const navigate = useNavigate();
    const { id } = useParams();
    const add = id === "add" ? true : false;
    const schema = yup.object().shape({
        name: yup.string().required("This field is required"),
        sub_module_no: yup.string().required("This field is required"),
        start_date: yup.date().required("This field is required"),
        end_date: yup.date().required("This field is required"),
        description: yup.string().required("This field is required"),
    });
    // const notyf = useContext(NotyfContext);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });
    const [value, setValue] = React.useState("");
    const [signature, setSignature] = useState({});
    const [width] = useState(window.innerWidth);

    const MIN_TEXTAREA_HEIGHT = 150;
    const textareaRef = React.useRef(null);
    const onChangeTextArea = (event) => setValue(event.target.value);

    React.useLayoutEffect(() => {
        textareaRef.current.style.height = "inherit";
        textareaRef.current.style.height = `${Math.max(
            textareaRef.current.scrollHeight,
            MIN_TEXTAREA_HEIGHT
        )}px`;
    }, [value]);

    //
    // Functions
    //

    const createSubModule = () => {
        return;
    };

    //
    // UseEffects
    //

    return (
        <React.Fragment>
            <Helmet title="Fault view" />
            <Container fluid className="p-0">
                <Row>
                    <Col md={6}></Col>
                    <Col md={6}>
                        <Breadcrumb>
                            <Breadcrumb.Item
                                onClick={() => navigate("/fault/list")}
                            >
                                Fault
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>Edit</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <Row className="mb-4">
                            <span className="text-center">
                                <h4>Fault #1</h4>
                                <p className="mb-1">(01/21/2023)</p>
                                <Badge pill bg={status("NEW")}>
                                    NEW
                                </Badge>
                            </span>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold "
                                    htmlFor="status_check"
                                >
                                    Location
                                </Form.Label>
                                <p>Marina bay, 17000</p>
                            </Col>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold"
                                    htmlFor="status_check"
                                >
                                    Description
                                </Form.Label>
                                <p>Description of checklist item 1</p>
                            </Col>
                            <Col md={4}>
                                <Form.Label
                                    className="d-block font-weight-bold"
                                    htmlFor="status_check"
                                >
                                    Category
                                </Form.Label>
                                <p>HIGHWAY LIGHT</p>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Label
                                className="d-block font-weight-bold"
                                htmlFor="status_check"
                            >
                                Photos
                            </Form.Label>
                        </Row>
                        <Row>
                            <Table
                                bordered
                                responsive
                                className="table-layout-fixed"
                            >
                                <thead>
                                    <tr>
                                        <th width="50px">S/N</th>
                                        <th width="250px">
                                            Checklist description
                                        </th>
                                        <th width="350px">Remarks</th>
                                        <th width="100px">Photos</th>
                                        <th width="100x">Check</th>
                                        <th width="100px">Last checker</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            Checklist description - perform task
                                            number 1
                                        </td>
                                        <td>
                                            <Form.Control
                                                as="textarea"
                                                ref={textareaRef}
                                                style={{
                                                    minHeight:
                                                        MIN_TEXTAREA_HEIGHT,
                                                    resize: "none",
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip>
                                                        Manage photos
                                                    </Tooltip>
                                                }
                                            >
                                                <Image
                                                    className="align-middle me-1"
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        navigate(
                                                            "/checklist/list/edit/1/photos/1"
                                                        )
                                                    }
                                                />
                                            </OverlayTrigger>
                                        </td>
                                        <td>
                                            <Form.Check type="checkbox" />
                                        </td>
                                        <td>User 1</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>
                                            Checklist description - perform task
                                            number 2
                                        </td>
                                        <td>
                                            <Form.Control
                                                as="textarea"
                                                ref={textareaRef}
                                                style={{
                                                    minHeight:
                                                        MIN_TEXTAREA_HEIGHT,
                                                    resize: "none",
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip>
                                                        Manage photos
                                                    </Tooltip>
                                                }
                                            >
                                                <Image
                                                    className="align-middle me-1"
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        navigate(
                                                            "/checklist/list/edit/1/photos/1"
                                                        )
                                                    }
                                                />
                                            </OverlayTrigger>
                                        </td>
                                        <td>
                                            <Form.Check type="checkbox" />
                                        </td>
                                        <td>User 1</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>
                                            Checklist description - perform task
                                            number 3
                                        </td>
                                        <td>
                                            <Form.Control
                                                as="textarea"
                                                ref={textareaRef}
                                                style={{
                                                    minHeight:
                                                        MIN_TEXTAREA_HEIGHT,
                                                    resize: "none",
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip>
                                                        Manage photos
                                                    </Tooltip>
                                                }
                                            >
                                                <Image
                                                    className="align-middle me-1"
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        navigate(
                                                            "/checklist/list/edit/1/photos/1"
                                                        )
                                                    }
                                                />
                                            </OverlayTrigger>
                                        </td>
                                        <td>
                                            <Form.Check type="checkbox" />
                                        </td>
                                        <td>User 18</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header className="pb-0">
                        <h5>Endorsements</h5>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={4}>
                                <Form.Label className="d-block font-weight-bold">
                                    Supervisor
                                </Form.Label>
                                <Form.Control type="text" />
                                <br />
                                <Form.Label className="d-block font-weight-bold">
                                    Remarks
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    ref={textareaRef}
                                    style={{
                                        minHeight: MIN_TEXTAREA_HEIGHT,
                                        resize: "none",
                                    }}
                                />
                                <br />
                                <Form.Label className="d-block font-weight-bold">
                                    Signature
                                </Form.Label>
                                <div className="signature-container">
                                    <ReactSignatureCanvas
                                        ref={(ref) => setSignature(ref)}
                                        canvasProps={{
                                            height: 200,
                                            width: width >= 1920 ? 550 : 330,
                                        }}
                                        backgroundColor="transparent"
                                    />
                                </div>
                            </Col>
                            <Col md={4}>
                                <Form.Label className="d-block font-weight-bold">
                                    Technical officer
                                </Form.Label>
                                <Form.Control type="text" disabled />
                                <br />
                                <Form.Label className="d-block font-weight-bold">
                                    Remarks
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    ref={textareaRef}
                                    style={{
                                        minHeight: MIN_TEXTAREA_HEIGHT,
                                        resize: "none",
                                    }}
                                    disabled
                                />
                                <br />
                                <Form.Label className="d-block font-weight-bold">
                                    Signature
                                </Form.Label>
                                <div
                                    className="signature-container-disabled"
                                    style={{ height: 208 }}
                                ></div>
                            </Col>
                            <Col md={4}>
                                <Form.Label className="d-block font-weight-bold">
                                    Last approver
                                </Form.Label>
                                <Form.Control type="text" disabled />
                                <br />
                                <Form.Label className="d-block font-weight-bold">
                                    Remarks
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    ref={textareaRef}
                                    style={{
                                        minHeight: MIN_TEXTAREA_HEIGHT,
                                        resize: "none",
                                    }}
                                    disabled
                                />
                                <br />
                                <Form.Label className="d-block font-weight-bold">
                                    Signature
                                </Form.Label>
                                <div
                                    className="signature-container-disabled"
                                    style={{ height: 208 }}
                                ></div>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col md={12} className="text-center">
                                <Button variant="link">Cancel</Button>
                                <Button
                                    className="me-2"
                                    variant="primary"
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>
    );
};

export default FaultForm;
