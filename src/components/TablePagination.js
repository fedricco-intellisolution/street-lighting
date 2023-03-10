import React, { useEffect } from "react";

import { useTable, usePagination, useSortBy } from "react-table";
import { useLocation } from "react-router-dom";
import { Alert, Col, Table, Pagination, Row, Form } from "react-bootstrap";

export const TablePagination = ({
    columns,
    module,
    parentApi = null,
    rawData,
}) => {
    const location = useLocation();
    const state = location.state;

    const { meta, links, data } = rawData;

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        setPageSize,
        state: { pageSize, pageIndex },
    } = useTable(
        {
            columns,
            data         : data,
            initialState : {
                canNextPage     : links?.next !== null ? true : false,
                canPreviousPage : links?.prev !== null ? true : false,
                currentPage     : meta?.current_page,
                firstPage       : meta?.first,
                lastPage        : meta?.last_page,
                pageIndex       : 0,
                pageSize        : meta?.per_page,
                totalPage       : meta?.last_page,
            },
        },
        useSortBy,
        usePagination
    );

    //
    // Functions
    //

    const gotoPage = (page) => {
        parentApi({ page });
    };

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
                    <div className="alert-message">No {module}</div>
                </Alert>
            )}
            <Row>
                <Col md="6">
                    <span className="mx-2">
                        Page{" "}
                        <strong>
                            {meta?.current_page} of {meta?.last_page}
                        </strong>
                    </span>
                    <span className="ms-3 me-2">Show:</span>
                    <Form.Select
                        className="d-inline-block w-auto"
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </Form.Select>

                    <span className="ms-3 me-2">Go to page:</span>
                    <Form.Control
                        className="d-inline-block"
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            gotoPage(page);
                        }}
                        style={{ width: "75px" }}
                    />
                </Col>
                <Col md="6">
                    <Pagination className="float-end">
                        <Pagination.First
                            onClick={() => gotoPage(meta?.first)}
                            disabled={links?.prev === null}
                        />
                        <Pagination.Prev
                            onClick={() => gotoPage(meta?.current_page - 1)}
                            disabled={links?.prev === null}
                        />
                        <Pagination.Next
                            onClick={() => gotoPage(meta?.current_page + 1)}
                            disabled={links?.next === null}
                        />
                        <Pagination.Last
                            onClick={() => gotoPage(meta?.last)}
                            disabled={links?.next === null}
                        />
                    </Pagination>
                </Col>
            </Row>
        </>
    );
};
