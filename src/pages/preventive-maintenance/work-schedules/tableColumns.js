import React from "react";
import { Badge } from "react-bootstrap";

const tableColumns = [
    {
        Header: "Site",
        accessor: "site.name",
    },
    {
        Header: "Checklist item",
        accessor: "checklist_item.name",
    },
    {
        Header: "Frequency",
        accessor: "frequency",
    },
    {
        Header: "Status",
        Cell: ({ row }) => {
            return (
                <Badge
                    pill
                    bg={
                        row.original.status === "ON GOING"
                            ? "warning"
                            : "secondary"
                    }
                >
                    {row.original.status}
                </Badge>
            );
        },
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
