import { useEffect, useState } from "react";

export default function EditTodoForm({ todo, onSave, onCancel }) {
  const [title, setTitle] = useState(todo.title);
  const [firstTime, setFirstTime] = useState(todo.firstTime);
  const [secondTime, setSecondTime] = useState(todo.secondTime);
  useEffect(() => {
    setTitle(todo.title);
    setFirstTime(todo.firstTime);
    setSecondTime(todo.secondTime);
  }, [todo]);

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      ...todo,
      title,
      firstTime,
      secondTime,
    });
  }

  return (
    <form className="todo-edit" onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input
        type="time"
        value={firstTime}
        onChange={(e) => setFirstTime(e.target.value)}
      />
      <input
        type="time"
        value={secondTime}
        onChange={(e) => setSecondTime(e.target.value)}
      />

      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}
