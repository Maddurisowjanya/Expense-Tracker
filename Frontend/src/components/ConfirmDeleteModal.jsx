import api from "../services/api";
import { toast } from "react-toastify";

function ConfirmDeleteModal({ expense, onClose, onDeleted }) {
  if (!expense) return null;

  const handleConfirmDelete = async () => {
    try {
      const res = await api.delete(`/expenses/${expense._id}`);

      // 👇 THIS IS IMPORTANT
      if (res.status !== 200 && res.status !== 204) {
        throw new Error("Delete not successful");
      }

      // Update UI immediately
      await onDeleted();

      // Close modal
      onClose();

      toast.success("Expense deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Delete Expense?</h3>
        <p>
          Are you sure you want to delete <b>{expense.title}</b>?
        </p>

        <div className="modal-actions">
          <button className="delete" onClick={handleConfirmDelete}>
            Yes, Delete
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
