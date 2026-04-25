import React, {useState} from "react";

interface formState {
  username: string,
  email: string,
  role: string
}

interface FormErrors {
  username?: string,
  email?: string,
  role?: string
}



const RegistrationForm = () => {
  const [formData, setFormData] = useState<formState>({
    username:"",
    email:"",
    role: "Developer"
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (name: string, value: string) => {
    let errMessage = "";

    if (name === "username") {
      if(value.length < 3) errMessage = "Name must be at least 3 characters."
    }

    if (name === "email" ) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(value)) errMessage = "Please enter a valid email address."
    }

    setErrors((prev) => ({ ...prev, [name]: errMessage }));
  }

  const handleFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>    
  ) => {
    const {name, value} = e.target

    setFormData((prev) => ({
      ...prev,      // Copy all existing fields
      [name]: value // Overwrite the one that changed
    }))

    // Run validation
    validate(name, value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!errors.username && !errors.email && formData.username) {
      alert("Form Submitted Successfully!");
    } else {
      alert("Please fix errors before submitting.");
    }
  };



  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '300px' }}>
      <div>
      <input 
        type="text"  
        name="username"
        placeholder="Name"
        value={formData.username}
        onChange={handleFormData}
        />
      <p>{errors.username && <span>{errors.username}</span>}</p>
      </div>
      <div>
      <input 
        type="text"  
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleFormData}
        />
        <p>{errors.email && <span>{errors.email}</span>}</p>
        </div>
      <select 
        name="role" 
        id="" 
        value={formData.role}
        onChange={handleFormData}
        >
        <option value="Developer">Developer</option>
        <option value="Manager">Manager</option>
      </select>

      <div>
        <p><strong>Preview:</strong></p>
        <pre>{JSON.stringify(formData)}</pre>
      </div>

      <button type="submit">Submit</button>

    </form>
  )
}

export default RegistrationForm;