import React from "react";
import { Form } from "react-bootstrap";

const tableColumns = [
    {
        Header: "",
        accessor: "action",
        Cell: ({ row }) => {
            return <Form.Check type="checkbox" />;
        },
    },
    {
        Header: "Checklist item",
        accessor: "checklist_item",
    },
    {
        Header: "Sequence no",
        accessor: "sequence_no",
    },
];

const tableData = [
    {
        checklist_item: "SINGLE SPLIT SERVICING",
        sequence_no: "1",
    },
    {
        checklist_item: "EXTERNAL WORKS",
        sequence_no: "1",
    },
    {
        checklist_item: "DIGITAL SIGNAGE SYSTEM",
        sequence_no: "1",
    },
];

export { tableColumns, tableData };
