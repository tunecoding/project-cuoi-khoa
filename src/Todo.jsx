import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Todo = () => {
  const [todos, setTodos] = useState(() => {
    const localStorageTodos = localStorage.getItem("todos");
    return localStorageTodos ? JSON.parse(localStorageTodos) : [];
  });

  const [todoText, setTodoText] = useState("");
  const [usedFilter, setusedFilter] = useState(() => {
    const storedFilter = localStorage.getItem("usedFilter");
    return storedFilter || "All";
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("usedFilter", usedFilter);
  }, [usedFilter]);

  const handleInputChange = (event) => {
    setTodoText(event.target.value);
  };

  const handleAddTodo = () => {
    if (todoText.trim() === "") {
      alert("NO TODO DETECTED");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: todoText,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTodoText("");
  };

  const handleToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleDeleteAll = () => {
    setTodos([]);
  };

  const handleFilterChange = (filter) => {
    setusedFilter(filter);
  };

  const filteredTodos = () => {
    if (usedFilter === "Incompleted") {
      return todos.filter((todo) => !todo.completed);
    } else if (usedFilter === "Completed") {
      return todos.filter((todo) => todo.completed);
    } else {
      return todos;
    }
  };

  return (
    <div>
      <h1>#todo</h1>
      <div className="filters">
        <Stack direction="row" spacing={2} className="btn-3">
          <Button
            onClick={() => handleFilterChange("")}
            size="large"
            fontSize="80px"
          >
            All
          </Button>
          <Button onClick={() => handleFilterChange("")}>Active</Button>
          <Button onClick={() => handleFilterChange("")}>Completed</Button>
        </Stack>
      </div>
      <div className="container">
        <input
          type="text"
          value={todoText}
          onChange={handleInputChange}
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
          className="add-button"
          onClick={handleAddTodo}
        >
          Add
        </Button>
      </div>

      <div>
        <h2>{usedFilter}</h2>
        <ul>
          {filteredTodos().map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id)}
              />
              {todo.text}
              <button
                onClick={() => handleDeleteTodo(todo.id)}
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
        className="delete-all-button"
        onClick={handleDeleteAll}
      >
        🗑️ delete all
      </button>
    </div>
  );
};

export default Todo;
