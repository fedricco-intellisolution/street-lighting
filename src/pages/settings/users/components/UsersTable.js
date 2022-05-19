import { useState } from "react";
import { Col, Form, Pagination, Row, Table } from "react-bootstrap";
import { Edit2, Trash } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import { useTable, usePagination } from "react-table";
import DeleteUserModal from "./DeleteUserModal";

const UsersTable = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns: props.columns,
            data: props.data,
            initialState: { pageIndex: 0 },
        },
        usePagination
    );

    return (
        <>
            <Table striped bordered {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {props.data && props.data.length < 1 &&
                        <tr className='text-center'>
                            <td colSpan={4}>No records found</td>
                        </tr>
                    }
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {

                                    if (cell.column.id === 'sequence_no') {
                                        return <td key={cell.column.id}>{cell.row.index + 1}</td>
                                    }

                                    if (cell.column.id === 'actions') {
                                        return (
                                            <td className="table-action" key={cell.column.id} >
                                                <Edit2
                                                    className="align-middle me-1"
                                                    size={18}
                                                    onClick={() => navigate(location.pathname + '/' + cell.row.original.id)}
                                                />
                                                <Trash
                                                    className="align-middle"
                                                    size={18}
                                                    onClick={() => {
                                                        setShowDeleteModal(true)
                                                    }}
                                                />
                                            </td>
                                        )
                                    }
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <Row>
                <Col md="6">
                    <span className="mx-2">
                        Page{" "}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
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
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(page);
                        }}
                        style={{ width: "75px" }}
                    />
                </Col>
                <Col md="6">
                    <Pagination className="float-end">
                        <Pagination.First
                            onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}
                        />
                        <Pagination.Prev
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                        />
                        <Pagination.Next
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                        />
                        <Pagination.Last
                            onClick={() => gotoPage(pageCount - 1)}
                            disabled={!canNextPage}
                        />
                    </Pagination>
                </Col>
            </Row>
            <DeleteUserModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} variant="danger" />
        </>
    )
}
export default UsersTable;