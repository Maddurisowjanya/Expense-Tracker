import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Budget() {
  const [month, setMonth] = useState("");
  const [limit, setLimit] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/budget", { month, limit });
      setMessage("✅ Budget saved successfully");
      setMonth("");
      setLimit("");
    } catch (error) {
      setMessage("❌ Failed to save budget");
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-container">
        <div className="auth-card">
          <h2>Set Monthly Budget</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Budget Amount"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              required
            />

            <button type="submit">Save Budget</button>
          </form>

          {message && <p style={{ marginTop: "15px" }}>{message}</p>}
        </div>
      </div>
    </>
  );
}

export default Budget;
