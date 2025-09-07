import { create } from "zustand";
import { THEMES } from "../constants/index"; // نفس الملف عندك فوق

export const useThemeStore = create((set) => ({
  theme: "light", // الافتراضي
  setTheme: (themeName) => {
    // تحقق إذا الثيم موجود
    const found = THEMES.find((t) => t.name === themeName);
    if (found) {
      // عدّل state
      set({ theme: themeName });

      // طبّق الثيم على <html data-theme="">
      document.documentElement.setAttribute("data-theme", themeName);

      // خزن بالـ localStorage علشان يظل محفوظ
      localStorage.setItem("theme", themeName);
    }
  },
}));
