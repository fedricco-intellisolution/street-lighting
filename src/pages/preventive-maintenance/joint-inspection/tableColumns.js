import React from "react";

import { ChecklistButtons } from "../config/ChecklistButtons";

const tableColumns = [
    {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => {
            return (
                <ChecklistButtons
                    row={row}
                    route="joint-inspection"
                    module="pending checklist"
                />
            );
        },
    },
    {
        Header: "Checklist",
        accessor: "checklist",
    },
    {
        Header: "Checklist item",
        accessor: "checklist_item",
    },
    {
        Header: "Frequency",
        accessor: "frequency",
    },
    {
        Header: "Hawker centre",
        accessor: "hawker_centre",
    },
    {
        Header: "Technician",
        accessor: "technician",
    },
];

const tableData = [
    {
        id: "1",
        checklist: "SECURITY SYSTEM",
        checklist_item: "EXTERNAL CCTV",
        frequency: "MONTHLY INSPECTION",
        hawker_centre: "Marsiling Mall Hawker Centre",
        technician: "",
    },
    {
        id: "2",
        checklist: "LUMBING AND SANITARY",
        checklist_item: "WATER DISPENSER",
        frequency: "WEEKLY INSPECTION 1",
        hawker_centre: "Zion Riverside",
        technician: "",
    },
    {
        id: "3",
        checklist: "BUILDING & CIVIL",
        checklist_item: "ROOFING",
        frequency: "QUARTERLY SERVICING",
        hawker_centre: "Berseh",
        technician: "",
    },
];

export { tableColumns, tableData };
