import { useState } from "react";
import EventList from "../EventList/EventList";
import events from "../../data/events.js";

export default function EventsPage() {
  const [sortBy, setSortBy] = useState("date");
  const sortedEvents = [...events].sort((a, b) => {
    if (sortBy === "date") return new Date(a.date) - new Date(b.date);
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div>
      <div className="sort-controls">
        <label className="sort-label">
          Sort by:
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Date</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>
      <EventList events={sortedEvents} />
    </div>
  );
}