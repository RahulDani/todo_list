import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API_BASE =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/auth/signup`, { username, password });
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert("User already exists or error occurred");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h2 className="login-title">SIGN UP</h2>
        <p className="login-subtitle">Please create your account.</p>
        <form onSubmit={handleSignup}>
          <input
            type="username"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">SIGN UP</button>
        </form>
        <p className="signup-row">
          Already have an account? <Link to="/login" className="signup-link">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
