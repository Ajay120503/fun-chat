import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("set-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("set-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    set({ theme });
  },
}));
