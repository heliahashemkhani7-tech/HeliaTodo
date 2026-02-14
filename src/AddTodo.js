import { useState } from "react";
import { timeToMinutes, sortTodosByStartTime } from "./timeUtils";

export default function AddTodo({ setTodos }) {
  const [title, setTitle] = useState("");
  const [firstTime, setFirstTime] = useState("");
  const [secondTime, setSecondTime] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !firstTime || !secondTime) return;

    if (
      timeToMinutes(secondTime) <= timeToMinutes(firstTime) &&
      secondTime !== "00:00"
    ) {
      alert("End time must be after start time");
      return;
    }

    const newTodo = {
      id: crypto.randomUUID(),
      title,
      firstTime,
      secondTime,
      isDone: false,
    };

    setTodos((prev) => sortTodosByStartTime([...prev, newTodo]));

    setTitle("");
    setFirstTime("");
    setSecondTime("");
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

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

        <button disabled={!title || !firstTime || !secondTime}>Add</button>
      </form>
    </div>
  );
}
