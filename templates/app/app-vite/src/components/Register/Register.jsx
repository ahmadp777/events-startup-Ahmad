
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/events";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    const normalizedEmail = email.trim();
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    setError(null);
    setSuccess("");

    if (!isEmailValid) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register(normalizedEmail, password);
      setSuccess("Registration successful. Redirecting...");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
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
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", margin: "8px 0 14px", padding: "8px" }}
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          placeholder="at least 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
          style={{ width: "100%", margin: "8px 0 14px", padding: "8px" }}
        />

        <label htmlFor="register-confirm-password">Confirm Password</label>
        <input
          id="register-confirm-password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          minLength={6}
          required
          style={{ width: "100%", margin: "8px 0 14px", padding: "8px" }}
        />

        <button
          type="button"
          onClick={() => setShowPassword((previousValue) => !previousValue)}
          disabled={isSubmitting}
          style={{ marginRight: "20px" }}
        >
          {showPassword ? "Hide password" : "Show password"}
        </button>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </form>

      {error && <p style={{ color: "#b91c1c", marginTop: "12px" }}>{error}</p>}
      {success && <p style={{ color: "#166534", marginTop: "12px" }}>{success}</p>}
    </div>
  );
}
