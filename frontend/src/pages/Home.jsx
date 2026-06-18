import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl p-8 md:p-12">
        
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Lead Capture AI Agent
        </h1>

        <p className="text-gray-600 text-center mb-8">
          A production-ready system to capture leads, qualify them using AI,
          and help businesses respond faster.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Lead Form Card */}
          <div className="border rounded-lg p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">
              📝 Submit a Lead
            </h2>
            <p className="text-gray-600 mb-4">
              Capture customer details through a responsive form.
              Data is securely stored and processed by AI.
            </p>

            <Link
              to="/lead-form"
              className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
            >
              Go to Lead Form
            </Link>
          </div>

          {/* Admin Panel Card */}
          <div className="border rounded-lg p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">
              📊 Admin Panel
            </h2>
            <p className="text-gray-600 mb-4">
              View all submitted leads, AI qualification scores,
              and auto-generated response drafts.
            </p>

            <Link
              to="/admin"
              className="inline-block bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700"
            >
              Open Admin Panel
            </Link>
          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-10">
          Built as part of Full Stack + AI Engineering Assignment
        </p>
      </div>
    </div>
  );
};

export default Home;