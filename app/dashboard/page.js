"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement);

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function DashboardPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Load expenses from Supabase
  const loadExpenses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setExpenses(data);
    } else {
      console.error("❌ Load error:", error.message);
    }
    setLoading(false);
  };

  // Delete expense by id
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", id);
    if (!error) await loadExpenses();
    else console.error("❌ Delete error:", error.message);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // 🔍 Search: filter expenses by title or category
  const filteredExpenses = expenses.filter((exp) =>
    exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (exp.category && exp.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 📊 Monthly Overview (Bar) Chart Data
  const monthlyData = new Array(12).fill(0);
  expenses.forEach((exp) => {
    const month = new Date(exp.created_at).getMonth(); // 0 = Jan, 1 = Feb, ...
    monthlyData[month] += parseFloat(exp.amount);
  });

  const barChartData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May",
      "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Monthly Expenses ($)",
        data: monthlyData,
        backgroundColor: "#7c3aed",
        borderRadius: 8,
      },
    ],
  };

  // 📈 Category Breakdown (Pie) Chart Data
  const categoryMap = {};
  expenses.forEach((exp) => {
    const cat = exp.category || "Uncategorized";
    categoryMap[cat] = (categoryMap[cat] || 0) + parseFloat(exp.amount);
  });
  const pieLabels = Object.keys(categoryMap);
  const pieData = Object.values(categoryMap);

  const pieChartData = {
    labels: pieLabels,
    datasets: [
      {
        label: "Expenses by Category",
        data: pieData,
        backgroundColor: [
          "#7c3aed", "#f472b6", "#60a5fa", "#facc15",
          "#34d399", "#f87171", "#a78bfa", "#fbbf24"
        ],
      },
    ],
  };

  // Chart display options for smaller size + responsive
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // allow custom height
    plugins: {
      legend: { display: true },
    },
  };

  return (
    <div className="text-white p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Expense Dashboard</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by title or category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded"
      />

      {/* Row with Pie Chart + Bar Chart side by side */}
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        
        {/* Category Breakdown (Pie) */}
        <div className="bg-gray-900 p-4 rounded-xl shadow-lg w-full md:w-1/2 h-80">
          <h2 className="text-xl font-semibold mb-2">Category Breakdown</h2>
          <div className="relative w-full h-64">
            <Pie data={pieChartData} options={chartOptions} />
          </div>
        </div>

        {/* Monthly Overview (Bar) */}
        <div className="bg-gray-900 p-4 rounded-xl shadow-lg w-full md:w-1/2 h-80">
          <h2 className="text-xl font-semibold mb-2">Monthly Overview</h2>
          <div className="relative w-full h-64">
            <Bar data={barChartData} options={{
              ...chartOptions,
              plugins: { legend: { display: false } },
            }} />
          </div>
        </div>
      </div>

      {/* Expense List */}
      <h2 className="text-2xl font-semibold mb-4">All Expenses</h2>
      {loading ? (
        <p>Loading...</p>
      ) : filteredExpenses.length > 0 ? (
        <ul className="space-y-4 mb-8">
          {filteredExpenses.map((exp) => (
            <li
              key={exp.id}
              className="bg-gray-800 p-4 rounded-xl flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">{exp.title}</h3>
                <p className="text-sm text-gray-400">{exp.category || "Uncategorized"}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-green-400 font-semibold text-lg">
                  ${parseFloat(exp.amount).toFixed(2)}
                </span>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="text-red-500 hover:text-red-700 font-bold text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses found.</p>
      )}
    </div>
  );
}
