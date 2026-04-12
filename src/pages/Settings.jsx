// /Users/aarondeniz/programming/fsd/habit/src/pages/Settings.jsx
import ThemeToggle from "../components/ThemeToggle";

const Settings = () => {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Settings</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Personalize your HabitFlow experience.</p>
      </div>

      <div className="card-surface p-5">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Appearance</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Switch between light and dark themes.</p>
        <div className="mt-4">
          <ThemeToggle />
        </div>
      </div>
    </section>
  );
};

export default Settings;
