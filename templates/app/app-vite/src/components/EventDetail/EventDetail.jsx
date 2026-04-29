import { useState } from "react";
import { useParams } from "react-router-dom";
import events from "../../data/events.js";

export default function EventDetail() {
  const { id } = useParams();
  const event = events.find((item) => item.id === Number(id));
  const [isExpanded, setIsExpanded] = useState(false);

  if (!event) {
    return (
      <section className="event-detail">
        <h1>Event not found</h1>
        <p>The event you requested does not exist.</p>
      </section>
    );
  }

  const soldOut = event.ticketsAvailable === 0;

  return (
    <section className="event-detail">
      <h1>{event.name}</h1>
      <p>Date: {event.date}</p>
      <p>Time: {event.time}</p>
      <p>Venue: {event.venue}</p>
      <p>City: {event.city}</p>
      <p>Category: {event.category}</p>
      <p>Price: {event.price === 0 ? "Free" : `EUR${event.price}`}</p>
      <p>
        Availability:{" "}
        {soldOut ? "Sold out" : `${event.ticketsAvailable} tickets left`}
      </p>

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