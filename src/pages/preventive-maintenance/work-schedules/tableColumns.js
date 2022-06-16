import React from "react";

import { ChecklistButtons } from "../config/ChecklistButtons";

const tableColumns = [
    {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => {
            return <ChecklistButtons row={row} module="work schedule" />;
        },
    },
    {
        Header: "Hawker center",
        accessor: "hawker_center",
    },
    {
        Header: "Generated checklist",
        accessor: "generated_checklist",
    },
];

const tableData = [
    {
        hawker_center: "Adam",
        generated_checklist: "Yes",
    },
    {
        hawker_center: "Amoy",
        generated_checklist: "Yes",
    },
    {
        hawker_center: "Marsiling",
        generated_checklist: "Yes",
    },
];

export { tableColumns, tableData };
