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
    Badge,
    Image,
} from "react-bootstrap";
import { Card, Form } from "react-bootstrap";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-datepicker/dist/react-datepicker.css";
import { status } from "../../utils/utilities";

import FileUploader from "../../components/ui/FileUploader";

const AssetForm = ({ type = null }) => {
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

    //
    // Functions
    //

    //
    // UseEffects
    //

    return (
        <React.Fragment>
            <Helmet title="Asset create" />
            <Container fluid className="p-0">
                <Row>
                    <Col md={6}></Col>
                    <Col md={6}>
                        <Breadcrumb>
                            <Breadcrumb.Item
                                onClick={() => navigate("/asset/list")}
                            >
                                Asset
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>
                                {type || "Edit"}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {" "}
                        <Card>
                            <Card.Body>
                                <Row className="mb-4">
                                    <span className="text-start">
                                        <h4>Lamp post 1</h4>
                                        <p className="mb-1">(LP12023)</p>
                                        <Badge pill bg={status("INSTALLED")}>
                                            INSTALLED
                                        </Badge>
                                    </span>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Longitude
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>1.32644020335524</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="1.32644020335524"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Latitude
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>103.84737365291693</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="103.84737365291693"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Location
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>Jurong east, 600002</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="Jurong east, 600002"
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
                                            Code
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>LP12023</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="LP12023"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Name
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>Lamp post 1</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="Lamp post 1"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Status
                                        </Form.Label>
                                        {type === "View" ? (
                                            <Badge
                                                pill
                                                bg={status("INSTALLED")}
                                            >
                                                INSTALLED
                                            </Badge>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="INSTALLED"
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
                                            Trade
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>Street lighting</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="Street lighting"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Category
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>Tri-lights</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="Tri-lights"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Asset number
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>0111 9222 7777</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="0111 9222 7777"
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
                                            Purchased date
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>12/20/2022</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="12/20/2022"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Warranty start date
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>12/20/2022</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="12/20/2022"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Warranty end date
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>12/20/2024</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="12/20/2024"
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
                                            Specifications
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>-</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="N/A"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Serial no.
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>777 99999 1111</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="777 99999 1111"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Model
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>LE2</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="LE2"
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
                                            Brand
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>Toshiba</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="Toshiba"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Indoor / outdoor
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>Outdoor</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="Outdoor"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Contract items
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>N/A</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="N/A"
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
                                            Additional notes
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>
                                                Installation to be completed
                                                after holidays
                                            </p>
                                        ) : (
                                            <Form.Control
                                                as="textarea"
                                                defaultValue="Installation to be completed after
                                    holidays"
                                            />
                                        )}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={12}>
                        {" "}
                        <Card>
                            <Card.Header className="pb-0">
                                <h5>Asset attribute</h5>
                            </Card.Header>
                            <Card.Body>
                                <Row className="mb-1">
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Install year
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>2022</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="2022"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Pole brand
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>Dahua</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="Dahua"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Pole type
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>Stainless</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="Stainless"
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
                                            Pole finishes
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>Painted</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="Painted"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Pole material
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>Stainless steel</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="Stainless steel"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Pole ground
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>Soft ground</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="Soft ground"
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
                                            Pole mounting
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>Solid base</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="Solid base"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Pole height
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>10 ft</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="10 ft"
                                            />
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label
                                            className="d-block font-weight-bold "
                                            htmlFor="status_check"
                                        >
                                            Pole girth
                                        </Form.Label>
                                        {type === "View" ? (
                                            <p>10cm</p>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                defaultValue="10cm"
                                            />
                                        )}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={12}>
                        {" "}
                        <Card>
                            <Card.Header className="pb-0">
                                <h5>Photos</h5>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={12}>
                                        <Row>
                                            <Col md={4} className="mb-2">
                                                <Image
                                                    src="https://images.pexels.com/photos/3353242/pexels-photo-3353242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                                    style={{ width: "100%" }}
                                                />
                                            </Col>
                                            <Col md={4} className="mb-2">
                                                <Image
                                                    src="https://images.pexels.com/photos/3353242/pexels-photo-3353242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                                    style={{ width: "100%" }}
                                                />
                                            </Col>
                                            <Col md={4} className="mb-2">
                                                <Image
                                                    src="https://images.pexels.com/photos/3353242/pexels-photo-3353242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                                    style={{ width: "100%" }}
                                                />
                                            </Col>
                                            {/* <Col md={4} className="mb-2">
                                                <Image
                                                    src="https://images.pexels.com/photos/3353242/pexels-photo-3353242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                                    style={{ width: "100%" }}
                                                />
                                            </Col> */}
                                        </Row>
                                        {type !== "View" && (
                                            <Row>
                                                <FileUploader
                                                    control={control}
                                                    name="before_photos"
                                                    setValue={() => {}}
                                                />
                                            </Row>
                                        )}
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

export default AssetForm;
