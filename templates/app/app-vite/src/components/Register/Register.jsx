// TODO: build a register form with relevant fields
// TODO: call register(email, password) from useAuth() on submit
// TODO: show a clear error message if registration fails
// TODO: redirect to the event list on success

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess("");

    if (password.length < 6) {
      setError("password should be at least 6 characters");
      return;
    }

    try {
      await register(email, password);
      setSuccess("Registration successful. Redirecting...");
      navigate("/events");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Register</h1>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "360px" }}>
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", margin: "8px 0 14px", padding: "8px" }}
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          placeholder="at least 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", margin: "8px 0 14px", padding: "8px" }}
        />

        <button type="submit">Create account</button>
      </form>

      {error && <p style={{ color: "#b91c1c", marginTop: "12px" }}>{error}</p>}
      {success && <p style={{ color: "#166534", marginTop: "12px" }}>{success}</p>}
    </div>
  );
}
