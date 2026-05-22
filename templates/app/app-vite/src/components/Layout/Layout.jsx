import { Link, Outlet } from "react-router-dom";
import vioappslogo from "../../assets/vioapps-logo.png";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";

export default function Layout() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const currentYear = new Date().getFullYear();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          background: "#f5f7fb",
          borderBottom: "1px solid #dbe2ef",
          boxShadow: "0 2px 7px rgba(0, 0, 0, 0.2)",
        }}
      >
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
            width={110}
            style={{ padding: "20px" }}
          />
          {/* Navigation links go here — e.g. link to event list, cart, login */}
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/events" className="link">
            Events
          </Link>
          <Link to="/cart" className="link">
            Cart ({cartCount})
          </Link>

          {user && (
            <>
              <span>{user.email}</span>
              <Link to="/account" className="link">
                Account
              </Link>
              <Link to="/orders" className="link">
                Orders
              </Link>
              <button onClick={logout}>Sign out</button>
            </>
          )}

          {!user && (
            <>
              <Link to="/login" className="link">Login</Link>
              <Link to="/register" className="link">Register</Link>
            </>
          )}
        </nav>
      </header>

      <main style={{ flex: 1, width: "100%", padding: "150px 20px 10px" }}>
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
        &copy; {currentYear} VioApps. All rights reserved.
      </footer>
    </div>
  );
}
