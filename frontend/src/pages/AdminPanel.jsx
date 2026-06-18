import { useEffect, useState } from "react";
import BackButton from "../component/BackButton";

const AdminPanel = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching leads:", err);
        setLoading(false);
      });
  }, []);

  const getScoreColor = (score) => {
    if (score === "Hot") return "text-red-600 bg-red-100";
    if (score === "Warm") return "text-yellow-700 bg-yellow-100";
    if (score === "Cold") return "text-blue-600 bg-blue-100";
    return "text-gray-600 bg-gray-100";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        {/* LEFT SIDE - BACK BUTTON */}
        <div>
          <BackButton />
        </div>

        {/* RIGHT SIDE - DASHBOARD BUTTON */}
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          GO TO Dashboard
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-6">Admin Panel – Leads</h1>

      {loading ? (
        <p className="text-gray-600">Loading leads...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full border">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Business</th>
                <th className="p-3 border">AI Score</th>
                <th className="p-3 border">Message</th>
              </tr>
            </thead>

            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No leads found
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="p-3 border">{lead.full_name}</td>
                    <td className="p-3 border">{lead.email}</td>
                    <td className="p-3 border">{lead.business_name}</td>
                    <td className="p-3 border">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(
                          lead.ai_score,
                        )}`}
                      >
                        {lead.ai_score || "Pending"}
                      </span>
                    </td>
                    <td className="p-3 border text-sm text-gray-700">
                      {lead.message}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
