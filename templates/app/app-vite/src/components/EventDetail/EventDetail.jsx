import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api.js";
import { useCart } from "../../context/CartContext.jsx";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { addToCart } = useCart();


  useEffect(() => {
    fetch(api(`/events/${id}`))
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);


  if (loading) return <p>Loading event...</p>;
  if (error) return <p>Something went wrong: {error}</p>;

  if (!event) {
    return (
      <section className="event-detail">
        <h1>Event not found</h1>
        <p>The event you requested does not exist.</p>
      </section>
    );
  }

  const soldOut = event.ticketsAvailable === 0;
  const venue = event.venue;
  const city = event.city;
  const category = event.category;
  const priceLabel = event.price === 0 ? "Free" : `EUR${event.price}`;
  const availabilityLabel = soldOut
    ? "Sold out"
    : `${event.ticketsAvailable} tickets left`;

  return (
    <section className="event-detail">
      <h1>{event.name}</h1>
      <p>Date: {event.date}</p>
      <p>Time: {event.time}</p>
      <p>Venue: {venue}</p>
      <p>City: {city}</p>
      <p>Category: {category}</p>
      <p>Price: {priceLabel}</p>
      <p>Availability: {availabilityLabel}</p>
      
      <button className="cart-button" onClick={() => addToCart(event)} disabled={soldOut}>
        Add to Cart
      </button>

      <div className="description-section">
        <h3>Description</h3>
        <p>{isExpanded ? event.description : `${event.description.substring(0, 100)}...`}</p>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Show less" : "Show more"}
        </button>
      </div>
    </section>
  );
}