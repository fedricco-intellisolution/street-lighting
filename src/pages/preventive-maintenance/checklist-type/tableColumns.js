import React from "react";

import { ChecklistButtons } from "../config/ChecklistButtons";

const tableColumns = [
    {
        Header   : "Id",
        accessor : "id",
    },
    {
        Header   : "Sequence no",
        accessor : "sequence_no",
    },
    {
        Header   : "Checklist type",
        accessor : "checklist_type",
    },
    {
        Header   : "Action",
        accessor : "action",
        Cell: ({ row }) => {
            return <ChecklistButtons row={row} module="checklist type" />;
        },
    },
];

const tableData = {
    data: [
        {
            id             : "1",
            sequence_no    : "1",
            checklist_type : "HORTICULTURAL",
        },
        {
            id             : "2",
            sequence_no    : "2233",
            checklist_type : "SECURITY SYSTEM",
        },
        {
            id             : "3",
            sequence_no    : "2233",
            checklist_type : "PLUMBING AND SANITARY",
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
