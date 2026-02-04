import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
    await api.post("/expenses", { title, amount, category });
    toast.success("Expense added successfully");
  } catch (error) {
    toast.error("Failed to add expense");
  }
  };

  return (
    <>
      <Navbar />

      <div className="auth-container">
        <div className="auth-card">
          <h2>Add Expense</h2>

          <form onSubmit={handleSubmit}>
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <input
              placeholder="Category (Food, Travel...)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />

            <button type="submit">Add Expense</button>
          </form>

          {message && <p style={{ marginTop: "15px" }}>{message}</p>}
        </div>
      </div>
    </>
  );
}

export default AddExpense;
