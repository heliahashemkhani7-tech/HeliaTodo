import { createContext, useContext, useEffect, useState } from "react";
import { sortTodosByStartTime } from "../components/timeUtils";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todosByDate, setTodosByDate] = useState(() => {
    const stored = localStorage.getItem("todosByDate");
    return stored ? JSON.parse(stored) : {};
  });


  useEffect(() => {
    localStorage.setItem("todosByDate", JSON.stringify(todosByDate));
  }, [todosByDate]);

  function toggleTodo(date, id) {
    setTodosByDate((prev) => {
      const dayTodos = (prev[date] || []).map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      );
      return { ...prev, [date]: dayTodos };
    });
  }

  function deleteTodo(date, id) {
    setTodosByDate((prev) => {
      const dayTodos = (prev[date] || []).filter((todo) => todo.id !== id);
      return { ...prev, [date]: dayTodos };
    });
  }

  function updateTodo(date, updatedTodo) {
    setTodosByDate((prev) => {
      const dayTodos = (prev[date] || []).map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      return { ...prev, [date]: sortTodosByStartTime(dayTodos) };
    });
  }

  function addTodo(date, newTodo) {
    setTodosByDate((prev) => {
      const dayTodos = prev[date] ? [...prev[date], newTodo] : [newTodo];
      return { ...prev, [date]: sortTodosByStartTime(dayTodos) };
    });
  }

  return (
    <TodoContext.Provider
      value={{
        todosByDate,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodoContext);
}
