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
                    module="checklist item"
                    route="checklist-type"
                />
            );
        },
    },
	{
		Header: "Checklist type",
		accessor: "name",
	},
    {
        Header: "Sequence no",
        accessor: "sequence_no",
    },
];

export { tableColumns };
