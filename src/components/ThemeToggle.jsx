// /Users/aarondeniz/programming/fsd/habit/src/components/ThemeToggle.jsx
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {theme === "light" ? (
        <span className="text-lg" aria-hidden="true">
          🌙
        </span>
      ) : (
        <span className="text-lg" aria-hidden="true">
          ☀️
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
