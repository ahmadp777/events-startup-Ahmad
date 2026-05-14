// TODO: build a login form with relevant fields
// TODO: call login(email, password) from useAuth() on submit
// TODO: show a clear error message if login fails
// TODO: redirect to the event list on success

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/events";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess("");

    try {
      await login(email, password);
      setSuccess("Login successful. Redirecting...");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    }
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "360px" }}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", margin: "8px 0 14px", padding: "8px" }}
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", margin: "8px 0 14px", padding: "8px" }}
        />

        <button type="submit">Sign in</button>

        <button
          type="button"
          onClick={() => navigate("/register", { state: { from: location.state?.from } })}
          style={{ marginLeft: "12px" }}
        >
          Register
        </button>
      </form>

      {error && <p style={{ color: "#b91c1c", marginTop: "12px" }}>{error}</p>}
      {success && <p style={{ color: "#166534", marginTop: "12px" }}>{success}</p>}
    </div>
  );
}
