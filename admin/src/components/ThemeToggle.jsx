
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "midnight-blue"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) =>
      current === "midnight-blue"
        ? "soft-light"
        : "midnight-blue"
    );
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label="Change Theme"
      title="Change Theme"
    >
      {theme === "midnight-blue" ? (
        <Sun className="size-5 text-amber-400" />
      ) : (
        <Moon className="size-5 text-indigo-500" />
      )}
    </button>
  );
}
