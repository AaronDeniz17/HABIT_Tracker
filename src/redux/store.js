// /Users/aarondeniz/programming/fsd/habit/src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "./habitSlice";

const loadHabits = () => {
  try {
    const raw = localStorage.getItem("habitflow_habits");
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const store = configureStore({
  reducer: {
    habit: habitReducer
  },
  preloadedState: {
    habit: {
      habits: loadHabits()
    }
  }
});
