import { useState } from "react";
import axios from "axios";
import BackButton from "../component/BackButton";

const LeadForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    business_name: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [apiError, setApiError] = useState("");

  // input handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // validation logic (IMPORTANT PART)
  const validate = () => {
    let newErrors = {};

    // FULL NAME
    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    }

    // EMAIL
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    // BUSINESS NAME
    if (!formData.business_name.trim()) {
      newErrors.business_name = "Business name is required";
    }

    // MESSAGE
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else {
      const wordCount = formData.message.trim().split(/\s+/).length;

      if (wordCount < 5) {
        newErrors.message = "Message must be at least 5 words long";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setApiError("");

    if (!validate()) return;

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/leads", formData);

      alert("Lead submitted successfully 🚀");

      setSuccess("Lead submitted successfully 🚀");

      setFormData({
        full_name: "",
        email: "",
        business_name: "",
        message: "",
      });

      setErrors({});
    } catch (error) {
      setApiError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // input field UI (reusable style)
  const inputClass =
    "w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 sm:p-10">
        {/* Title */}
        <BackButton />
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          Lead Capture Form
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Please fill all required details
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* FULL NAME */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter full name"
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* BUSINESS NAME */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Business Name
            </label>
            <input
              type="text"
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter business name"
            />
            {errors.business_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.business_name}
              </p>
            )}
          </div>

          {/* MESSAGE */}
          <div>
            <label className="text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className={inputClass}
              placeholder="Write your message (min 5 words)"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {/* API ERROR */}
          {apiError && (
            <p className="text-red-600 text-center text-sm">{apiError}</p>
          )}

          {/* SUCCESS */}
          {success && (
            <p className="text-green-600 text-center text-sm">{success}</p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit Lead"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
