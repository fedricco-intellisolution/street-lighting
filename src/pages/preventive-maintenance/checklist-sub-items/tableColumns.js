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
        Header: "Checklist item",
        accessor: "checklist_item",
    },
    {
        Header: "Checklist sub item",
        accessor: "checklist_sub_item",
    },
    {
        Header: "Sequence no",
        accessor: "sequence_no",
    },
    {
        Header: "Frequency",
        accessor: "frequency",
    },
    {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => {
            return <ChecklistButtons row={row} module="checklist sub item" />;
        },
    },
];

const tableData = {
    data: [
        {
            id: "1",
            checklist_type: "ELECTRICAL SYSTEM",
            checklist_item: "GENERATOR",
            checklist_sub_item: "Change engine oil",
            sequence_no: "1",
            frequency: "Monthly",
        },
        {
            id: "2",
            checklist_type: "BUILDING & CIVIL",
            checklist_item: "BUILDING GENERALLY",
            checklist_sub_item: "Pit - Check for rubbish and chokages",
            sequence_no: "2",
            frequency: "Yearly",
        },
        {
            id: "3",
            checklist_type: "ELECTRICAL SYSTEM",
            checklist_item: "PUBLIC ADDRESS SYSTEM",
            checklist_sub_item: "Check power supply",
            sequence_no: "3",
            frequency: "Yearly",
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
