import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import "../layouts/AuthForm.css";

function Login() {
  return (
    <AuthLayout title="Welcome Back">
      <form>
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
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="auth-button">
          Login
        </button>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Login;