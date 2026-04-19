// /Users/aarondeniz/programming/fsd/habit/src/components/HabitList.jsx
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import HabitCard from "./HabitCard";

const categories = ["Health", "Study", "Fitness", "Finance", "Mindfulness"];

const HabitList = ({ habits, onAddHabit, onToggleComplete, onDeleteHabit }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextTitle = title.trim();
    if (!nextTitle) {
      return;
    }

    onAddHabit(nextTitle, category);
    setTitle("");
    setCategory(categories[0]);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mb-8 grid gap-3 rounded-card border border-surface-600 bg-surface-800 p-6 md:grid-cols-[minmax(0,1fr)_220px_auto]"
      >
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Name your habit"
          className="h-11 rounded-input border border-surface-600 bg-surface-900 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted"
        />

        <div className="relative">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-11 w-full appearance-none rounded-input border border-surface-600 bg-surface-900 px-4 py-3 pr-10 text-sm text-text-primary"
          >
            {categories.map((entry) => (
              <option key={entry} value={entry}>
                {entry}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            strokeWidth={1.5}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
            aria-hidden="true"
          />
        </div>

        <button
          type="submit"
          className="h-11 rounded-input bg-accent px-6 text-sm font-medium text-[#042018] hover:brightness-90"
        >
          Add habit
        </button>
      </form>

      {habits.length === 0 && (
        <div className="mt-16 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-surface-600">
            <div className="h-12 w-12 rounded-full border border-surface-700" />
          </div>
          <p className="mt-6 font-display text-xl text-text-secondary">No habits tracked yet</p>
          <p className="mt-2 text-sm text-text-muted">Add your first habit above</p>
        </div>
      )}

      {habits.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} onToggleComplete={onToggleComplete} onDeleteHabit={onDeleteHabit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HabitList;
