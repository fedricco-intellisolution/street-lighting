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

const ChecklistForm = ({ type = null }) => {
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
            <Helmet title="Checklist form" />
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
                            <Breadcrumb.Item active>Edit</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Body>
                                <Row className="mb-4">
                                    <span className="text-start">
                                        <h4>Checklist item 1</h4>
                                        <p className="mb-1">(01/21/2023)</p>
                                        <Badge pill bg={status("PENDING")}>
                                            PENDING
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
                                        {type === "View" ? (
                                            <p>Marina bay, 17000</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                value="Marina bay, 17000"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold"
                                            htmlFor="status_check"
                                        >
                                            Description
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>
                                                Description of checklist item 1
                                            </p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                value="Description of checklist item 1"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold"
                                            htmlFor="status_check"
                                        >
                                            Category
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>CAMPUS LIGHT</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                value="CAMPUS LIGHT"
                                            />
                                        )}
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Label
                                        className="d-block font-weight-bold mt-2"
                                        htmlFor="status_check"
                                    >
                                        Checklist
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
                                                <th width="350px">
                                                    Checklist description
                                                </th>
                                                <th width="250px">Remarks</th>
                                                <th width="100px">Photos</th>
                                                <th width="100x">Check</th>
                                                <th width="100px">
                                                    Last checker
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    <p>
                                                        A system that has a new
                                                        controller with AEP or
                                                        SCP will be locked out
                                                        and de-energized by the
                                                        contractor.
                                                    </p>
                                                </td>
                                                <td>
                                                    {type === "View" ? (
                                                        <p>For inspection</p>
                                                    ) : (
                                                        <Form.Control
                                                            as="textarea"
                                                            ref={textareaRef}
                                                            style={{
                                                                minHeight:
                                                                    MIN_TEXTAREA_HEIGHT,
                                                                resize: "none",
                                                            }}
                                                            value="For inspection"
                                                        />
                                                    )}
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
                                                    <Form.Check
                                                        type="checkbox"
                                                        checked={type}
                                                        disabled={type}
                                                    />
                                                </td>
                                                <td>User 1</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>
                                                    <p>
                                                        The grounding wire for
                                                        controller shall be
                                                        tested and the ohms
                                                        recorded.
                                                    </p>
                                                </td>
                                                <td>
                                                    {type === "View" ? (
                                                        <p>Completed</p>
                                                    ) : (
                                                        <Form.Control
                                                            as="textarea"
                                                            ref={textareaRef}
                                                            style={{
                                                                minHeight:
                                                                    MIN_TEXTAREA_HEIGHT,
                                                                resize: "none",
                                                            }}
                                                            value="Completed"
                                                        />
                                                    )}
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
                                                    <Form.Check
                                                        type="checkbox"
                                                        disabled={type}
                                                    />
                                                </td>
                                                <td>User 11</td>
                                            </tr>

                                            <tr>
                                                <td>3</td>
                                                <td>
                                                    <p>
                                                        The amps of each circuit
                                                        leg shall be measured
                                                        and recorded.
                                                    </p>
                                                </td>
                                                <td>
                                                    {type === "View" ? (
                                                        <p>
                                                            Pending for
                                                            supervisor
                                                            checking/review
                                                        </p>
                                                    ) : (
                                                        <Form.Control
                                                            as="textarea"
                                                            ref={textareaRef}
                                                            style={{
                                                                minHeight:
                                                                    MIN_TEXTAREA_HEIGHT,
                                                                resize: "none",
                                                            }}
                                                            value="Pending for supervisor checking"
                                                        />
                                                    )}
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
                                                    <Form.Check
                                                        type="checkbox"
                                                        checked={type}
                                                        disabled={type}
                                                    />
                                                </td>
                                                <td>User 16</td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>
                                                    <p>
                                                        Each new pole shall be
                                                        tic-traced by the
                                                        engineer before touched
                                                    </p>
                                                </td>
                                                <td>
                                                    {type === "View" ? (
                                                        <p>
                                                            Pending for
                                                            supervisor
                                                            checking/review
                                                        </p>
                                                    ) : (
                                                        <Form.Control
                                                            as="textarea"
                                                            ref={textareaRef}
                                                            style={{
                                                                minHeight:
                                                                    MIN_TEXTAREA_HEIGHT,
                                                                resize: "none",
                                                            }}
                                                            value="Pending for supervisor checking"
                                                        />
                                                    )}
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
                                                    <Form.Check
                                                        type="checkbox"
                                                        checked={type}
                                                        disabled={type}
                                                    />
                                                </td>
                                                <td>User 1</td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>
                                                    <p>
                                                        The engineer shall
                                                        record the results of
                                                        the inspection on the
                                                        “Inspection Checklist
                                                        for Streetlight
                                                        Construction” which will
                                                        have already been filled
                                                        out in part by the
                                                        inspector
                                                    </p>
                                                </td>
                                                <td>
                                                    {type === "View" ? (
                                                        <p>N/A</p>
                                                    ) : (
                                                        <Form.Control
                                                            as="textarea"
                                                            ref={textareaRef}
                                                            style={{
                                                                minHeight:
                                                                    MIN_TEXTAREA_HEIGHT,
                                                                resize: "none",
                                                            }}
                                                            value="Pending for supervisor checking"
                                                        />
                                                    )}
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
                                                    <Form.Check
                                                        type="checkbox"
                                                        checked={type}
                                                        disabled={type}
                                                    />
                                                </td>
                                                <td>User 9</td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>
                                                    <p>
                                                        The engineer shall
                                                        re-inspect the project
                                                        after corrections have
                                                        been made.
                                                    </p>
                                                </td>
                                                <td>
                                                    {type === "View" ? (
                                                        <p>-</p>
                                                    ) : (
                                                        <Form.Control
                                                            as="textarea"
                                                            ref={textareaRef}
                                                            style={{
                                                                minHeight:
                                                                    MIN_TEXTAREA_HEIGHT,
                                                                resize: "none",
                                                            }}
                                                            value=""
                                                        />
                                                    )}
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
                                                    <Form.Check
                                                        type="checkbox"
                                                        checked={type}
                                                        disabled={type}
                                                    />
                                                </td>
                                                <td>User 10</td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>
                                                    <p>
                                                        The engineer shall send
                                                        the acceptance letter to
                                                        the inspection provider
                                                        with in 24 hours of
                                                        accepting the project
                                                    </p>
                                                </td>
                                                <td>
                                                    {type === "View" ? (
                                                        <p>
                                                            Pending for
                                                            supervisor
                                                            checking/review
                                                        </p>
                                                    ) : (
                                                        <Form.Control
                                                            as="textarea"
                                                            ref={textareaRef}
                                                            style={{
                                                                minHeight:
                                                                    MIN_TEXTAREA_HEIGHT,
                                                                resize: "none",
                                                            }}
                                                            value="N/A"
                                                        />
                                                    )}
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
                                                    <Form.Check
                                                        type="checkbox"
                                                        checked={type}
                                                        disabled={type}
                                                    />
                                                </td>
                                                <td>User 18</td>
                                            </tr>
                                        </tbody>
                                    </Table>
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
                    <Row className="mt-4">
                        <Col md={12} className="text-center">
                            <Button
                                variant="link"
                                onClick={() => navigate("/asset/list")}
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
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default ChecklistForm;
