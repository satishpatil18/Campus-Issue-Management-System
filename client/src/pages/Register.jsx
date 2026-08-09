import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import "../layouts/AuthForm.css";
import { registerUser } from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
    setError("");

    if (
      !formData.full_name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const data = await registerUser({
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      setMessage(data.message);

      setFormData({
        full_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "student",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AuthLayout title="Create Account">
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="name">Full Name</label>

          <input
            type="text"
            id="name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>


        <div className="form-group">
          <label htmlFor="email">Email</label>

          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>


        <div className="form-group">
          <label htmlFor="password">Password</label>

          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
          />
        </div>


        <div className="form-group">
          <label htmlFor="confirmPassword">
            Confirm Password
          </label>

          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
          />
        </div>


        <div className="form-group">
          <label htmlFor="role">Role</label>

          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>


        {error && (
          <p className="form-error">
            {error}
          </p>
        )}


        {message && (
          <p className="form-success">
            {message}
          </p>
        )}


        <button
          type="submit"
          className="auth-button"
        >
          Register
        </button>


        <p className="auth-link">
          Already have an account?{" "}
          <Link to="/login">Login here</Link>
        </p>

      </form>
    </AuthLayout>
  );
}

export default Register;