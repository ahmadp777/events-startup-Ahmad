import EventCard from "../EventCard/EventCard.jsx";

export default function EventList({ events }) {
  if (events.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <ul className="event-list">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </ul>
  );
}
