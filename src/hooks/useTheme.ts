import { useState, useEffect } from "react";
import type { ThemeColor } from "../types";

export const THEME_COLORS: ThemeColor[] = [
  "#00ff88", // Verde (Padrão)
  "#ff0055", // Rosa/Vermelho
  "#ffe600", // Amarelo
  "#00ccff", // Azul Ciano
  "#a855f7", // Roxo
];

export function useTheme() {
  const [theme, setTheme] = useState<ThemeColor>(() => {
    const saved = localStorage.getItem("app-theme");
    return (saved as ThemeColor) || "#00ff88";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", theme);
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  return { theme, setTheme, colors: THEME_COLORS };
}
