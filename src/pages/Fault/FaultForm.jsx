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
} from "react-bootstrap";
import { Card, Form } from "react-bootstrap";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-datepicker/dist/react-datepicker.css";
import { status } from "../../utils/utilities";

import ReactSignatureCanvas from "react-signature-canvas";
import { Star } from "react-feather";

const FaultForm = ({ type = null }) => {
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
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });
    const [value, setValue] = React.useState("");
    const [signature, setSignature] = useState({});
    const [width] = useState(window.innerWidth);

    const MIN_TEXTAREA_HEIGHT = 50;
    const textareaRef = React.useRef(null);

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

    //
    // UseEffects
    //

    return (
        <React.Fragment>
            <Helmet title="Fault form" />
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
                            <Breadcrumb.Item active>
                                {type || "Edit"}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Body>
                                <Row className="mb-4">
                                    <span className="text-start">
                                        <h4>Fault #1</h4>
                                        <p className="mb-1">(01/21/2023)</p>
                                        <Badge pill bg={status("NEW")}>
                                            NEW
                                        </Badge>
                                    </span>
                                </Row>
                                <Row className="mb-1">
                                    <Col md={3}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Location
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>Punggol, 820167</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                value="Punggol, 820167"
                                            />
                                        )}
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Assignee
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>Bea Mine</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                value="Bea Mine"
                                            />
                                        )}
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Reported by
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>Cherry Blossom</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                value="Cherry Blossom"
                                            />
                                        )}
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Reported date
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>01/20/2023</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                value="01/20/2023"
                                            />
                                        )}
                                    </Col>
                                </Row>

                                <Row className="mb-1">
                                    <Col md={12}>
                                        <Form.Label
                                            className="d-block font-weight-bold"
                                            htmlFor="status_check"
                                        >
                                            Description
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>Description for fault</p>
                                        ) : (
                                            <Form.Control
                                                as="textarea"
                                                value="Description for fault"
                                            />
                                        )}
                                    </Col>
                                </Row>

                                <Row className="mb-1">
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Contact person
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>Cherry Blossom</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                value="Cherry Blossom"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold"
                                            htmlFor="status_check"
                                        >
                                            Contact number
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>8888 2222</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                value="8888 2222"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold"
                                            htmlFor="status_check"
                                        >
                                            Source
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>Internal</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                value="Internal"
                                            />
                                        )}
                                    </Col>
                                </Row>

                                <Row className="mb-1">
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Work classification
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>Urgent</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                value="Urgent"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold"
                                            htmlFor="status_check"
                                        >
                                            Service type
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>Light replacement</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                value="Light replacement"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold"
                                            htmlFor="status_check"
                                        >
                                            Others (Please specify)
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>N/A</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                value="N/A"
                                            />
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-1">
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Job status
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>New</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                value="New"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold"
                                            htmlFor="status_check"
                                        >
                                            Service rating
                                        </Form.Label>
                                        {type === "View" ? (
                                            <>
                                                <Star color="orange" />
                                                <Star color="orange" />
                                                <Star color="orange" />
                                                <Star color="orange" />
                                                <Star />
                                            </>
                                        ) : (
                                            <>
                                                <Star />
                                                <Star />
                                                <Star />
                                                <Star />
                                                <Star />
                                            </>
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold"
                                            htmlFor="status_check"
                                        >
                                            Job sheet no
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>10 - 2023</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                value="10 - 2023"
                                            />
                                        )}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header className="pb-0">
                                <h5>Asset information</h5>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Code
                                        </Form.Label>
                                        <p>LP12023</p>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold"
                                            htmlFor="status_check"
                                        >
                                            Name
                                        </Form.Label>
                                        <p>Lamp post 1</p>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold"
                                            htmlFor="status_check"
                                        >
                                            Status
                                        </Form.Label>

                                        <Badge pill bg={status("INSTALLED")}>
                                            INSTALLED
                                        </Badge>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Trade
                                        </Form.Label>
                                        <p>N/A</p>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold"
                                            htmlFor="status_check"
                                        >
                                            Category
                                        </Form.Label>
                                        <p>TRI-LIGHTS</p>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold"
                                            htmlFor="status_check"
                                        >
                                            Location
                                        </Form.Label>
                                        <p>Pasir Ris, 519111</p>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col md={12} className="text-end">
                                        <Button
                                            className="me-2"
                                            variant="primary"
                                            type="submit"
                                            onClick={() =>
                                                navigate("/asset/list/view/1")
                                            }
                                        >
                                            View asset
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={12}>
                        <Card>
                            <Card.Header className="pb-0">
                                <h5>Asset History</h5>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={6}>
                                        <Form.Label className="font-weight-bold">
                                            Fault history
                                        </Form.Label>
                                        <ul className="timeline m-3">
                                            <li className="timeline-item">
                                                <strong>
                                                    FI0009 - rusty bolts of pole
                                                    base{" "}
                                                    <a
                                                        className="ms-2"
                                                        href="/"
                                                        onClick={() =>
                                                            navigate(
                                                                "/fault/list/edit/1"
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </a>
                                                </strong>
                                                <p className="text-sm">
                                                    01/10/2023
                                                </p>
                                            </li>
                                            <li className="timeline-item">
                                                <strong>
                                                    FI0002 - Lamp post chipped
                                                    paint{" "}
                                                    <a
                                                        className="ms-2"
                                                        href="/"
                                                        onClick={() =>
                                                            navigate(
                                                                "/fault/list/edit/1"
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </a>
                                                </strong>
                                                <p className="text-sm">
                                                    12/07/2022
                                                </p>
                                            </li>
                                            <li className="timeline-item">
                                                <strong>
                                                    FI0002 - Busted or broken
                                                    light bulb{" "}
                                                    <a
                                                        className="ms-2"
                                                        href="/"
                                                        onClick={() =>
                                                            navigate(
                                                                "/fault/list/edit/1"
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </a>
                                                </strong>
                                                <p className="text-sm">
                                                    3 days ago
                                                </p>
                                            </li>
                                            <li className="timeline-item">
                                                <strong>
                                                    FI0002 - Broken lights,
                                                    stuttering{" "}
                                                    <a
                                                        className="ms-2"
                                                        href="/"
                                                        onClick={() =>
                                                            navigate(
                                                                "/fault/list/edit/1"
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </a>
                                                </strong>
                                                <p className="text-sm mb-0">
                                                    10/01/2022
                                                </p>
                                            </li>
                                        </ul>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label className="font-weight-bold">
                                            Servicing history
                                        </Form.Label>
                                        <ul className="timeline m-3">
                                            <li className="timeline-item">
                                                <strong>
                                                    SH0005 - Lamp post repaint{" "}
                                                    <a
                                                        className="ms-2"
                                                        href="/"
                                                    >
                                                        View
                                                    </a>
                                                </strong>
                                                <p className="text-sm">
                                                    12/12/2022
                                                </p>
                                            </li>
                                            <li className="timeline-item">
                                                <strong>
                                                    SH0004 - Monthly maintenance
                                                    and cleaning of lamp post{" "}
                                                    <a
                                                        className="ms-2"
                                                        href="/"
                                                    >
                                                        View
                                                    </a>
                                                </strong>
                                                <p className="text-sm">
                                                    11/12/2022
                                                </p>
                                            </li>
                                            <li className="timeline-item">
                                                <strong>
                                                    SH0003 - Light replacement
                                                    due to broken bulb{" "}
                                                    <a
                                                        className="ms-2"
                                                        href="/"
                                                    >
                                                        View
                                                    </a>
                                                </strong>
                                                <p className="text-sm">
                                                    11/28/2022
                                                </p>
                                            </li>
                                            <li className="timeline-item">
                                                <strong>
                                                    SH0002 - Monthly maintenance
                                                    and cleaning of lamp post{" "}
                                                    <a
                                                        className="ms-2"
                                                        href="/"
                                                    >
                                                        View
                                                    </a>
                                                </strong>
                                                <p className="text-sm">
                                                    10/12/2022
                                                </p>
                                            </li>
                                            <li className="timeline-item">
                                                <strong>
                                                    SH0001 - Initial servicing
                                                    for lamp post due to stutter
                                                    lights{" "}
                                                    <a
                                                        className="ms-2"
                                                        href="/"
                                                    >
                                                        View
                                                    </a>
                                                </strong>
                                                <p className="text-sm mb-0">
                                                    10/10/2022
                                                </p>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={12}>
                        <Card>
                            <Card.Header className="pb-0">
                                <h5>Endorsements</h5>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={6} className="mb-5">
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
                                                minHeight: 50,
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
                                                    height: 100,
                                                    width:
                                                        width >= 1920
                                                            ? 550
                                                            : 330,
                                                }}
                                                backgroundColor="transparent"
                                            />
                                        </div>
                                    </Col>
                                    <Col md={6} className="mb-5">
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
                                                minHeight: 50,
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
                                            style={{ height: 100 }}
                                        ></div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Card></Card>
                    <Card.Body>
                        <Row className="mt-1">
                            <Col md={12} className="text-center">
                                <Button
                                    variant="link"
                                    onClick={() => navigate("/fault/list")}
                                    className="me-2"
                                >
                                    Cancel
                                </Button>
                                {type !== "View" && (
                                    <Button
                                        className="me-2"
                                        variant="primary"
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </Card.Body>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default FaultForm;
