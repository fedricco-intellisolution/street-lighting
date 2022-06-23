import React from "react";
import { Form } from "react-bootstrap";

const tableColumns = [
    {
        Header: "Checklist sub item",
        accessor: "checklist_subitem.name",
    },
    {
        Header: "Frequency",
        accessor: "checklist_subitem.frequency",
    },
    {
        Header: "Check",
        accessor: () => {
            return <Form.Check type="checkbox" />;
        },
    },
    {
        Header: "Clean",
        accessor: () => {
            return <Form.Check type="checkbox" />;
        },
    },
];

export { tableColumns };
