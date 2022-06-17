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
        Header: "Site",
        accessor: "site",
    },
    {
        Header: "Generated checklist",
        accessor: "generated_checklist",
    },
];

const tableData = [
    {
        site: "Kranji",
        generated_checklist: "Yes",
    },
    {
        site: "Pasir Ris",
        generated_checklist: "Yes",
    },
    {
        site: "Tampines",
        generated_checklist: "Yes",
    },
];

export { tableColumns, tableData };
