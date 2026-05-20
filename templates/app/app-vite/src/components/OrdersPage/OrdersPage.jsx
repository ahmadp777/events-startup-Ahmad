import { useEffect, useState } from "react";
import api from "../../api.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function OrdersPage() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingOrderId, setRemovingOrderId] = useState(null);

  useEffect(() => {
    async function loadOrders() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setError("");

        const response = await fetch(api("/orders?_sort=id&_order=desc"), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json().catch(() => []);

        if (!response.ok) {
          throw new Error("Could not load your orders.");
        }

        setOrders(Array.isArray(data) ? data : []);
      } catch (fetchError) {
        setError(fetchError.message || "Could not load your orders.");
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, [token]);

  async function handleRemoveOrder(orderId) {
    if (!token || removingOrderId) {
      return;
    }

    setError("");
    setRemovingOrderId(orderId);

    try {
      const response = await fetch(api(`/orders/${orderId}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Could not remove this order.");
      }

      setOrders((previousOrders) =>
        previousOrders.filter((order) => order.id !== orderId),
      );
    } catch (removeError) {
      setError(removeError.message || "Could not remove this order.");
    } finally {
      setRemovingOrderId(null);
    }
  }

  return (
    <section className="orders-page">
      <h1>My Orders</h1>

      {user && (
        <>
          {loading && <p>Loading orders...</p>}
          {error && <p className="feedback-error">{error}</p>}

          {!loading && !error && orders.length === 0 ? (
            <p>You have no orders yet.</p>
          ) : (
            <ul className="orders-list">
              {orders.map((order) => (
                <li key={order.id}>
                  <h3>Order #{order.id}</h3>
                  <p>
                    Date: {order.createdAt ? new Date(order.createdAt).toLocaleString() : "Unknown"}
                  </p>
                  <p>Total: {Number(order.total || 0) === 0 ? "Free" : `€${Number(order.total || 0)}`}</p>
                  <p>Tickets: {Array.isArray(order.items) ? order.items.reduce((sum, item) => sum + Number(item.quantity || 0), 0) : 0}</p>
                  <button
                    type="button"
                    className="order-remove-btn"
                    disabled={removingOrderId === order.id}
                    onClick={() => handleRemoveOrder(order.id)}
                  >
                    {removingOrderId === order.id ? "Removing..." : "Remove"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
