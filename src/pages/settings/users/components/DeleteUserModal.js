import { Modal, Button } from "react-bootstrap";

const DeleteUserModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Delete user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this user?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Cancel
                </Button>
                <Button variant={props.variant} onClick={() => {}}>
                    Proceed
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteUserModal;