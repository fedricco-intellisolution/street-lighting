import React from "react";

import { ChecklistButtons } from "../config/ChecklistButtons";

const tableColumns = [
    {
        Header: "Id",
        accessor: "id",
    },
    {
        Header: "Sequence no",
        accessor: "sequence_no",
    },
    {
        Header: "Category",
        accessor: "category",
    },
    {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => {
            return <ChecklistButtons row={row} module="checklist type" />;
        },
    },
];

const tableData = {
    data: [
        {
            id: "1",
            sequence_no: "1",
            category: "HORTICULTURAL",
        },
        {
            id: "2",
            sequence_no: "2233",
            category: "SECURITY SYSTEM",
        },
        {
            id: "3",
            sequence_no: "2233",
            category: "	PLUMBING AND SANITARY",
        },
    ],
    meta: {
        current_page: 1,
        from: null,
        last_page: 1,
        path: "http://localhost:8081/intellisuite/intellisuite-api-v2/public/api/v1/tms/batches",
        per_page: 25,
        to: null,
        total: 0,
    },
};

export { tableColumns, tableData };
