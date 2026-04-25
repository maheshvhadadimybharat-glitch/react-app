import React from "react";
import styles from "./RowAction.module.css";
import { Button } from "../../atoms/Button";
import { MdOutlineDelete, MdOutlineModeEditOutline } from "react-icons/md";

const RowAction = ({
  onEdit,
  OnDelete
}) => {
  return(
    <div className={`${styles.rowActions} flex items-center justify-center`}>
      <Button
      icon={MdOutlineModeEditOutline} 
      iconPosition="left" 
      variant="blue-outlined"
      size="sm" 
      onClick={onEdit}
      />

      <Button 
      icon={MdOutlineDelete} 
      iconPosition="left" 
      variant="danger-outlined"
      size="sm" 
      onClick={OnDelete}
      />
    </div>
  )
}

export default RowAction;

