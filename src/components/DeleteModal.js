import React from "react";

import { Button, Modal } from "react-bootstrap";

export const DeleteModal = ({ modalInfo, setModalInfo, api = null }) => {
    const closeModal = () => {
        setModalInfo({
            ...modalInfo,
            open: false,
        });
    };

    const callApi = () => {
        api(modalInfo.id);
        closeModal();
    };

    return (
        <Modal
            show={modalInfo.open}
            onHide={() => closeModal()}
            size="sm"
            centered
        >
            <Modal.Body className="text-center m-3">
                <p className="mb-0">{modalInfo.notifMsg}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => closeModal()}>
                    Close
                </Button>{" "}
                <Button variant={modalInfo.severity} onClick={() => callApi()}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
