import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./contexts/Todocontext";
import { useState } from "react";
function DateSelectorPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState("");

  function handleSelect(e) {
    setDate(e.target.value);
    if (e.target.value) {
      navigate(`/${e.target.value}`);
    }
  }

  return (
    <div className="date">
      <h2>Select a date to view or add your tasks</h2>
      <input type="date" value={date} onChange={handleSelect} />
    </div>
  );
}

function DayPage() {
  const navigate = useNavigate();
  const { date } = useParams();

  function goBack() {
    navigate("/");
  }

  return (
    <div>
      <div className="back">
        <button onClick={goBack}>← Back to Date Selector</button>
        <h4>Tasks for {date}</h4>
      </div>
      <AddTodo date={date} />
      <TodoList date={date} />
    </div>
  );
}

export default function App() {
  return (
    <TodoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DateSelectorPage />} />
          <Route path="/:date" element={<DayPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </TodoProvider>
  );
}
