// /Users/aarondeniz/programming/fsd/habit/src/components/HabitCard.jsx
import { Check, Trash2 } from "lucide-react";

const todayKey = () => new Date().toISOString().split("T")[0];

const HabitCard = ({ habit, onToggleComplete, onDeleteHabit }) => {
  const completedToday = habit.completedDates.includes(todayKey());

  const handleDelete = () => {
    const accepted = window.confirm("Delete this habit?");
    if (accepted) {
      onDeleteHabit(habit.id);
    }
  };

  return (
    <article
      className={`group rounded-card border p-6 transition-all duration-200 ease-out hover:-translate-y-0.5 ${
        completedToday
          ? "border-l-4 border-l-accent border-surface-600 bg-accent/15"
          : "border-surface-600 bg-surface-900 hover:border-surface-700"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex rounded-pill bg-surface-700 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-text-secondary">
          {habit.category}
        </span>

        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex items-center justify-center text-text-muted opacity-0 transition hover:text-red-400 group-hover:opacity-100"
          aria-label={`Delete ${habit.title}`}
        >
          <Trash2 size={16} strokeWidth={1.5} />
        </button>
      </div>

      <h3 className={`mt-4 font-display text-[17px] font-semibold ${completedToday ? "text-text-secondary" : "text-text-primary"}`}>
        {habit.title}
      </h3>

      <div className="mt-3 flex items-end gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">streak</span>
        <span className={`font-mono text-2xl ${habit.streak > 5 ? "animate-streak-pulse text-accent" : "text-text-primary"}`}>
          {habit.streak}
        </span>
        <span className="pb-0.5 text-sm text-text-muted">days</span>
      </div>

      <div className="my-4 h-px bg-surface-600" />

      <div>
        <button
          type="button"
          onClick={() => onToggleComplete(habit.id)}
          className={`flex h-10 w-full items-center justify-center gap-2 rounded-input border text-sm font-medium transition-all duration-200 ease-out ${
            completedToday
              ? "border-accent/40 bg-accent-dim text-accent"
              : "border-surface-600 bg-surface-700 text-text-secondary hover:bg-surface-600 hover:text-text-primary"
          }`}
        >
          {completedToday && <Check size={16} strokeWidth={1.5} />}
          {completedToday ? "Completed today" : "Mark complete"}
        </button>
      </div>
    </article>
  );
};

export default HabitCard;
