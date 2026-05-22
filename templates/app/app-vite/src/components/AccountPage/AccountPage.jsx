import { useAuth } from "../../context/AuthContext.jsx";

export default function AccountPage() {
  const { user, logout } = useAuth();

  return (
    <section className="account-page">
      <h1>My Account</h1>

      {user && (
        <div className="account-info">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Account Status:</strong> Active
          </p>

          <button
            type="button"
            onClick={logout}
            style={{
              marginTop: "20px",
              padding: "10px 16px",
              background: "#ef4444",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </section>
  );
}
