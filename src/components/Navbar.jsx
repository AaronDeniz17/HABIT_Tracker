// /Users/aarondeniz/programming/fsd/habit/src/components/Navbar.jsx
import { Bell } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const titleMap = {
  "/": "Dashboard",
  "/analytics": "Analytics",
  "/settings": "Settings"
};

const Navbar = () => {
  const location = useLocation();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [readIds, setReadIds] = useState([]);
  const panelRef = useRef(null);

  const notifications = useMemo(
    () => [
      { id: "n1", title: "Daily window opened", detail: "Mark today's progress before midnight." },
      { id: "n2", title: "Streak warning", detail: "Hydration is at risk of breaking." },
      { id: "n3", title: "Weekly report", detail: "Your 7-day completion metrics are updated." }
    ],
    []
  );

  const unreadCount = notifications.filter((item) => !readIds.includes(item.id)).length;
  const pageTitle = useMemo(() => titleMap[location.pathname] || "HabitFlow", [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsPanelOpen(false);
      }
    };

    if (isPanelOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPanelOpen]);

  const handleTogglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  const handleMarkAllRead = () => {
    setReadIds(notifications.map((item) => item.id));
  };

  const handleOpenPanel = () => {
    setIsPanelOpen(true);
  };

  const handleMarkRead = (id) => {
    setReadIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <header className="h-16 border-b border-surface-600 bg-surface-900 px-4 md:px-8">
      <div className="flex h-full items-center justify-between">
        <h1 className="font-display text-[18px] font-semibold text-text-primary">{pageTitle}</h1>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="relative" ref={panelRef}>
            <button
              type="button"
              onClick={handleTogglePanel}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-input border border-surface-600 bg-surface-800 text-text-secondary hover:bg-surface-700 hover:text-text-primary"
              aria-label="Notifications"
              aria-expanded={isPanelOpen}
              aria-haspopup="dialog"
            >
              <Bell size={18} strokeWidth={1.5} />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-mono text-[#042018]">
                  {unreadCount}
                </span>
              )}
            </button>

            {isPanelOpen && (
              <div className="absolute right-0 top-11 z-40 w-80 rounded-card border border-surface-600 bg-surface-900 p-4 shadow-lg shadow-surface-950/30">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-display text-sm font-semibold text-text-primary">Notifications</p>
                  <button
                    type="button"
                    onClick={handleMarkAllRead}
                    className="text-xs text-text-secondary hover:text-accent"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="space-y-2">
                  {notifications.map((item) => {
                    const isRead = readIds.includes(item.id);

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          handleMarkRead(item.id);
                          handleOpenPanel();
                        }}
                        className={`w-full rounded-input border p-3 text-left transition ${
                          isRead
                            ? "border-surface-600 bg-surface-800 text-text-secondary"
                            : "border-accent/40 bg-accent-dim/25 text-text-primary"
                        }`}
                      >
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="mt-1 text-xs text-text-muted">{item.detail}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-surface-600 bg-surface-800 text-xs font-medium text-text-primary">
            AD
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
