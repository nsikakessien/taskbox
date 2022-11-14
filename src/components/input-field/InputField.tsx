import React, { useRef, useState } from "react";
import { Todo } from "../../models/model";
import "../styles.css";

export interface TodoProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const InputField: React.FC<TodoProps> = ({ todos, setTodos }) => {
  const [todo, setTodo] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, completed: false }]);
      setTodo("");
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTodo(e.target.value);

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
        inputRef.current?.blur();
      }}
      className="input"
    >
      <input
        ref={inputRef}
        type="input"
        value={todo}
        onChange={handleChange}
        placeholder="Enter a Task"
        className="input__box"
      />
      <button className="add" type="submit">
        Add
      </button>
    </form>
  );
};

export default InputField;
