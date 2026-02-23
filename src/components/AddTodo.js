import { useReducer } from "react";
import { timeToMinutes } from "./timeUtils";
import { useTodos } from "../contexts/Todocontext";
import { useParams } from "react-router-dom";

function reducer(state, action) {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_FIRST_TIME":
      return { ...state, firstTime: action.payload };
    case "SET_SECOND_TIME":
      return { ...state, secondTime: action.payload };
    case "RESET":
      return { title: "", firstTime: "", secondTime: "" };
    default:
      return state;
  }
}

export default function AddTodo() {
  const { addTodo } = useTodos();
  const { date } = useParams();

  const [state, dispatch] = useReducer(reducer, {
    title: "",
    firstTime: "",
    secondTime: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const { title, firstTime, secondTime } = state;
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

    addTodo(date, newTodo);
    dispatch({ type: "RESET" });
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title..."
          value={state.title}
          onChange={(e) =>
            dispatch({ type: "SET_TITLE", payload: e.target.value })
          }
        />

        <input
          type="time"
          value={state.firstTime}
          onChange={(e) =>
            dispatch({ type: "SET_FIRST_TIME", payload: e.target.value })
          }
        />

        <input
          type="time"
          value={state.secondTime}
          onChange={(e) =>
            dispatch({ type: "SET_SECOND_TIME", payload: e.target.value })
          }
        />

        <button
          disabled={!state.title || !state.firstTime || !state.secondTime}
        >
          Add
        </button>
      </form>
    </div>
  );
}
