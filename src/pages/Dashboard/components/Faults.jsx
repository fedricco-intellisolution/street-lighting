import React from "react";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Eye } from "react-feather";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../../../components/ui/DynamicTable";
import { status } from "../../../utils/utilities";

export const Faults = () => {
    const navigate = useNavigate();

    const sectors = [
        {
            id: "1",
            serial_no: "1",
            type: "Installation",
            location: "Punggol, 820167",
            assignee: "Bea Mine",
            reported_by: "Cherry Blossom",
            reported_date: "04/20/2023",
            status: "NEW",
            response_time: "",
        },
        {
            id: "2",
            serial_no: "2",
            type: "Installation",
            location: "Pasir Ris, 519111",
            assignee: "John Doe",
            reported_by: "Simon Sais",
            reported_date: "02/20/2023",
            status: "IN PROGRESS",
            response_time: "",
        },
        {
            id: "3",
            serial_no: "3",
            type: "Installation",
            location: "Marina bay, 018956",
            assignee: "John Doe",
            reported_by: "Simon Sais",
            reported_date: "08/20/2023",
            status: "RESOLVED",
            response_time: "1 hour, 10 mins",
        },
        {
            id: "4",
            serial_no: "4",
            type: "Installation",
            location: "Jurong east, 600002",
            assignee: "Bea Mine",
            reported_by: "Cherry Blossom",
            reported_date: "02/20/2023",
            status: "NEW",
            response_time: "",
        },
        {
            id: "5",
            serial_no: "5",
            type: "Installation",
            location: "Jurong east, 600002",
            assignee: "John Doe",
            reported_by: "Cherry Blossom",
            reported_date: "12/20/2023",
            status: "RESOLVED",
            response_time: "2 hours, 18 mins",
        },
    ];
    const tableColumns = [
        {
            Header: "Actions",
            accessor: "actions",
            width: "70px",
            Cell: ({ row }) => (
                <div>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>View fault</Tooltip>}
                    >
                        <Eye
                            className="align-middle me-1"
                            size={18}
                            onClick={() =>
                                navigate(`fault/list/view/${row.original.id}`)
                            }
                        />
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
            Header: () => <div className="text-end">Response time</div>,
            accessor: "response_time",
            Cell: ({ row }) => (
                <div className="text-end">{row.original.response_time}</div>
            ),
        },
        // {
        //     Header: "Reported by",
        //     accessor: "reported_by",
        // },
        {
            Header: () => <div className="text-end">Reported date</div>,
            accessor: "reported_date",
            Cell: ({ row }) => (
                <div className="text-end">{row.original.reported_date}</div>
            ),
        },
    ];

    return <DynamicTable data={sectors} columns={tableColumns} />;
};
