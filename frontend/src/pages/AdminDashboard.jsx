import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import BackButton from "../component/BackButton";

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("http://localhost:5000/leads");
        const data = await res.json();

        const list = Array.isArray(data) ? data : data?.data ? data.data : [];

        setLeads(list);
      } catch (err) {
        console.log("API ERROR:", err);
        setLeads([]);
      }
    };

    fetchLeads();
  }, []);

  // ================= SCORE LOGIC =================
  const hot = leads.filter((l) => l.ai_score === "Hot").length;
  const warm = leads.filter((l) => l.ai_score === "Warm").length;
  const cold = leads.filter((l) => l.ai_score === "Cold").length;

  const chartData = [
    { name: "Hot", value: hot },
    { name: "Warm", value: warm },
    { name: "Cold", value: cold },
  ];

  // ================= COLORS =================
  const getColor = (name) => {
    switch (name) {
      case "Hot":
        return "#FFD700"; // Yellow
      case "Warm":
        return "#FFA500"; // Orange
      case "Cold":
        return "#1E90FF"; // Blue
      default:
        return "#ccc";
    }
  };

  // ================= DOWNLOAD CSV =================
  const downloadCSV = () => {
    const headers = ["Name", "Email", "Business", "Score"];

    const rows = leads.map((l) => [
      l.full_name,
      l.email,
      l.business_name,
      l.ai_score,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leads_report.csv");
    document.body.appendChild(link);
    link.click();
  };

  const thStyle = {
    textAlign: "left",
    padding: "12px",
    fontWeight: "600",
    color: "#333",
  };

  const tdStyle = {
    padding: "12px",
    color: "#555",
  };

  return (
    <div style={{ padding: 20, background: "#f5f6fa", minHeight: "100vh" }}>
      <BackButton />
      {/* ================= HEADER ================= */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>📊 Lead Dashboard</h2>

        <button
          onClick={downloadCSV}
          style={{
            padding: "10px 15px",
            background: "#1890ff",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          📥 Download Report
        </button>
      </div>

      {/* ================= CHART SECTION ================= */}
      <div
        style={{ display: "flex", gap: 30, flexWrap: "wrap", marginTop: 20 }}
      >
        {/* ================= BAR CHART ================= */}
        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
            flex: 1,
            minWidth: 350,
          }}
        >
          <h3>Bar Chart</h3>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={getColor(entry.name)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ================= PIE CHART ================= */}
        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
            flex: 1,
            minWidth: 350,
          }}
        >
          <h3>Pie Chart</h3>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={getColor(entry.name)} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= TABLE ================= */}

      <div
        style={{
          marginTop: 30,
          background: "#fff",
          padding: 20,
          borderRadius: 12,
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
          overflowX: "auto",
        }}
      >
        <h3 style={{ marginBottom: 15 }}>📋 Leads Table</h3>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 14,
          }}
        >
          <thead>
            <tr style={{ background: "#f0f2f5" }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Business</th>
              <th style={thStyle}>Score</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((l) => (
              <tr key={l.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={tdStyle}>{l.full_name}</td>
                <td style={tdStyle}>{l.email}</td>
                <td style={tdStyle}>{l.business_name || "-"}</td>

                <td
                  style={{
                    ...tdStyle,
                    fontWeight: "bold",
                    color: getColor(l.ai_score),
                  }}
                >
                  {l.ai_score || "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
