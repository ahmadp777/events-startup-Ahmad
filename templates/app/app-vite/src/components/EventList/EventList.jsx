import EventCard from "../EventCard/EventCard.jsx";

// TODO: split each event below into its own EventCard component
// TODO: add a "Buy ticket" button to each event card
// TODO: replace the mock data import with a fetch call to GET /events

export default function EventList() {
  return (
    <ul>
      <EventCard />
    </ul>
  );
}
