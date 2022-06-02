import React from "react";
import { ChecklistButtons } from "../config/ChecklistButtons";

const tableColumns = [
    {
        Header   : "Id",
        accessor : "id",
    },
    {
        Header   : "Checklist type",
        accessor : "checklist_type",
    },
    {
        Header   : "Checklist item",
        accessor : "checklist_item",
    },
    {
        Header   : "Sequence no",
        accessor : "sequence_no",
    },
    {
        Header   : "Action",
        accessor : "action",
        Cell: ({ row }) => {
            return <ChecklistButtons row={row} module="checklist item" />;
        },
    },
];

const tableData = {
    data: [
        {
            id             : "1",
            checklist_type : "HORTICULTURAL",
            checklist_item : "ABORIST",
            sequence_no    : "1",
        },
        {
            id             : "2",
            checklist_type : "HORTICULTURAL",
            checklist_item : "TREE PRUNNING",
            sequence_no    : "2",
        },
        {
            id             : "2",
            checklist_type : "SECURITY SYSTEM",
            checklist_item : "EXTERNAL CCTV",
            sequence_no    : "2",
        },
    ],
    meta: {
        current_page : 1,
        from         : null,
        last_page    : 1,
        path         : "#",
        per_page     : 25,
        to           : null,
        total        : 0,
    },
};

export { tableColumns, tableData };
