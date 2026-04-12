// /Users/aarondeniz/programming/fsd/habit/src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";

const navClassName = ({ isActive }) =>
  `flex items-center rounded-xl px-4 py-2.5 text-sm font-medium transition ${
    isActive
      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200"
      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
  }`;

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/40 transition md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200 bg-white p-5 transition-transform md:static md:z-0 md:w-64 md:translate-x-0 dark:border-slate-800 dark:bg-slate-900 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between md:hidden">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Navigation</p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
        <nav className="space-y-2">
          <NavLink to="/" end className={navClassName} onClick={onClose}>
            Dashboard
          </NavLink>
          <NavLink to="/analytics" className={navClassName} onClick={onClose}>
            Analytics
          </NavLink>
          <NavLink to="/settings" className={navClassName} onClick={onClose}>
            Settings
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
