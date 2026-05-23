import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import EventsPage from "./components/EventsPage/EventsPage.jsx";
import EventDetail from "./components/EventDetail/EventDetail.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./main.css";
import CartPage from "./components/CartPage/CartPage.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import RequireAuth from "./components/RequireAuth/RequireAuth.jsx";
import AccountPage from "./components/AccountPage/AccountPage.jsx";
import OrdersPage from "./components/OrdersPage/OrdersPage.jsx";
import OrderDetailPage from "./components/OrderDetailPage/OrderDetailPage.jsx";
// Cart model: cart items are stored in localStorage via CartContext (no backend needed).
// At checkout, the cart is POSTed to POST /api/orders and then cleared.
// CartContext should follow the same pattern as AuthContext — see that file for reference.

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "events", element: <EventsPage /> },
      { path: "events/:id", element: <EventDetail /> },
      {
        path: "cart",
        element: (
          <RequireAuth>
            <CartPage />
          </RequireAuth>
        ),
      },
      {
        path: "account",
        element: (
          <RequireAuth>
            <AccountPage />
          </RequireAuth>
        ),
      },
      {
        path: "orders",
        element: (
          <RequireAuth>
            <OrdersPage />
          </RequireAuth>
        ),
      },
      {
        path: "orders/:id",
        element: (
          <RequireAuth>
            <OrderDetailPage />
          </RequireAuth>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </CartProvider>
  </React.StrictMode>,
);
