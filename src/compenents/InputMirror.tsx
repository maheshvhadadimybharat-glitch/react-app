import React, { useState } from "react";

const InputMirror = () => {  
  const [text, setText] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value.toUpperCase());
  }
  
  return (
    <div>
      <input 
        type="text" 
        placeholder="Type text here..."
        onChange={handleInputChange}
        />  
      <div>Output Text : <span>{text}</span></div>
    </div>
  );
} 

export default InputMirror;