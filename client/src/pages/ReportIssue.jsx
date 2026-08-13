import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createIssue } from "../services/api";
import "./ReportIssue.css";

function ReportIssue() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "Low",
    location: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  setMessage("");

  if (
    !formData.title ||
    !formData.category ||
    !formData.location ||
    !formData.description
  ) {
    setMessage("Please fill in all the required fields.");
    return;
  }

  try {
const token = localStorage.getItem("token");

if (!token) {
  setMessage("You are not logged in.");
  return;
}

const data = await createIssue(
  {
    title: formData.title,
    category: formData.category,
    priority: formData.priority,
    location: formData.location,
    description: formData.description,
  },
  token
);

    setMessage(data.message);

    setFormData({
      title: "",
      category: "",
      priority: "Low",
      location: "",
      description: "",
    });
  } catch (error) {
    setMessage(error.message);
  }
};
  return (
    <div className="report-page">

      <div className="report-container">

        <div className="report-header">
          <h1>Report an Issue</h1>

          <p>
            Help us improve the campus by reporting an issue.
          </p>
        </div>


        <form
          className="report-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label>Issue Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter the issue title"
            />
          </div>


          <div className="form-row">

            <div className="form-group">
              <label>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                <option>Electrical</option>
                <option>Plumbing</option>
                <option>Cleaning</option>
                <option>Infrastructure</option>
                <option>Computer / IT</option>
                <option>Other</option>
              </select>
            </div>


            <div className="form-group">
              <label>Priority</label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

          </div>


          <div className="form-group">
            <label>Location</label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter the location"
            />
          </div>


          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              placeholder="Describe the issue in detail..."
            ></textarea>
          </div>


          {message && (
            <p className="form-message">
              {message}
            </p>
          )}


          <div className="form-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-btn"
            >
              Submit Issue
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ReportIssue;