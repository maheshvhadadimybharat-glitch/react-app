import React, {useState} from "react";

const TodoList = () => {
    const [task, setTask] = useState("");
    const [list, setList] = useState<string[]>([]);

    const addTask = () => {
        if(task.trim()) {
        setList([...list, task]);
        setTask("");
        }
    }

    const removeItem = (index: number) => {
        // 2. Filter returns a NEW array, which React loves
        const newList = list.filter((_, i) => i !== index);
        setList(newList);
    };

    return (
        <div style={{ padding: "20px" }}>
      <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="New task..." />
      <button onClick={addTask}>Add</button>

      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item} <button onClick={() => removeItem(index)}>x</button>
          </li>
        ))}
      </ul>
    </div>
    )
}

export default TodoList;