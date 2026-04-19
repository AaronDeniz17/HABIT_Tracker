// /Users/aarondeniz/programming/fsd/habit/src/pages/Settings.jsx
import { useDispatch, useSelector } from "react-redux";
import ThemeToggle from "../components/ThemeToggle";
import { clearAllHabits, resetAllStreaks } from "../redux/habitSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const totalHabits = useSelector((state) => state.habit.habits.length);

  const handleResetStreaks = () => {
    const accepted = window.confirm("Reset all streaks?");
    if (accepted) {
      dispatch(resetAllStreaks());
    }
  };

  const handleClearHabits = () => {
    const accepted = window.confirm("Clear all habits? This cannot be undone.");
    if (accepted) {
      dispatch(clearAllHabits());
    }
  };

  return (
    <section className="max-w-3xl rounded-card border border-surface-600 bg-surface-900 p-6">
      <div className="pb-6">
        <h3 className="mb-4 border-b border-surface-600 pb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
          Appearance
        </h3>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-text-primary">Theme mode</p>
            <p className="text-xs text-text-muted">Switch between dark and light presentation.</p>
          </div>
          <ThemeToggle variant="switch" />
        </div>
      </div>

      <div className="border-t border-surface-600 py-6">
        <h3 className="mb-4 border-b border-surface-600 pb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
          Habits
        </h3>

        <div className="space-y-4">
          <div>
            <button
              type="button"
              onClick={handleResetStreaks}
              className="text-sm text-text-secondary hover:text-red-400"
            >
              Reset all streaks
            </button>
            <p className="mt-1 text-xs text-text-muted">Set every habit streak back to zero without deleting the habits.</p>
          </div>

          <div>
            <button
              type="button"
              onClick={handleClearHabits}
              className="text-sm text-text-secondary hover:text-red-400"
            >
              Clear all habits
            </button>
            <p className="mt-1 text-xs text-text-muted">
              Remove all habits and completion history ({totalHabits} tracked).
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-surface-600 pt-6">
        <h3 className="mb-4 border-b border-surface-600 pb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
          About
        </h3>
        <p className="font-display text-lg font-semibold text-text-primary">HabitFlow</p>
        <p className="mt-2 font-mono text-sm text-text-muted">Version 0.0.1</p>
      </div>
    </section>
  );
};

export default Settings;
