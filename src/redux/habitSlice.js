// /Users/aarondeniz/programming/fsd/habit/src/redux/habitSlice.js
import { createSlice, nanoid } from "@reduxjs/toolkit";

const todayKey = () => new Date().toISOString().split("T")[0];

const calculateStreak = (completedDates) => {
  const completedSet = new Set(completedDates);
  const cursor = new Date();
  let streak = 0;

  while (true) {
    const key = cursor.toISOString().split("T")[0];
    if (!completedSet.has(key)) {
      break;
    }
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};

const sortDates = (dates) => [...new Set(dates)].sort((a, b) => a.localeCompare(b));

const initialState = {
  habits: []
};

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    addHabit: {
      reducer(state, action) {
        state.habits.unshift(action.payload);
      },
      prepare(title, category) {
        return {
          payload: {
            id: nanoid(),
            title: title.trim(),
            category,
            createdAt: new Date().toISOString(),
            completedDates: [],
            streak: 0
          }
        };
      }
    },
    deleteHabit(state, action) {
      state.habits = state.habits.filter((habit) => habit.id !== action.payload);
    },
    toggleComplete(state, action) {
      const habit = state.habits.find((item) => item.id === action.payload);
      if (!habit) {
        return;
      }

      const today = todayKey();
      const isCompletedToday = habit.completedDates.includes(today);

      if (isCompletedToday) {
        habit.completedDates = habit.completedDates.filter((date) => date !== today);
      } else {
        habit.completedDates = sortDates([...habit.completedDates, today]);
      }

      habit.streak = calculateStreak(habit.completedDates);
    },
    updateHabit(state, action) {
      const { id, changes } = action.payload;
      const habit = state.habits.find((item) => item.id === id);
      if (!habit) {
        return;
      }

      Object.assign(habit, changes);
      if (changes.completedDates) {
        habit.completedDates = sortDates(changes.completedDates);
      }
      habit.streak = calculateStreak(habit.completedDates);
    },
    resetAllStreaks(state) {
      state.habits = state.habits.map((habit) => ({
        ...habit,
        completedDates: [],
        streak: 0
      }));
    },
    clearAllHabits(state) {
      state.habits = [];
    }
  }
});

export const { addHabit, deleteHabit, toggleComplete, updateHabit, resetAllStreaks, clearAllHabits } =
  habitSlice.actions;

export default habitSlice.reducer;
