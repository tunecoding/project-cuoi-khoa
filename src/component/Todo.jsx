import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
const Todo = () => {
  const [todos, setTodos] = useState(() => {
    const localStorageTodos = localStorage.getItem("todos");
    return localStorageTodos ? JSON.parse(localStorageTodos) : [];
  });
  const [todoDefault, setTodoDefault] = useState("");
  const [usedFt, setUsedFt] = useState(() => {
    const storedFt = localStorage.getItem("usedFt");
    return storedFt || "All";
  });
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  useEffect(() => {
    localStorage.setItem("usedFt", usedFt);
  }, [usedFt]);
  const handleChanges = (event) => {
    setTodoDefault(event.target.value);
  };
  const handleAdds = () => {
    if (todoDefault.trim() === "") {
      alert("NO TO DO DETECTED!!!!");
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: todoDefault,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodoDefault("");
  };
  const handleToggleDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const handleDeleteEach = (id) => {
    setTodos((prevTodos) => prevTodos.ft((todo) => todo.id !== id));
  };
  const handleDeleteAll = () => {
    setTodos([]);
  };
  const handleFtChanges = (ft) => {
    setUsedFt(ft);
  };
  const ftedTodos = () => {
    if (usedFt === "Incompleted") {
      return todos.ft((todo) => !todo.completed);
    } else if (usedFt === "Completed") {
      return todos.ft((todo) => todo.completed);
    } else {
      return todos;
    }
  };
  return (
    <div>
      <h1>#todo</h1>
      <div className="fts">
        <Stack direction="row" spacing={2} className="btn-3">
          <Button
            onClick={() => handleFtChanges("")}
            size="large"
            fontSize="80px"
          >
            All
          </Button>
          <Button onClick={() => handleFtChanges("")}>Active</Button>
          <Button onClick={() => handleFtChanges("")}>Completed</Button>
        </Stack>
      </div>
      <div className="container">
        <input
          type="text"
          value={todoDefault}
          onChange={handleChanges}
          placeholder="add details"
          style={{
            borderRadius: "10px",
          }}
          className="placeholder"
        />
        <Button
          style={{
            borderRadius: "5px",
          }}
          variant="contained"
          className="add-btn"
          onClick={handleAdds}
        >
          Add
        </Button>
      </div>
      <div>
        <h2>{usedFt}</h2>
        <ul>
          {ftedTodos().map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleDone(todo.id)}
              />
              {todo.text}
              <button
                onClick={() => handleDeleteEach(todo.id)}
                style={{
                  borderRadius: "5px",
                  margin: "10px",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        variant="contained"
        className="deleteAll-button"
        onClick={handleDeleteAll}
      >
        🗑️ delete all
      </button>
    </div>
  );
};

export default Todo;
