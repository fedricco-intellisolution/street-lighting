import { Table } from "react-bootstrap";
import { useTable, usePagination } from "react-table";

const DynamicTableNoPagination = (props) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
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
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {props.data && props.data.length < 1 && (
            <tr>
              <td colSpan={props.columns.length}>No records found</td>
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
    </>
  );
};

export default DynamicTableNoPagination;
