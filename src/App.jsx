import React from 'react';
import Todo from './component/Todo';
import "./App.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
const App = () => {
  return (
    <div className='todo'>
      <Todo />
    </div>
  );
};

export default App;