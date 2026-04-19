// /Users/aarondeniz/programming/fsd/habit/src/pages/Dashboard.jsx
import { useDispatch, useSelector } from "react-redux";
import HabitList from "../components/HabitList";
import { addHabit, deleteHabit, toggleComplete } from "../redux/habitSlice";

const Dashboard = () => {
  const habits = useSelector((state) => state.habit.habits);
  const dispatch = useDispatch();

  const handleAddHabit = (title, category) => {
    dispatch(addHabit(title, category));
  };

  const handleToggle = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteHabit(id));
  };

  return (
    <section className="space-y-6">
      <HabitList
        habits={habits}
        onAddHabit={handleAddHabit}
        onToggleComplete={handleToggle}
        onDeleteHabit={handleDelete}
      />
    </section>
  );
};

export default Dashboard;
