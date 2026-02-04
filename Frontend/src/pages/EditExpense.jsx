import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function EditExpense() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await api.get(`/expenses/${id}`);
        setTitle(res.data.title);
        setAmount(res.data.amount);
        setCategory(res.data.category);
      } catch (error) {
        setMessage("❌ Failed to load expense");
      }
    };

    fetchExpense();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/expenses/${id}`, {
        title,
        amount,
        category,
      });
      setMessage("✅ Expense updated successfully");
    } catch {
      setMessage("❌ Update failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-container">
        <div className="auth-card">
          <h2>Edit Expense</h2>

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
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />

            <button type="submit">Update Expense</button>
          </form>

          {message && <p style={{ marginTop: "15px" }}>{message}</p>}
        </div>
      </div>
    </>
  );
}

export default EditExpense;
