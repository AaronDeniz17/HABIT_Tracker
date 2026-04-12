// /Users/aarondeniz/programming/fsd/habit/src/components/Navbar.jsx
import { useContext } from "react";
import ThemeToggle from "./ThemeToggle";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = ({ onMenuClick }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 md:hidden dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Open sidebar"
          >
            ☰
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">HabitFlow</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Build consistency, one day at a time</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 sm:inline-flex dark:bg-slate-800 dark:text-slate-300">
            Theme: {theme}
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
