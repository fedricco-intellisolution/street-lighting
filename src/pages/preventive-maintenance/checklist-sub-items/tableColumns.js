import React from "react";
import { ChecklistButtons } from "../config/ChecklistButtons";

const tableColumns = [
    {
        Header: "Action",
        Cell: ({ row }) => {
            return (
                <ChecklistButtons
                    row={row}
                    module="checklist sub item"
                    route="checklist-sub-items"
                />
            );
        },
    },
    {
        Header: "Checklist type",
        accessor: "checklist_item.checklist.name",
    },
    {
        Header: "Checklist item",
        accessor: "checklist_item.name",
    },
    {
        Header: "Checklist sub item",
        accessor: "name",
    },
    {
        Header: "Frequency",
        accessor: "frequency.name",
    },
    {
        Header: "Sequence no",
        accessor: "sequence_no",
    },
];

export { tableColumns };
