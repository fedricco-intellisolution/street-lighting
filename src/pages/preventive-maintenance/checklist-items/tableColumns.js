import React from "react";
import { ChecklistButtons } from "../config/ChecklistButtons";

const tableColumns = [
    {
        Header: "Id",
        accessor: "id",
    },
    {
        Header: "Checklist type",
        accessor: "checklist_type",
    },
    {
        Header: "Checklist item name",
        accessor: "checklist_item_name",
    },
    {
        Header: "Sequence no",
        accessor: "sequence_no",
    },
    {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => {
            return <ChecklistButtons row={row} module="checklist item" />;
        },
    },
];

const tableData = {
    data: [
        {
            id: "1",
            checklist_type: "HORTICULTURAL",
            checklist_item_name: "ABORIST",
            sequence_no: "1",
        },
        {
            id: "2",
            checklist_type: "HORTICULTURAL",
            checklist_item_name: "TREE PRUNNING",
            sequence_no: "2",
        },
        {
            id: "2",
            checklist_type: "SECURITY SYSTEM",
            checklist_item_name: "EXTERNAL CCTV",
            sequence_no: "2",
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
