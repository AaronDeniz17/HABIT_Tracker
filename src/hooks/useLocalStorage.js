// /Users/aarondeniz/programming/fsd/habit/src/hooks/useLocalStorage.js
import { useEffect, useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore storage write errors to keep UI responsive.
    }
  }, [key, value]);

  return [value, setValue];
};
