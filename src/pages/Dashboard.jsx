// /Users/aarondeniz/programming/fsd/habit/src/pages/Dashboard.jsx
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HabitList from "../components/HabitList";
import { addHabit, deleteHabit, toggleComplete } from "../redux/habitSlice";

const categories = ["Health", "Study", "Fitness", "Finance", "Mindfulness"];

const Dashboard = () => {
  const habits = useSelector((state) => state.habit.habits);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const completedToday = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return habits.filter((habit) => habit.completedDates.includes(today)).length;
  }, [habits]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }

    dispatch(addHabit(title, category));
    setTitle("");
    setCategory(categories[0]);
  };

  const handleToggle = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteHabit(id));
  };

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card-surface p-5 md:col-span-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Track your next win</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Create habits and mark progress daily.</p>
          <form onSubmit={handleSubmit} className="mt-4 grid gap-3 sm:grid-cols-3">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Habit title"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-900"
            />
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-900"
            >
              {categories.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Add Habit
            </button>
          </form>
        </div>
        <div className="card-surface p-5">
          <p className="text-sm text-slate-500 dark:text-slate-400">Completed today</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-400">{completedToday}</p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">of {habits.length} total habits</p>
        </div>
      </div>

      <HabitList habits={habits} onToggleComplete={handleToggle} onDeleteHabit={handleDelete} />
    </section>
  );
};

export default Dashboard;
