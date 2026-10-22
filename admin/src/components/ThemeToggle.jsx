
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark-blue"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) =>
      current === "dark-blue"
        ? "soft-light"
        : "dark-blue"
    )
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label="Change Theme"
      title="Change Theme"
    >
      {theme === "dark-blue" ? (
        <Sun className="size-5 text-amber-400" />
      ) : (
        <Moon className="size-5 text-indigo-500" />
      )}
    </button>
  );
}
