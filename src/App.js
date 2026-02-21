import "./index.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { TodoProvider, useTodos } from "./contexts/Todocontext.js";

export default function App() {
  return (
    <TodoProvider>
      <DateSelector />
      <AddTodo />
      <TodoList />
    </TodoProvider>
  );
}

function DateSelector() {
  const { selectedDate, setSelectedDate } = useTodos();

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>
        Select Date:{" "}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </label>
    </div>
  );
}