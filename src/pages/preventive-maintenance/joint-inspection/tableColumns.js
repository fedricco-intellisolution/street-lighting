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
          module="joint inspection"
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
