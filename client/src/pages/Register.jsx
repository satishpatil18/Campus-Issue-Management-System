import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import "../layouts/AuthForm.css";

function Register() {
  return (
    <AuthLayout title="Create Account">
      <form>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Create a password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select id="role" defaultValue="student">
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="auth-button">
          Register
        </button>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Register;