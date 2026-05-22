import { Link, Outlet } from "react-router-dom";
import vioappslogo from "../../assets/vioapps-logo.png";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header>
        <nav
          style={{
            width: "100%",
            display: "flex",
            gap: "20px",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "10px 20px",
          }}
        >
          <img
            src={vioappslogo}
            alt="VioApps logo"
            className="logo"
            width={170}
            style={{ padding: "20px" }}
          />
          {/* Navigation links go here — e.g. link to event list, cart, login */}
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/events" className="link">
            Events
          </Link>

          {user && (
            <>
              <span>{user.email}</span>
              <button onClick={logout}>Sign out</button>
            </>
          )}

          <Link to="/login" className="link">Login</Link>
          <Link to="/register" className="link">Register</Link>
        </nav>
      </header>

      <main style={{ flex: 1, width: "100%", padding: "10px 20px" }}>
        <section style={{ width: "100%", maxWidth: "700px", margin: "0 auto" }}>
          <Outlet />
        </section>
      </main>

      <footer
        style={{
          borderTop: "1px solid #d9d9d9",
          padding: "16px 20px",
          textAlign: "center",
        }}
      >
        Copyright 2026 VioApps. All rights reserved.
      </footer>
    </div>
  );
}
