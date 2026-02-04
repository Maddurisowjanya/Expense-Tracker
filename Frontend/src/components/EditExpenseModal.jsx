import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function EditExpenseModal({ expense, onClose, onUpdated }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (expense) {
      setTitle(expense.title);
      setAmount(expense.amount);
      setCategory(expense.category);
    }
  }, [expense]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

   
   try {
    const updatedExpense = {
      ...expense,
      title,
      amount,
      category,
    };

    // 1️⃣ Update UI immediately
    onUpdated(updatedExpense);

    // 2️⃣ Close modal
    onClose();

    // 3️⃣ Sync with backend
    await api.put(`/expenses/${expense._id}`, {
      title,
      amount,
      category,
    });

    // 4️⃣ ONE success toast
    toast.success("Expense updated");
  } catch (error) {
    console.error(error);
    toast.error("Update failed");
  } finally {
    setLoading(false);
  }
};

  if (!expense) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Expense</h3>

        <form onSubmit={handleSubmit}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <div className="modal-actions">
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditExpenseModal;
