import { useEffect, useState } from "react";
import "./index.css";
import { sortTodosByStartTime } from "./timeUtils";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    try {
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function updateTodo(updatedTodo) {
    setTodos((prev) =>
      sortTodosByStartTime(
        prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      )
    );
  }

  return (
    <>
      <AddTodo setTodos={setTodos} />
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}
