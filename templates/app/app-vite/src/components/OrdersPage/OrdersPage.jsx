import { useAuth } from "../../context/AuthContext.jsx";

export default function OrdersPage() {
  const { user } = useAuth();

  const orders = [];

  return (
    <section className="orders-page">
      <h1>My Orders</h1>

      {user && (
        <>
          {orders.length === 0 ? (
            <p>You have no orders yet.</p>
          ) : (
            <ul className="orders-list">
              {orders.map((order) => (
                <li key={order.id}>
                  <h3>Order #{order.id}</h3>
                  <p>Date: {order.date}</p>
                  <p>Total: EUR{order.total}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
