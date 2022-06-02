import React, { useState } from "react";

import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Edit2, Trash } from "react-feather";
import { useNavigate } from "react-router-dom";

import { DeleteModal } from "components/DeleteModal";
import { SnackbarAlert } from "components/SnackbarAlert";

export const ChecklistButtons = ({ row, module }) => {
  const navigate = useNavigate();
  const [modalInfo, setModalInfo] = useState({
    id: null,
    notifMsg: "",
    open: false,
    severity: "danger",
  });
  const [notif, setNotif] = useState({
    notifMsg: "",
    open: false,
    severity: "success",
  });

  const openDeleteModal = (id) => {
    setModalInfo({
      id: id,
      notifMsg: "Are you sure you want to void this item?",
      open: true,
      severity: "danger",
    });
  };

  return (
    <>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id={`tooltip-top`}>Edit {module}</Tooltip>}
      >
        <Edit2
          className="align-middle me-1"
          size={18}
          onClick={() => navigate(`/intellibuild/projects/${row.original.id}`)}
        />
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id={`tooltip-top`}>Delete {module}</Tooltip>}
      >
        <Trash
          className="align-middle"
          size={18}
          onClick={() => openDeleteModal(row.original.id)}
        />
      </OverlayTrigger>

      {/* Modal Components */}

      <SnackbarAlert notif={notif} setNotif={setNotif} />
      <DeleteModal
        modalInfo={modalInfo}
        setModalInfo={setModalInfo}
      />
    </>
  );
};
