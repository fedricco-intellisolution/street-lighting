import { Modal, Button } from "react-bootstrap";
import React, { useContext } from "react";
import * as permissionApi from "@api/permissionApi";
import NotyfContext from "../../../../contexts/NotyfContext";

const DeleteModal = (props) => {
  let id = props.id ?? "";
  const notyf = useContext(NotyfContext);

  //delete api
  const handleDelete = async () => {
    let response = "";

    try {
      switch (props.module) {
        case "permission":
          response = await permissionApi.deletePermission(id);
          break;
        default:
          break;
      }

      if (response.status === 200) {
        notyf.open({
          type: "success",
          message: response.data.message,
        });

        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      }
    } catch (error) {
      notyf.open({
        type: "danger",
        message: "Something went wrong with the server",
      });
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title || ""}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.body || ""}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <Button variant={props.variant} onClick={handleDelete}>
          Proceed
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
