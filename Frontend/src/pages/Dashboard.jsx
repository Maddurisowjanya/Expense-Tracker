import { useEffect, useState } from "react";
import api from "../services/api";
import ExpensePieChart from "../components/ExpensePieChart";
import Navbar from "../components/Navbar";
import MonthlyBarChart from "../components/MonthlyBarChart";
import { toast } from "react-toastify";
import EditExpenseModal from "../components/EditExpenseModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(null);
  const [filterMonth, setFilterMonth] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
const [editingExpense, setEditingExpense] = useState(null);
const [deletingExpense, setDeletingExpense] = useState(null);


const fetchExpenses = async () => {
  try {
    const res = await api.get("/expenses");
    setExpenses(res.data);
  } catch (error) {
    console.error("Refresh failed:", error);
    // ❌ DO NOT toast
    // ❌ DO NOT throw
  }
};
useEffect(() => {
  fetchExpenses();
}, []);
const exportPDF = () => {
  try {
    if (!filteredExpenses || filteredExpenses.length === 0) {
      toast.error("No expenses to export");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Expense Report", 14, 15);

    doc.setFontSize(11);
    doc.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      14,
      22
    );

    const tableData = filteredExpenses.map((exp) => [
      exp.title,
      `₹${exp.amount}`,
      exp.category,
      exp.date
        ? new Date(exp.date).toLocaleDateString()
        : "",
    ]);

    autoTable(doc, {
      startY: 30,
      head: [["Title", "Amount", "Category", "Date"]],
      body: tableData,
    });

    const total = filteredExpenses.reduce(
      (sum, exp) => sum + exp.amount,
      0
    );

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Total Spent: ₹${total}`, 14, finalY);

    doc.save("expense-report.pdf");

    toast.success("PDF exported successfully");
  } catch (error) {
    console.error("PDF Export Error:", error);
    toast.error("Failed to export PDF");
  }
};

  useEffect(() => {
  const fetchBudget = async () => {
    try {
      const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

      const res = await api.get(
        `/budget?month=${currentMonth}`
      );

      setBudget(res.data);
    } catch (error) {
      console.log("No budget set for this month");
    }
  };

  fetchBudget();
}, []);

const filteredExpenses = expenses.filter((exp) => {
  const expenseMonth = exp.date
    ? new Date(exp.date).toISOString().slice(0, 7)
    : "";

  const expenseCategory = exp.category
    ? exp.category.trim().toLowerCase()
    : "";

  const filterCat = filterCategory.trim().toLowerCase();

  const matchesMonth =
    !filterMonth || expenseMonth === filterMonth;

  const matchesCategory =
    !filterCat || expenseCategory === filterCat;

  return matchesMonth && matchesCategory;
});



const totalExpense = expenses.reduce(
  (sum, exp) => sum + exp.amount,
  0
);

const budgetUsage = budget ? Math.round((totalExpense / budget.limit) * 100) : 0;


const exportCSV = () => {
  const headers = ["Title", "Amount", "Category", "Date"];
  const rows = filteredExpenses.map((exp) => [
    exp.title,
    exp.amount,
    exp.category,
    exp.date ? new Date(exp.date).toLocaleDateString() : "",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "expenses.csv";
  a.click();
};  
 return (
  <div className="container">
    <Navbar />
    <h2>Dashboard</h2>

    {budget && budgetUsage >= 80 && budgetUsage < 100 && (
      <div style={{
        background: "#fef3c7",
        color: "#92400e",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "20px",
        textAlign: "center",
        fontWeight: "600",
      }}>
        ⚠ You have used {budgetUsage}% of your monthly budget
      </div>
    )}

    {budget && budgetUsage >= 100 && (
      <div style={{
        background: "#fee2e2",
        color: "#991b1b",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "20px",
        textAlign: "center",
        fontWeight: "700",
      }}>
        🚨 Budget Exceeded!
      </div>
    )}

    <div className="filters">
      <input
        type="month"
        value={filterMonth}
        onChange={(e) => setFilterMonth(e.target.value)}
      />
      <input
        placeholder="Category (Food, Travel...)"
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      />
      <button onClick={() => {
        setFilterMonth("");
        setFilterCategory("");
      }}>
        Clear Filters
      </button>
      <button onClick={exportCSV}>
  ⬇ Export CSV
</button>
      <button onClick={exportPDF}>
  ⬇ Export PDF
</button> 
    </div>

    {filteredExpenses.length === 0 && (
      <p style={{ textAlign: "center" }}>No expenses found</p>
    )}

    {filteredExpenses.map((exp) => (
      <div className="expense-card" key={exp._id}>
        <div className="expense-info">
          <b>{exp.title} – ₹{exp.amount}</b>
          <span>{exp.category}</span>
          <span>{new Date(exp.date).toLocaleDateString()}</span>
        </div>
        <div className="expense-actions">
          <button className="edit" onClick={() => setEditingExpense(exp)}>
  Edit
</button>


<button
  className="delete"
  onClick={() => setDeletingExpense(exp)}
>
  Delete
</button>
    

        </div>
      </div>
    ))}
<EditExpenseModal
  expense={editingExpense}
  onClose={() => setEditingExpense(null)}
  onUpdated={(updatedExpense) => {
    setExpenses((prev) =>
      prev.map((e) =>
        e._id === updatedExpense._id ? updatedExpense : e
      )
    );
  }}
/>

<ConfirmDeleteModal
  expense={deletingExpense}
  onClose={() => setDeletingExpense(null)}
  onDeleted={() => fetchExpenses()}
/>
    <div className="add-expense">
      <button onClick={() => window.location.href = "/add-expense"}>
        ➕ Add Expense
      </button>
    </div>
<center>
    <div className="chart-section">
      <ExpensePieChart expenses={expenses} /><br></br>
      <br></br><MonthlyBarChart expenses={expenses} />
    </div>
    </center>

    <div style={{ marginTop: "30px", textAlign: "center" }}>
      <h3>Monthly Summary</h3>
      <p>Total Spent: ₹{totalExpense}</p>
      {budget && <p>Budget Limit: ₹{budget.limit}</p>}
    </div>
  </div>
  ); 
}
export default Dashboard;
