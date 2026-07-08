import React from "react";
import { Checkbox } from "../../atoms/Input";
import TableCell from "../../atoms/TableCell/TableCell";

const TableHeaderRow = ({
  columns,
  selectable=false,
  actions = false,
  serialnumber = false
}) => {
  return (
      <tr>
        {selectable && (
          <TableCell as="th">
            <Checkbox/>
          </TableCell>
        )}

        {serialnumber && (
          <TableCell as="th">
            Sr. No.
          </TableCell>
        )}

        {
          columns.map((col) =>{
            return(
            <TableCell as="th" key={col.key}>
              {col.label}
            </TableCell>
          )})
        }
        {actions && (
        <th scope="col" aria-label="Actions">
          Actions
        </th>
        )}
      </tr>
  );
} 

export default TableHeaderRow;