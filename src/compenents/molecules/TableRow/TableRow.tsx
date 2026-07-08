import React from "react";
import { Checkbox } from "../../atoms/Input";
import TableCell from "../../atoms/TableCell/TableCell";
import RowAction from "../RowAction/RowAction";

const TableRow = ({
  row,
  selectable= false,
  actions = false,
  serialnumber = false,
  index = 0
}) => {
  return (

      <tr>
        {selectable && (
          <TableCell>
            <Checkbox/>
          </TableCell>
        )}

        {serialnumber && (
          <TableCell>
            {index + 1}
          </TableCell>
        )}

        {Object.values(row).map((value, index) => (       
        <TableCell key={index}>
          {value}
        </TableCell>
      ))}

       {/* Action column */}
       {actions && (
        <TableCell align="right">
          <RowAction
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row)}
          />
        </TableCell>
       )}
      

      </tr>
  );
} 

export default TableRow;