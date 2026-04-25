import React from "react";
import { useState } from "react";
import TableHeaderRow from "../../molecules/TableHeaderRow/TableHeaderRow";
import TableRow from "../../molecules/TableRow/TableRow";
import styles from "./Table.module.css";
import Pagination from "../../molecules/Pagination/Pagination";

const Table = ({
  columns,
  data,
  selectable = false,
  actions = false,
  serialnumber=false,
  pagination = false,
  rowsPerPage = 5
}) => {

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = pagination
    ? Math.ceil(data.length / rowsPerPage)
    : 1;

  const displayedData = pagination
    ? data.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      )
    : data;

  return(
    <div className={`${styles.tableResponsive}`}>
      <table>
        <thead>
          <TableHeaderRow 
          selectable={selectable}
          columns={columns}
          actions={actions}
          serialnumber={serialnumber}
          />
        </thead>
        <tbody>
          {displayedData.map((row, index) => {  
          return (
            <TableRow
              row={row}
              index={
                pagination
                  ? (currentPage - 1) * rowsPerPage + index
                  : index
              }
              selectable={selectable}
              actions={actions}
              serialnumber={serialnumber}
            />
          );
        })}

        </tbody>
      </table>

      {pagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage ={rowsPerPage}
          totalItems={data.length}
          onPageChange={setCurrentPage}

        />
      )}
    </div>
  )
}

export default Table;