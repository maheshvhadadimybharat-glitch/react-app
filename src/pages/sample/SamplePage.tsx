import React from "react";
import ProfileCard from "../../compenents/ProfileCard";
import Button from "../../compenents/Button";
import { useState } from "react";
import Counter from "../../compenents/Counter";
import InputMirror from "../../compenents/InputMirror";
import RegistrationForm from "../../compenents/RegistrationForm";
import TodoList from "../../compenents/TodoList";
import UserList from "../../compenents/UserList";
import UserSearch from "../../compenents/UserSearch";
import PostList from "../../compenents/PostList";

const SamplePage = () => {

    const handleAlert = (message: string) => {
        alert(`Parent received: ${message}`);
    };

    // Initialize state at 0
  const [count, setCount] = useState<number>(0);

  const MAX = 5;
  const MIN = 0;

    const handleIncrement = () => {
        if (count < MAX) {
        setCount(count + 1);
        }
    };

  const handleDecrement = () => {
    if (count > MIN) {
      setCount(count - 1);
    }
  };

    return (
        <div>
            <h1>Sample Page</h1>
            <hr></hr>

            <ProfileCard 
                name="Mahesh" 
                role="Frontend Developer" 
                isAvailable={false} 
                onMessage={handleAlert}
                />
            <ProfileCard 
                name="Manish" 
                role="UI Developer" 
                isAvailable={false}
                onMessage={handleAlert}
                />

            <h1>Value: {count}</h1>

            <Button
                onClick={handleDecrement}
                label="Descrement"
                variant=""
            />

            <Button
                onClick={handleIncrement}
                label="Increment"
                variant=""
            />

            {count === MAX && <p style={{ color: "red" }}>Maximum limit reached!</p>}
            {count === MIN && <p style={{ color: "gray" }}>Minimum limit reached!</p>}

            <hr></hr>

            <h2>Counter Sample</h2>
            <Counter initialValue={90} min={5} max={99}/>
            
            <hr />

            <InputMirror/>

            <hr/>

           
            <RegistrationForm/>

            <hr />

            <TodoList/>

            <hr/>

            <UserList/>

            <hr />

            <UserSearch/>

            <hr />

            <PostList/>

        </div>
    )
}

export default SamplePage;