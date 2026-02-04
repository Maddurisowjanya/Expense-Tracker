import { useEffect, useState } from "react";

function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <nav>
      <h3>Expense Tracker</h3>

      <div>
        <button onClick={() => (window.location.href = "/dashboard")}>
          Dashboard
        </button>
        <button onClick={() => (window.location.href = "/add-expense")}>
          Add Expense
        </button>
        <button onClick={() => (window.location.href = "/budget")}>
          Budget
        </button>

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️" : "🌙"}
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
