import { useState } from "react";
import EditTodoForm from "./EditTodoForm";
import { formatTimeToAMPM } from "./timeUtils";
export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
  updateTodo,
}) {
  const [editingId, setEditingId] = useState(null);

  const completedCount = todos.filter((t) => t.isDone).length;
  const progress =
    todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100);

  function handleSave(todo) {
    updateTodo(todo);
    setEditingId(null);
  }

  return (
    <div className="to-do">
      <div className="progress">
        <input type="range" value={progress} max={100} readOnly />
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
                <h4>{todo.title.toUpperCase()}</h4>
                <p>
                  {formatTimeToAMPM(todo.firstTime)} -{" "}
                  {formatTimeToAMPM(todo.secondTime)}
                </p>
                <input
                  type="checkbox"
                  checked={todo.isDone}
                  onChange={() => toggleTodo(todo.id)}
                />
                <button onClick={() => setEditingId(todo.id)}>Edit</button>
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
              <h4>{todo.title.toUpperCase()}</h4>
              <p>
                {formatTimeToAMPM(todo.firstTime)} -{" "}
                {formatTimeToAMPM(todo.secondTime)}
              </p>
              <span className="delete" onClick={() => deleteTodo(todo.id)}>
                ×
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
