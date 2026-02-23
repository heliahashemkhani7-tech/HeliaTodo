import { useEffect, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_FIRST_TIME":
      return { ...state, firstTime: action.payload };
    case "SET_SECOND_TIME":
      return { ...state, secondTime: action.payload };
    case "RESET":
      return action.payload;
    default:
      return state;
  }
}

export default function EditTodoForm({ todo, onSave, onCancel }) {
  const [state, dispatch] = useReducer(reducer, {
    title: todo.title,
    firstTime: todo.firstTime,
    secondTime: todo.secondTime,
  });
  useEffect(() => {
    dispatch({ type: "RESET", payload: todo });
  }, [todo]);

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ ...todo, ...state });
  }

  return (
    <form className="todo-edit" onSubmit={handleSubmit}>
      <input
        value={state.title}
        onChange={(e) => dispatch({ type: "SET_TITLE", payload: e.target.value })}
      />
      <input
        type="time"
        value={state.firstTime}
        onChange={(e) => dispatch({ type: "SET_FIRST_TIME", payload: e.target.value })}
      />
      <input
        type="time"
        value={state.secondTime}
        onChange={(e) => dispatch({ type: "SET_SECOND_TIME", payload: e.target.value })}
      />

      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}