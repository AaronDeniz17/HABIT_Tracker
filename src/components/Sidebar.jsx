// /Users/aarondeniz/programming/fsd/habit/src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { BarChart3, Gauge, Settings } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { to: "/", label: "Dashboard", icon: Gauge },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings }
];

const navClassName = ({ isActive }) =>
  `flex w-full items-center gap-3 rounded-card border-l-[3px] px-4 py-3 text-sm transition ${
    isActive
      ? "border-accent bg-surface-700 text-text-primary"
      : "border-transparent text-text-secondary hover:bg-surface-700 hover:text-text-primary"
  }`;

const Sidebar = () => {
  return (
    <>
      <aside className="hidden h-screen w-[240px] flex-col border-r border-surface-600 bg-surface-900 p-4 md:flex">
        <div className="flex items-center gap-3 py-2">
          <span className="logo-mark" aria-hidden="true" />
          <span className="font-display text-xl font-semibold text-text-primary">HabitFlow</span>
        </div>

        <div className="my-4 h-px bg-surface-600" />

        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/"} className={navClassName}>
              <Icon size={18} strokeWidth={1.5} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-4 border-t border-surface-600 pt-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-600 bg-surface-800 text-sm font-medium text-text-primary">
              AD
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-text-primary">Aaron Deniz</p>
              <span className="inline-flex rounded-pill bg-accent-dim px-2 py-0.5 text-xs font-medium text-accent">Pro</span>
            </div>
          </div>
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-30 grid h-16 grid-cols-4 border-t border-surface-600 bg-surface-900 px-2 md:hidden">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 rounded-input text-[11px] transition ${
                isActive ? "text-text-primary" : "text-text-secondary"
              }`
            }
          >
            <Icon size={18} strokeWidth={1.5} />
            <span>{label}</span>
          </NavLink>
        ))}
        <div className="flex flex-col items-center justify-center gap-1 text-[11px] text-text-secondary">
          <ThemeToggle />
          <span>Theme</span>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
