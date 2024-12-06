import {
    AiOutlineSortAscending,
    AiOutlineSortDescending,
  } from "react-icons/ai";
  import {
    useTable,
    Column,
    TableOptions,
    useSortBy,
    usePagination,
  } from "react-table";
  
  function TableHOC<T extends object>(
    columns: Column<T>[],
    data: T[],
    containerClassname: string,
    heading: string,
    showPagination: boolean = false
  ) {
    return function HOC() {
      const options: TableOptions<T> = {
        columns,
        data,
        initialState: {
          pageSize: 5,
        },
      };
  
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageCount,
        state: { pageIndex },
      } = useTable(options, useSortBy, usePagination);
  
      return (
        <div className={containerClassname}>
          <h2 className="heading">{heading}</h2>
  
          <table className="table" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render("Header")}
                      {column.isSorted && (
                        <span>
                          {column.isSortedDesc ? (
                            <AiOutlineSortDescending />
                          ) : (
                            <AiOutlineSortAscending />
                          )}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
  
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
  
          {showPagination && (
            <div className="table_pagination">
              <button
                style={{
                  color: !canPreviousPage ? "black" : "white",
                }}
                disabled={!canPreviousPage}
                onClick={previousPage}
              >
                Prev
              </button>
              <span>{`${pageIndex + 1} of ${pageCount}`}</span>
              <button
                style={{
                  color: !canNextPage ? "black" : "white",
                }}
                disabled={!canNextPage}
                onClick={nextPage}
              >
                Next
              </button>
            </div>
          )}
        </div>
      );
    };
  }
  
  export default TableHOC;