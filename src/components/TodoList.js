import { useState } from "react";
import EditTodoForm from "./EditTodoForm";
import { formatTimeToAMPM } from "./timeUtils";
import { useTodos } from "../contexts/Todocontext";
import { useParams } from "react-router-dom";

export default function TodoList() {
  const [editingId, setEditingId] = useState(null);
  const { todosByDate, toggleTodo, deleteTodo, updateTodo } = useTodos();
  const { date } = useParams();

  // همیشه fallback بده
  const todos = todosByDate[date] || [];

  const completedCount = todos.filter((t) => t.isDone).length;
  const progress =
    todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100);

  function handleSave(todo) {
    updateTodo(date, todo); // 🔥 date پاس داده می‌شود
    setEditingId(null);
  }

  return (
    <div className="to-do">
      <div className="progress">
        <input
          type="range"
          value={progress}
          max={100}
          readOnly
          style={{
            width: "100%",
            height: "8px",
            borderRadius: "4px",
            appearance: "none",
            outline: "none",
            cursor: "pointer",
            background: `linear-gradient(
              to right,
              rgba(244, 63, 63, 0.69) 0%,
              rgb(188, 85, 69) ${progress * 0.5}%,
              rgb(129,0,0) ${progress}%,
              #ddd ${progress}%,
              #ddd 100%
            )`,
          }}
        />
        <h3>You done {progress}% of your tasks</h3>
      </div>

      <div className="task">
        <h1>Tasks</h1>
        {todos
          .filter((todo) => !todo.isDone)
          .map((todo) =>
            editingId === todo.id ? (
              <EditTodoForm
                key={todo.id}
                todo={todo}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div key={todo.id} className="todo-item">
                <div className="task-info">
                  <h4>{todo.title.toUpperCase()}</h4>
                  <p>
                    {formatTimeToAMPM(todo.firstTime)} -{" "}
                    {formatTimeToAMPM(todo.secondTime)}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={todo.isDone}
                  onChange={() => toggleTodo(date, todo.id)}
                />
                <button className="edit" onClick={() => setEditingId(todo.id)}>
                  Edit
                </button>
              </div>
            )
          )}
      </div>

      <div className="completed">
        <h1>Completed</h1>
        {todos
          .filter((todo) => todo.isDone)
          .map((todo) => (
            <div key={todo.id} className="todo-item">
              <div className="task-info">
                <h4>{todo.title.toUpperCase()}</h4>
                <p>
                  {formatTimeToAMPM(todo.firstTime)} -{" "}
                  {formatTimeToAMPM(todo.secondTime)}
                </p>
              </div>
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => toggleTodo(date, todo.id)}
              />
              <span
                className="delete"
                onClick={() => deleteTodo(date, todo.id)}
              >
                ×
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
