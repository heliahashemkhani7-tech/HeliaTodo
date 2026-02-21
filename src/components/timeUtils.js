function timeToMinutes(time) {
  if (!time) return 0;
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function sortTodosByStartTime(todos) {
  return [...todos].sort(
    (a, b) => timeToMinutes(a.firstTime) - timeToMinutes(b.firstTime)
  );
}

function formatTimeToAMPM(time) {
  if (!time) return "";

  let [hours, minutes] = time.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

export { sortTodosByStartTime, formatTimeToAMPM  , timeToMinutes};
