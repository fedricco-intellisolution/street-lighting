import React, { forwardRef, useEffect, useRef } from "react";
import { Col, Form, Pagination, Row, Table } from "react-bootstrap";
import { useTable, usePagination, useRowSelect } from "react-table";



const DynamicTable = (props) => {

  const {
    columns,
    data,
    className,
    withCheckbox,
    setSelectedFlatRows,
    hiddenColumns
  } = props

  const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);
    
    return (
      <>
        <Form.Check
          type="checkbox"
          ref={resolvedRef}
          {...rest}
        />
      </>
    );
  }
  );
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
    selectedFlatRows,
    state: { pageIndex, pageSize},
  } = useTable(
    {
      columns: columns,
      data: data,
      initialState: {
        pageIndex: 0,
        hiddenColumns: hiddenColumns ? hiddenColumns : []
      },
    },
    usePagination,
    useRowSelect,
    (hooks) => {
        if (withCheckbox) {
            hooks.visibleColumns.push((columns) => [
              // Let's make a column for selection
              {
                id: "selection",
                // The header can use the table's getToggleAllRowsSelectedProps method
                // to render a checkbox
                Header: ({ getToggleAllRowsSelectedProps }) => (
                  <div>
                    <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                  </div>
                ),
                // The cell can use the individual row's getToggleRowSelectedProps method
                // to the render a checkbox
                Cell: ({ row }) => (
                  <div>
                    <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                  </div>
                ),
              },
              ...columns,
            ]);
        }

      }
    );
  
  useEffect(() => {
    if (setSelectedFlatRows) {
          setSelectedFlatRows(selectedFlatRows)
    } 
  
  },[setSelectedFlatRows, selectedFlatRows])
  
  return (
    <>
      <Table striped bordered responsive {...getTableProps()} className={className}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th width={column.width} {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {data && data.length < 1 && (
            <tr>
              <td colSpan={columns.length}>No records found</td>
            </tr>
          )}
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className={
                        cell.column.id === "actions" ? "table-action" : ""
                      }
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
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
    </>
  );
};
export default DynamicTable;
