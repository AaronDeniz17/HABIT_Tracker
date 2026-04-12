// /Users/aarondeniz/programming/fsd/habit/src/components/HabitList.jsx
import HabitCard from "./HabitCard";

const HabitList = ({ habits, onToggleComplete, onDeleteHabit }) => {
  if (habits.length === 0) {
    return (
      <div className="card-surface p-10 text-center">
        <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">No habits yet — add your first one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} onToggleComplete={onToggleComplete} onDeleteHabit={onDeleteHabit} />
      ))}
    </div>
  );
};

export default HabitList;
