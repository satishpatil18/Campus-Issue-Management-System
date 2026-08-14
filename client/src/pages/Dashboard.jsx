import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMyIssues } from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const data = await getMyIssues(token);

        setIssues(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [navigate]);

  const pendingIssues = issues.filter(
    (issue) => issue.status.toLowerCase() === "pending"
  ).length;

  const resolvedIssues = issues.filter(
    (issue) => issue.status.toLowerCase() === "resolved"
  ).length;

  return (
    <div className="dashboard">

      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          🎓 Campus Issues
        </div>

        <nav className="sidebar-nav">
          <a href="/dashboard" className="active">
            Dashboard
          </a>

          <Link to="/report-issue">
            Report Issue
          </Link>

          <a href="#">
            My Issues
          </a>

          <a href="#">
            Profile
          </a>
        </nav>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </aside>


      <main className="dashboard-main">

        <div className="dashboard-header">
          <div>
            <h1>Welcome back!</h1>
            <p>
              Manage and track your campus issues from here.
            </p>
          </div>

          <div className="user-info">
            <span>👤</span>
            <span>Student</span>
          </div>
        </div>


        <div className="dashboard-cards">

          <div className="dashboard-card">
            <h3>{issues.length}</h3>
            <p>Reported Issues</p>
          </div>

          <div className="dashboard-card">
            <h3>{pendingIssues}</h3>
            <p>Pending Issues</p>
          </div>

          <div className="dashboard-card">
            <h3>{resolvedIssues}</h3>
            <p>Resolved Issues</p>
          </div>

        </div>


        <div className="recent-issues">

          <div className="section-header">
            <h2>Recent Issues</h2>

            <Link to="/report-issue" className="report-btn">
              + Report Issue
            </Link>
          </div>


          <div className="issue-list">

            {loading ? (
              <p>Loading issues...</p>
            ) : error ? (
              <p className="issue-error">{error}</p>
            ) : issues.length === 0 ? (
              <p>No issues reported yet.</p>
            ) : (
              issues.map((issue) => (
                <div className="issue-item" key={issue.id}>

                  <div>
                    <h3>{issue.title}</h3>

                    <p>
                      {issue.category} • {issue.location}
                    </p>
                  </div>

                  <span
                    className={`status ${issue.status.toLowerCase()}`}
                  >
                    {issue.status}
                  </span>

                </div>
              ))
            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;