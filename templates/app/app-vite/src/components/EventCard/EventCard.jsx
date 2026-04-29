import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  const soldOut = event.ticketsAvailable === 0;

  return (
    <li className="event-card">
      <h2>{event.name}</h2>
      <p>
        {event.date} at {event.time}
      </p>
      <p>
        {event.venue}, {event.city}
      </p>
      <p>{event.category}</p>
      <p>{event.price === 0 ? "Free" : `EUR${event.price}`}</p>
      <p>{soldOut ? "Sold out" : `${event.ticketsAvailable} tickets left`}</p>
      <Link to={`/events/${event.id}`} className="details-link">
        View event details
      </Link>
    </li>
  );
}
