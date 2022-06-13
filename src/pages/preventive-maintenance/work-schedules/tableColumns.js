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
        Header: "Year",
        accessor: "year",
    },
    {
        Header: "Generated checklist",
        accessor: "generated_checklist",
    },
];

const tableData = [
    {
        hawker_center: "Adam",
        year: "2022",
        generated_checklist: "Yes",
    },
    {
        hawker_center: "Amoy",
        year: "2022",
        generated_checklist: "Yes",
    },
    {
        hawker_center: "Marsiling",
        year: "2022",
        generated_checklist: "Yes",
    },
];

export { tableColumns, tableData };
