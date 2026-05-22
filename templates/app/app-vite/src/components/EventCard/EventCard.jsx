import { Link } from "react-router-dom";

// Week 1: EventCard with one hardcoded event written directly in JSX (no props yet).
export default function EventCard() {
  return (
    <li className="event-card">
      <h2>React Copenhagen Conference 2026</h2>
      <p>2026-04-15 at 09:00</p>
      <p>Copenhagen Concert Hall, Copenhagen</p>
      <p>Conference</p>
      <p>EUR149</p>
      <p>Sold out</p>
      <Link to="/events/1" className="details-link">
        View event details
      </Link>
    </li>
  );
}
