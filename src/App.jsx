// /Users/aarondeniz/programming/fsd/habit/src/App.jsx
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

const App = () => {
  const location = useLocation();
  const habits = useSelector((state) => state.habit.habits);

  useEffect(() => {
    localStorage.setItem("habitflow_habits", JSON.stringify(habits));
  }, [habits]);

  return (
    <div className="flex h-screen overflow-hidden bg-surface-950 text-text-primary">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto px-4 pb-24 pt-6 md:px-8 md:pb-8">
          <div key={location.pathname} className="page-entry">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
