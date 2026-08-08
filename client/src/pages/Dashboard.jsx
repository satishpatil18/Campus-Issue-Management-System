import "./Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
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

        <button className="logout-btn">
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
            <h3>3</h3>
            <p>Reported Issues</p>
          </div>

          <div className="dashboard-card">
            <h3>1</h3>
            <p>Pending Issues</p>
          </div>

          <div className="dashboard-card">
            <h3>2</h3>
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

            <div className="issue-item">
              <div>
                <h3>Broken classroom fan</h3>
                <p>Classroom • 2 days ago</p>
              </div>

              <span className="status pending">
                Pending
              </span>
            </div>


            <div className="issue-item">
              <div>
                <h3>Lab computer not working</h3>
                <p>Computer Lab • 4 days ago</p>
              </div>

              <span className="status resolved">
                Resolved
              </span>
            </div>


            <div className="issue-item">
              <div>
                <h3>Water dispenser issue</h3>
                <p>Block A • 5 days ago</p>
              </div>

              <span className="status resolved">
                Resolved
              </span>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;