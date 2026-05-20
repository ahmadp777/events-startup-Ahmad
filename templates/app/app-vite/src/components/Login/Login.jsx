
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/events";
  const wasRedirected = !!location.state?.from;
  const redirectMessage =
    location.state?.authMessage || "You must be logged in to access that page.";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      {wasRedirected && (
        <p
          style={{
            marginBottom: "16px",
            padding: "12px",
            background: "#fef3c7",
            border: "1px solid #fbbf24",
            borderRadius: "8px",
            color: "#92400e",
            maxWidth: "360px",
          }}
        >
          {redirectMessage}
        </p>
      )}
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
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", margin: "8px 0 14px", padding: "8px" }}
        />

        <button
          type="button"
          onClick={() => setShowPassword((previousValue) => !previousValue)}
          style={{ marginRight: "20px" }}
        >
          {showPassword ? "Hide password" : "Show password"}
        </button>

        <button 
          type="submit"
          style={{ marginRight: "20px" }}
        >
          Sign in
        </button>

        <button
          type="button"
          onClick={() => navigate("/register", { state: { from: location.state?.from } })}
        >
          Register
        </button>
      </form>

      {error && <p style={{ color: "#b91c1c", marginTop: "12px" }}>{error}</p>}
      {success && <p style={{ color: "#166534", marginTop: "12px" }}>{success}</p>}
    </div>
  );
}
