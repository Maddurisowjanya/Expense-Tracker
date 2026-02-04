import { Bar } from "react-chartjs-2";

function MonthlyBarChart({ expenses }) {
  const monthlyTotals = {};

  expenses.forEach((exp) => {
    const month = exp.date.slice(0, 7);
    monthlyTotals[month] =
      (monthlyTotals[month] || 0) + exp.amount;
  });

  const colors = [
    "#4CAF50",
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#9C27B0",
    "#FF9800",
    "#00BCD4",
    "#E91E63",
  ];

  const data = {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: "Monthly Expenses",
        data: Object.values(monthlyTotals),
        backgroundColor: Object.keys(monthlyTotals).map(
          (_, index) => colors[index % colors.length]
        ),
      },
    ],
  };

  return (
    <div style={{ width: "500px" }}>
      <h3>Monthly Comparison</h3>
      <Bar data={data} />
    </div>
  );
}

export default MonthlyBarChart;
