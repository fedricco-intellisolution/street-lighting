import React from "react";
import { Form } from "react-bootstrap";

const tableColumns = [
    {
        Header: "S/N",
        accessor: "id",
    },
    {
        Header: "Checklist sub item",
        accessor: "checklist_sub_item",
    },
    {
        Header: "Frequency",
        accessor: "frequency",
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

const tableData = [
    {
        id: "1",
        frequency: "Monthly",
        checklist_sub_item:
            "Check routine operation of electrical components in control panel",
    },
    {
        id: "2",
        frequency: "Monthly",
        checklist_sub_item:
            "Clean electrical contacts and tighten all contacts",
    },
    {
        id: "3",
        frequency: "Monthly",
        checklist_sub_item:
            "Check all anti-vibration isolators for deterioration",
    },
    {
        id: "4",
        frequency: "Monthly",
        checklist_sub_item:
            "Check for deterioration of blower fan wheel and housing",
    },
    {
        id: "5",
        frequency: "Monthly",
        checklist_sub_item:
            "Clean, wire brush, touch-up and paint all rusty parts",
    },
];

export { tableColumns, tableData };
