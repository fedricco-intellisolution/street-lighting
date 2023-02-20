import React, { useEffect, useRef, useState } from "react";

import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import {
    Col,
    FormLabel,
    Image,
    OverlayTrigger,
    Row,
    Tooltip,
} from "react-bootstrap";
import { faEye, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ViewImageModal } from "components/modal/ViewImageModal";

export const FileUploaderSyncfusion = ({
    setUpload,
    setCameraUpload = null,
    cameraPhotos = null,
    setModalInfo,
    document,
    canDelete = true,
    canUpload = true,
    action,
    labelBold,
    preloadFiles = false,
    removeDocument = false,
    isQuotation = false,
    loadedFileLabel = "Uploaded files",
}) => {
    //
    // State
    //

    const inputRef = useRef(null);
    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
    const [modalView, setModalView] = useState({
        image: "",
        label: "",
        open: false,
    });

    //
    // Functions
    //

    const openDeleteModal = (originalId) => {
        setModalInfo({
            id: originalId,
            notifMsg: "Are you sure you want to delete this item?",
            open: true,
            severity: "primary",
        });
    };
    let isMobile = deviceWidth < 768;

    const handleResize = () => {
        setDeviceWidth(window.innerWidth);
    };

    const openCamera = async () => {
        inputRef.current.click();
    };

    const handleCameraChange = (e) => {
        if (setCameraUpload) {
            setCameraUpload([...cameraPhotos, ...e.target.files]);
        }
    };

    const deleteCameraFile = (index) => {
        let new_photos = [...cameraPhotos];
        new_photos.splice(index, 1);

        if (setCameraUpload) {
            setCameraUpload(new_photos);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {/* Uploads  */}

            {canUpload && (
                <Row className="mb-2">
                    <Col md={12}>
                        {isMobile && (
                            <Row>
                                <FormLabel
                                    className={labelBold && "font-weight-bold"}
                                >
                                    <>
                                        <label
                                            onClick={openCamera}
                                            style={{
                                                textDecoration: "underline",
                                                color: "#3F80EA",
                                                pointer: "cursor",
                                                marginLeft: "2px",
                                            }}
                                        >
                                            Camera
                                        </label>
                                    </>
                                </FormLabel>
                            </Row>
                        )}
                        <UploaderComponent
                            autoUpload={false}
                            ref={(uploadData) => {
                                setUpload(uploadData);
                            }}
                        />

                        {isMobile && (
                            <div>
                                <input
                                    style={{ display: "none" }}
                                    accept="image/*"
                                    className=""
                                    ref={inputRef}
                                    id="icon-button-file"
                                    type="file"
                                    capture="environment"
                                    onChange={handleCameraChange}
                                />

                                {cameraPhotos &&
                                    cameraPhotos.map((cameraFile, index) => {
                                        return (
                                            <Row className="mt-2" key={index}>
                                                <Col sm={6}>
                                                    {cameraFile?.name}
                                                </Col>
                                                {canDelete && (
                                                    <Col sm={6}>
                                                        <label
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() => {
                                                                deleteCameraFile(
                                                                    index
                                                                );
                                                            }}
                                                        >
                                                            X
                                                        </label>
                                                    </Col>
                                                )}
                                            </Row>
                                        );
                                    })}
                            </div>
                        )}
                    </Col>
                </Row>
            )}

            {/* Preloaded during creating */}

            {preloadFiles ? (
                <Row>
                    <Col md={12}>
                        <FormLabel>Ready for upload</FormLabel>
                        <div
                            style={{ border: "1px dashed #adb5bd" }}
                            className="p-3"
                        >
                            <Row>
                                <Col md={6} className="font-weight-bold">
                                    File name
                                </Col>
                                <Col
                                    md={4}
                                    className="font-weight-bold text-end"
                                >
                                    Created at
                                </Col>
                                <Col
                                    md={2}
                                    className="font-weight-bold text-end"
                                >
                                    Actions
                                </Col>
                            </Row>
                            <hr />
                            {preloadFiles.map((data, key, row) => {
                                return (
                                    <Row
                                        key={key}
                                        className={
                                            key + 1 !== row.length && "mb-2"
                                        }
                                    >
                                        <Col md={6}>
                                            {data.name || data.file_name}
                                        </Col>
                                        {/* <Col md={2}>
                                            {data.type || data.mime}
                                        </Col> */}
                                        <Col md={4} className="text-end">
                                            {data.created_at || "-"}
                                        </Col>
                                        <Col md={2} className="text-end">
                                            {data.full_path && (
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={
                                                        <Tooltip>
                                                            Preview file
                                                        </Tooltip>
                                                    }
                                                >
                                                    <span>
                                                        <FontAwesomeIcon
                                                            size="lg"
                                                            icon={faEye}
                                                            className="cursor-pointer align-middle me-1"
                                                            onClick={() => {
                                                                if (
                                                                    data?.mime ===
                                                                        "image/png" ||
                                                                    data?.mime ===
                                                                        "image/jpeg"
                                                                ) {
                                                                    setModalView(
                                                                        {
                                                                            image: data?.full_path,
                                                                            open: true,
                                                                            label: "View image",
                                                                        }
                                                                    );
                                                                } else {
                                                                    window.open(
                                                                        data?.full_path
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    </span>
                                                </OverlayTrigger>
                                            )}
                                            {canDelete && (
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={
                                                        <Tooltip>
                                                            Delete file
                                                        </Tooltip>
                                                    }
                                                >
                                                    <span>
                                                        <FontAwesomeIcon
                                                            size="lg"
                                                            icon={faTimes}
                                                            className="cursor-pointer align-middle me-1"
                                                            onClick={() =>
                                                                removeDocument(
                                                                    key
                                                                )
                                                            }
                                                        />
                                                    </span>
                                                </OverlayTrigger>
                                            )}
                                        </Col>
                                    </Row>
                                );
                            })}
                        </div>
                    </Col>
                </Row>
            ) : (
                ""
            )}

            {/* File previews */}

            {action !== "create" && (
                <Row>
                    <Col md={12}>
                        <FormLabel className={labelBold && "font-weight-bold"}>
                            {loadedFileLabel}
                        </FormLabel>
                        <div
                            style={{ border: "1px dashed #adb5bd" }}
                            className="p-3"
                        >
                            {!isMobile && (
                                <>
                                    <Row>
                                        <Col
                                            md={3}
                                            className="font-weight-bold"
                                        >
                                            File name
                                        </Col>
                                        <Col
                                            md={isQuotation ? 3 : 5}
                                            className="font-weight-bold"
                                        >
                                            File preview
                                        </Col>
                                        {isQuotation && (
                                            <Col
                                                md={2}
                                                className="font-weight-bold"
                                            >
                                                Uploader role
                                            </Col>
                                        )}
                                        <Col
                                            md={2}
                                            className="font-weight-bold text-end"
                                        >
                                            Created at
                                        </Col>
                                        <Col
                                            md={2}
                                            className="font-weight-bold text-end"
                                        >
                                            Actions
                                        </Col>
                                    </Row>
                                    <hr />
                                </>
                            )}
                            {document?.length ? (
                                document.map((data, key, row) => {
                                    return isMobile ? (
                                        <React.Fragment key={key}>
                                            <Row>
                                                <Col md={3}>
                                                    File name: {data.file_name}
                                                </Col>
                                                {isQuotation && (
                                                    <Col md={3}>
                                                        Uploader role:{" "}
                                                        {data.uploader}
                                                    </Col>
                                                )}
                                                <Col md={3}>
                                                    Created at:{" "}
                                                    {data.created_at}
                                                </Col>
                                                <Col md={3}>
                                                    Actions:{" "}
                                                    {canDelete && (
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={
                                                                <Tooltip>
                                                                    Delete file
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <span>
                                                                <FontAwesomeIcon
                                                                    size="lg"
                                                                    icon={
                                                                        faTimes
                                                                    }
                                                                    className="cursor-pointer align-middle me-1"
                                                                    onClick={() =>
                                                                        openDeleteModal(
                                                                            data.id
                                                                        )
                                                                    }
                                                                />
                                                            </span>
                                                        </OverlayTrigger>
                                                    )}
                                                </Col>
                                                <Col md={3}>
                                                    File preview: <br />
                                                    {data?.mime ===
                                                        "image/png" ||
                                                    data?.mime ===
                                                        "image/jpeg" ? (
                                                        <Image
                                                            src={
                                                                data?.thumbnail ||
                                                                data?.full_path
                                                            }
                                                            className="signature-container"
                                                            style={{
                                                                maxWidth:
                                                                    "100%",
                                                            }}
                                                            onClick={() => {
                                                                setModalView({
                                                                    image: data?.full_path,
                                                                    open: true,
                                                                    label: "View image",
                                                                });
                                                            }}
                                                        />
                                                    ) : (
                                                        <a
                                                            href={
                                                                data?.full_path
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            Download
                                                        </a>
                                                    )}
                                                </Col>
                                            </Row>
                                            {key + 1 !== row.length && <hr />}
                                        </React.Fragment>
                                    ) : (
                                        <Row
                                            key={key}
                                            className={
                                                key + 1 !== row.length && "mb-2"
                                            }
                                        >
                                            <Col md={3}>{data.file_name}</Col>
                                            <Col md={isQuotation ? 3 : 5}>
                                                {data?.mime === "image/png" ||
                                                data?.mime === "image/jpeg" ? (
                                                    <Image
                                                        src={
                                                            data?.thumbnail ||
                                                            data?.full_path
                                                        }
                                                        className="preview-image signature-container"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            setModalView({
                                                                image: data?.full_path,
                                                                open: true,
                                                                label: "View image",
                                                            });
                                                        }}
                                                    />
                                                ) : (
                                                    <a
                                                        href={data?.full_path}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        Download
                                                    </a>
                                                )}
                                            </Col>
                                            {isQuotation && (
                                                <Col md={2}>
                                                    {data.uploader}
                                                </Col>
                                            )}

                                            <Col md={2} className="text-end">
                                                {data.created_at}
                                            </Col>
                                            <Col md={2} className="text-end">
                                                {canDelete && (
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                            <Tooltip>
                                                                Delete file
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <span>
                                                            <FontAwesomeIcon
                                                                size="lg"
                                                                icon={faTimes}
                                                                className="cursor-pointer align-middle me-1"
                                                                onClick={() =>
                                                                    openDeleteModal(
                                                                        data.id
                                                                    )
                                                                }
                                                            />
                                                        </span>
                                                    </OverlayTrigger>
                                                )}
                                            </Col>
                                        </Row>
                                    );
                                })
                            ) : (
                                <Row>
                                    <Col className="text-center">
                                        No files uploaded
                                    </Col>
                                </Row>
                            )}
                        </div>
                    </Col>
                </Row>
            )}
            <ViewImageModal modalInfo={modalView} setModalInfo={setModalView} />
        </>
    );
};
