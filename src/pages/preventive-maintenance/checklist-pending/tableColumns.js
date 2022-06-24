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
          route="checklist-pending"
          module="pending checklist"
        />
      );
    },
  },
  {
    Header: "Checklist",
    accessor: "checklist_item.checklist.name",
  },
  {
    Header: "Checklist item",
    accessor: "checklist_item.name",
  },
  {
    Header: "Frequency",
    accessor: "frequency.name",
  },
  {
    Header: "Site",
    accessor: "site.name",
  },
  {
    Header: "Technician",
    accessor: "technician",
  },
];

export { tableColumns };
