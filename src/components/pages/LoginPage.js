import React, { useState } from "react";
import "../style/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const redirectTo = query.get("redirect");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("email", data.user.email);
        onLogin(data.user.firstName);

        toast.success("Login successful! Redirecting...");
        setTimeout(() => {
          navigate(
            redirectTo ||
              (data.user.role === "admin"
                ? "/admin-dashboard"
                : "/user-dashboard")
          );
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(`Login failed: ${errorData.message || response.statusText}`);
        toast.error(errorData.message || "Login failed. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again later.");
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login-container">
        <div className="login-form-wrapper">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Sign In to AZBOARD</h2>
            <div className="input-icon">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-icon">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="login-btn custom-button "
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            {error && <p className="error-message">{error}</p>}
            <div className="login-footer">
              <p>
                Don't have an account?{" "}
                <a href="/signup" className="signup-link">
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
};

export default LoginPage;
