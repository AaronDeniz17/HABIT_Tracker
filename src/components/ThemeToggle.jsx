// /Users/aarondeniz/programming/fsd/habit/src/components/ThemeToggle.jsx
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = ({ variant = "icon" }) => {
  const { theme, toggleTheme } = useTheme();

  if (variant === "switch") {
    const isDark = theme === "dark";

    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`relative h-7 w-14 rounded-pill border border-surface-600 transition ${
          isDark ? "bg-accent" : "bg-surface-700"
        }`}
        aria-label="Toggle theme"
        aria-pressed={isDark}
      >
        <span
          className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-surface-950 transition-all duration-200 ease-out ${
            isDark ? "left-[30px]" : "left-[4px]"
          }`}
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-9 w-9 items-center justify-center rounded-input border border-surface-600 bg-surface-800 text-text-secondary hover:bg-surface-700 hover:text-text-primary"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={18} strokeWidth={1.5} aria-hidden="true" />
      ) : (
        <Moon size={18} strokeWidth={1.5} aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle;
