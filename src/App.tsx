import React, { useState } from "react";
import "./App.css";
import InputField from "./components/input-field/InputField";
import TodoList from "./components/todo-list/TodoList";
import { Todo } from "./models/model";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div className="App">
      <span className="heading">TaskBox</span>
      <InputField todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
