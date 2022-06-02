import React from "react";

import { ChecklistButtons } from "../config/ChecklistButtons";

const tableColumns = [
    {
        Header   : "Id",
        accessor : "id",
    },
    {
        Header   : "Checklist name",
        accessor : "checklist_name",
    },
    {
        Header   : "Checklist type",
        accessor : "checklist_type",
    },
    {
        Header   : "Frequency",
        accessor : "frequency",
    },
    {
        Header   : "Active",
        accessor : "active",
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
            checklist_name : "Horticultural abortist (Monthly)",
            checklist_type : "HORTICULTURAL",
            frequency      : "Monthly",
            active         : "Yes",
        },
        {
            id             : "2",
            checklist_name : "Security system - Tree prunning (Yearly)",
            checklist_type : "SECURITY SYSTEM",
            frequency      : "Yearly",
            active         : "Yes",
        },
        {
            id             : "3",
            checklist_name : "Plumbing and sanitary - External CCTV (Weekly)",
            checklist_type : "PLUMBING AND SANITARY",
            frequency      : "Weekly",
            active         : "No",
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
