import React from "react";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Eye } from "react-feather";
import DynamicTable from "../../../components/ui/DynamicTable";
import { status } from "../../../utils/utilities";

export const Todos = () => {
    const sectors = [
        {
            serial_no: "1",
            type: "Installation",
            location: "Marina bay, 018956",
            assignee: "John Doe",
            due_date: "11/20/2023",
            status: "PENDING",
        },
        {
            serial_no: "2",
            type: "Servicing",
            location: "Woodlands, 730001",
            assignee: "Bea Mine",
            due_date: "10/20/2023",
            status: "PENDING",
        },
        {
            serial_no: "3",
            type: "Installation",
            location: "Punggol, 820167",
            assignee: "Bea Mine",
            due_date: "02/20/2023",
            status: "DRAFT",
        },
        {
            serial_no: "4",
            type: "Installation",
            location: "Pasir Ris, 519111",
            assignee: "John Doe",
            due_date: "05/20/2023",
            status: "DRAFT",
        },
        {
            serial_no: "5",
            type: "Servicing",
            location: "Jurong east, 600002",
            assignee: "Jane Doe",
            due_date: "02/20/2023",
            status: "COMPLETED",
        },
    ];
    const tableColumns = [
        {
            Header: "Actions",
            accessor: "actions",
            width: "70px",
            Cell: (cell) => (
                <div>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>View todo</Tooltip>}
                    >
                        <Eye className="align-middle me-1" size={18} />
                    </OverlayTrigger>
                </div>
            ),
        },
        {
            width: "70px",
            Header: () => <div className="text-end">S/N</div>,
            accessor: "serial_no",
            Cell: ({ row }) => (
                <div className="text-end">{row.original.serial_no}</div>
            ),
        },
        {
            Header: "Location",
            accessor: "location",
        },
        {
            Header: "Assignee",
            accessor: "assignee",
        },
        {
            Header: "Status",
            accessor: "status",
            Cell: ({ row }) => {
                return (
                    <Badge pill bg={status(row.original.status)}>
                        {row.original.status}
                    </Badge>
                );
            },
        },
        {
            Header: "Type",
            accessor: "type",
        },
        {
            Header: () => <div className="text-end">Due date</div>,
            accessor: "due_date",
            Cell: ({ row }) => (
                <div className="text-end">{row.original.due_date}</div>
            ),
        },
    ];

    return <DynamicTable data={sectors} columns={tableColumns} />;
};
