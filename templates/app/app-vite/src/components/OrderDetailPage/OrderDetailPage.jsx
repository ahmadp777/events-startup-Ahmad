import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function OrderDetailPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrder() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setError("");

        const response = await fetch(api(`/orders/${id}`), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error("Could not load this order.");
        }

        setOrder(data);
      } catch (fetchError) {
        setError(fetchError.message || "Could not load this order.");
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [id, token]);

  if (loading) {
    return (
      <section className="order-detail-page">
        <h1>Order Details</h1>
        <p>Loading order...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="order-detail-page">
        <h1>Order Details</h1>
        <p className="feedback-error">{error}</p>
        <p>
          <Link to="/orders" className="link">
            Back to my orders
          </Link>
        </p>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="order-detail-page">
        <h1>Order Details</h1>
        <p>Order not found.</p>
        <p>
          <Link to="/orders" className="link">
            Back to my orders
          </Link>
        </p>
      </section>
    );
  }

  const ticketCount = Array.isArray(order.items)
    ? order.items.reduce((sum, item) => sum + Number(item.quantity || 0), 0)
    : 0;

  return (
    <section className="order-detail-page">
      <h1>Order #{order.id}</h1>
      <p>Date: {order.createdAt ? new Date(order.createdAt).toLocaleString() : "Unknown"}</p>
      <p>Total: {Number(order.total || 0) === 0 ? "Free" : `€${Number(order.total || 0)}`}</p>
      <p>Total tickets: {ticketCount}</p>

      <h2>My Tickets</h2>
      {Array.isArray(order.items) && order.items.length > 0 ? (
        <ul className="ticket-list">
          {order.items.map((item) => (
            <li key={`${order.id}-${item.eventId}`} className="ticket-item">
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price per ticket: {Number(item.price || 0) === 0 ? "Free" : `€${Number(item.price || 0)}`}</p>
              <p>
                Ticket total: {Number(item.price || 0) === 0 ? "Free" : `€${Number(item.price || 0) * Number(item.quantity || 0)}`}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tickets found for this order.</p>
      )}

      <p>
        <Link to="/orders" className="link">
          Back to my orders
        </Link>
      </p>
    </section>
  );
}