import React, { useState } from "react";
import type { UserProps } from "../../types/UserType/UserType";
import Button from "../Button";

interface AddUserProps {
  onAdd: (newUser: UserProps) => void;
  disabled?: boolean; // Add this line
}

const AddUserForm = ({onAdd, disabled}: AddUserProps) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!name || !lastname) return;

    const newUser: UserProps = {
      id: Date.now(), // Simple way to generate a unique ID
      name,
      lastname,
      status: "online", // Default status
    };

    onAdd(newUser);
    setName("");
    setLastname("");
  }

  return (
    <form
      className="flex p-6 my-6 border-purple-200 border rounded-md justify-center"
      onSubmit={handleSubmit}
      action="">

      <input
        disabled={disabled}
        id="firstName"
        placeholder="First Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        disabled={disabled}
        id="lastName"
        placeholder="Last Name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
      <Button
        label="Add User"
        variant="primary"
        type="submit"
        disabled={!!disabled || !name || !lastname}
      />     
    </form>
  )

}

export default AddUserForm;