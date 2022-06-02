import React, { useEffect } from "react";

import { useTable, usePagination, useSortBy } from "react-table";
import { useLocation } from "react-router-dom";
import { Alert, Table } from "react-bootstrap";

export const ChecklistPreviewTable = ({
    columns,
    parentApi = null,
    rawData,
}) => {
    const location = useLocation();
    const state = location.state;

    const { meta, data } = rawData;

    const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
        useTable(
            {
                columns,
                data: data,
            },
            useSortBy,
            usePagination
        );

    //
    // UseEffects
    //

    useEffect(() => {
        if (state?.open) {
            parentApi();
        }
        window.history.replaceState(null, "");
    }, [state, parentApi]);

    return (
        <>
            {data.length > 0 && (
                <Table striped bordered {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup, i) => (
                            <tr
                                index={i}
                                {...headerGroup.getHeaderGroupProps()}
                            >
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps()
                                        )}
                                    >
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell, index, row) => {
                                        if (index === 0 && meta) {
                                            return (
                                                <td key={index}>
                                                    {meta.current_page > 1
                                                        ? (meta.current_page -
                                                              1) *
                                                              meta.per_page +
                                                          i +
                                                          1
                                                        : i + 1}
                                                </td>
                                            );
                                        }
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
            {data.length === 0 && (
                <Alert variant="warning">
                    <div className="alert-message">Nothing to preview</div>
                </Alert>
            )}
        </>
    );
};
