import {useState} from "react";

interface counterProps {
    initialValue: number;
    max?:number;
    min?:number;
}

const Counter = ({initialValue, min=0, max=100}: counterProps) => {
    
    const [count, setCount] = useState(initialValue)
    
    console.log(count);

    const increment = () => {
        if(count < max) 
            setCount(prev => prev + 1)
    }

    const decrement = () => {
        if(count > min)
            setCount(prev => prev -1)
    }

    return (
        <div>
            <h1>Current Count: {count}</h1>
            <p style={{ fontSize: "0.8rem", color: "#666" }}>
                Range: {min} to {max} (Started at: {initialValue})
            </p>

            <button onClick={decrement} disabled={count <= min}> - </button>
            <button onClick={increment} disabled={count >= max}> + </button>

            <button onClick={() => setCount(initialValue)} style={{ marginLeft: '10px' }}>
                Reset to {initialValue}
            </button>
        </div>
    )
}

export default Counter