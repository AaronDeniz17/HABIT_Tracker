// /Users/aarondeniz/programming/fsd/habit/src/components/HabitCard.jsx
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { updateHabit } from "../redux/habitSlice";

const todayKey = () => new Date().toISOString().split("T")[0];

const HabitCard = ({ habit, onToggleComplete, onDeleteHabit }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(habit.title);

  const completedToday = habit.completedDates.includes(todayKey());

  const streakClass = useMemo(() => {
    if (habit.streak > 5) {
      return "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300";
    }
    return "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300";
  }, [habit.streak]);

  const handleDelete = () => {
    const accepted = window.confirm("Delete this habit?");
    if (accepted) {
      onDeleteHabit(habit.id);
    }
  };

  const handleSaveTitle = () => {
    const nextTitle = draftTitle.trim();
    if (!nextTitle) {
      setDraftTitle(habit.title);
      setIsEditing(false);
      return;
    }
    dispatch(updateHabit({ id: habit.id, changes: { title: nextTitle } }));
    setIsEditing(false);
  };

  return (
    <article className={`card-surface p-4 hover:-translate-y-1 ${completedToday ? "opacity-80" : "opacity-100"}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          {isEditing ? (
            <input
              value={draftTitle}
              onChange={(event) => setDraftTitle(event.target.value)}
              onBlur={handleSaveTitle}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSaveTitle();
                }
              }}
              className="rounded-lg border border-slate-300 px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-800"
              autoFocus
            />
          ) : (
            <h3
              className={`text-lg font-semibold text-slate-900 dark:text-slate-100 ${completedToday ? "line-through" : ""}`}
              onDoubleClick={() => setIsEditing(true)}
              title="Double click to edit title"
            >
              {habit.title}
            </h3>
          )}
          <p className="mt-1 inline-flex rounded-full bg-violet-100 px-2 py-1 text-xs font-medium text-violet-700 dark:bg-violet-500/20 dark:text-violet-300">
            {habit.category}
          </p>
        </div>

        {completedToday && (
          <span className="text-xl text-emerald-600 dark:text-emerald-400" aria-label="Completed today">
            ✓
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${streakClass}`}>🔥 {habit.streak} day streak</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">Created {new Date(habit.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onToggleComplete(habit.id)}
          className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition ${
            completedToday
              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:hover:bg-emerald-500/30"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {completedToday ? "Completed Today" : "Mark Complete"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="rounded-xl bg-rose-100 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-200 dark:bg-rose-500/20 dark:text-rose-300 dark:hover:bg-rose-500/30"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default HabitCard;
