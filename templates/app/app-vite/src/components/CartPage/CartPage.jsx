import { useCart } from "../../context/CartContext.jsx";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
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
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button type="button" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="cart-summary">
        <p>Total: {totalPrice === 0 ? "Free" : `€${totalPrice}`}</p>
        <button type="button" onClick={clearCart}>
          Clear cart
        </button>
      </div>
    </section>
  );
}
