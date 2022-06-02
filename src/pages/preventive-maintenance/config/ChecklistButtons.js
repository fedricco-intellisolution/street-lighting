import React from "react";

import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Edit2 } from "react-feather";
import { useNavigate } from "react-router-dom";

export const ChecklistButtons = ({ row, module }) => {
    const navigate = useNavigate();

    return (
        <>
            <OverlayTrigger
                placement="top"
                overlay={<Tooltip id={`tooltip-top`}>Edit {module}</Tooltip>}
            >
                <Edit2
                    className="align-middle me-1"
                    size={18}
                    onClick={() =>
                        navigate(
                            `/preventive-maintenance/checklist-type/${row.original.id}`
                        )
                    }
                />
            </OverlayTrigger>
        </>
    );
};
