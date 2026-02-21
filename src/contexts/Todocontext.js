import { createContext, useContext, useEffect, useState } from "react";
import { sortTodosByStartTime } from "../components/timeUtils";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todosByDate, setTodosByDate] = useState(() => {
    const stored = localStorage.getItem("todosByDate");
    return stored ? JSON.parse(stored) : {};
  });

  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().slice(0, 10);
  });
  const todos = todosByDate[selectedDate] || [];

  useEffect(() => {
    localStorage.setItem("todosByDate", JSON.stringify(todosByDate));
  }, [todosByDate]);

  function toggleTodo(id) {
    setTodosByDate((prev) => {
      const dayTodos = prev[selectedDate].map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      );
      return { ...prev, [selectedDate]: dayTodos };
    });
  }

  function deleteTodo(id) {
    setTodosByDate((prev) => {
      const dayTodos = prev[selectedDate].filter((todo) => todo.id !== id);
      return { ...prev, [selectedDate]: dayTodos };
    });
  }

  function updateTodo(updatedTodo) {
    setTodosByDate((prev) => {
      const dayTodos = prev[selectedDate].map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      return { ...prev, [selectedDate]: sortTodosByStartTime(dayTodos) };
    });
  }

  function addTodo(newTodo) {
    setTodosByDate((prev) => {
      const dayTodos = prev[selectedDate]
        ? [...prev[selectedDate], newTodo]
        : [newTodo];
      return { ...prev, [selectedDate]: sortTodosByStartTime(dayTodos) };
    });
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        todosByDate,
        setTodosByDate,
        selectedDate,
        setSelectedDate,
        toggleTodo,
        deleteTodo,
        updateTodo,
        addTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodoContext);
}
