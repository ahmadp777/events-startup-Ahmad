import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import vioappslogo from "../../assets/vioapps-logo.png";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";

export default function Layout() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

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
          position: "sticky",
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
          className="site-nav"
        >
          <div className="site-nav-group site-nav-group-primary">
            <img
              src={vioappslogo}
              alt="VioApps logo"
              className="logo site-nav-logo"
            />
            {/* Navigation links go here — e.g. link to event list, cart, login */}
            <Link to="/" className="link site-nav-link">
              Home
            </Link>
            <Link to="/events" className="link site-nav-link">
              Events
            </Link>
            <Link to="/cart" className="link site-nav-link">
              Cart ({cartCount})
            </Link>

            {user && (
              <>
                <Link to="/account" className="link site-nav-link">
                  Account
                </Link>
                <Link to="/orders" className="link site-nav-link">
                  Orders
                </Link>
              </>
            )}
          </div>

          <div className="site-nav-group site-nav-group-secondary">
            {user && (
              <>
                <span className="link site-nav-link site-nav-user">{user.email}</span>
                <button
                  onClick={logout}
                  className="link nav-button site-nav-link"
                >
                  Sign out
                </button>
              </>
            )}

            {!user && (
              <>
                <Link to="/login" className="link site-nav-link">
                  Login
                </Link>
                <Link to="/register" className="link site-nav-link">
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main
        style={{
          flex: 1,
          width: "100%",
          padding: "24px 20px 10px",
          backgroundImage: "url('/15.png')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      >
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
