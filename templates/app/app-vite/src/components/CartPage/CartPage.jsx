import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState(null);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0,
  );

  async function handleCheckout() {
    if (!token || !user) {
      setCheckoutError("You must be logged in to checkout.");
      return;
    }

    if (cartItems.length === 0 || isSubmitting || checkoutSuccess) {
      return;
    }

    setCheckoutError("");
    setIsSubmitting(true);

    const orderPayload = {
      createdAt: new Date().toISOString(),
      userId: Number(user.id),
      items: cartItems.map((item) => ({
        eventId: item.id,
        name: item.name,
        price: Number(item.price || 0),
        quantity: item.quantity,
      })),
      total: totalPrice,
    };

    try {
      const response = await fetch(api("/orders"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          navigate("/login", {
            replace: true,
            state: {
              from: { pathname: "/cart" },
              authMessage: "Your session expired. Please log in again to complete checkout.",
            },
          });
          return;
        }

        if (response.status === 403) {
          throw new Error(
            data.message ||
              "You are not allowed to create this order. Please log in again and try once more.",
          );
        }

        throw new Error(data.message || "Checkout failed. Please try again.");
      }

      setCheckoutSuccess({ orderId: data.id, total: totalPrice });
      clearCart();
    } catch (error) {
      if (error instanceof TypeError) {
        setCheckoutError("Could not reach the API. Make sure the mock API server is running.");
      } else {
        setCheckoutError(error.message || "Checkout failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <h1>Your Cart</h1>
        {checkoutSuccess && (
          <p className="feedback-success">
            Order #{checkoutSuccess.orderId} created successfully. Your cart is now locked and cleared.
          </p>
        )}
        {checkoutError && <p className="feedback-error">{checkoutError}</p>}
        <p>Your cart is empty.</p>
        {checkoutSuccess && (
          <p>
            <Link to="/orders" className="link">
              View your orders
            </Link>
          </p>
        )}
      </section>
    );
  }

  return (
    <section className="cart-page">
      <h1>Your Cart</h1>

      <ul className="cart-list">
        {cartItems.map((item) => {
          const unitPrice = Number(item.price || 0);
          const itemTotalPrice = unitPrice * item.quantity;

          return (
            <li key={item.id} className="cart-item">
              <div>
                <h3>{item.name}</h3>
                <p>{unitPrice === 0 ? "Free" : `€${unitPrice}`}</p>
                <p>Event total: {unitPrice === 0 ? "Free" : `€${itemTotalPrice}`}</p>
              </div>

              <div className="cart-controls">
                <button
                  type="button"
                  disabled={isSubmitting || Boolean(checkoutSuccess)}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  disabled={isSubmitting || Boolean(checkoutSuccess)}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  type="button"
                  disabled={isSubmitting || Boolean(checkoutSuccess)}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="cart-summary">
        <p>Total: {totalPrice === 0 ? "Free" : `€${totalPrice}`}</p>
        <div className="cart-actions">
          <button
            type="button"
            className="clear-btn"
            disabled={isSubmitting || Boolean(checkoutSuccess)}
            onClick={clearCart}
          >
            Clear cart
          </button>
          <button
            type="button"
            className="checkout-btn"
            disabled={isSubmitting || Boolean(checkoutSuccess)}
            onClick={handleCheckout}
          >
            {isSubmitting ? "Processing..." : "Checkout"}
          </button>
        </div>
      </div>

      {checkoutError && <p className="feedback-error">{checkoutError}</p>}
    </section>
  );
}
