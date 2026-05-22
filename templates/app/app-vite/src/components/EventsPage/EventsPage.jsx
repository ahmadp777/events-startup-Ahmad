import { useState, useEffect } from "react";
import EventList from "../EventList/EventList";
import api from "../../api.js";

const PER_PAGE = 3;

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(api(`/events?name_like=${search}&_page=${page}&_limit=${PER_PAGE}`))
      .then((res) => {
        const total = Number(res.headers.get("X-Total-Count"));
        setTotalPages(Math.ceil(total / PER_PAGE));
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [search, page]);

  // reset to page 1 whenever search changes
  function handleSearch(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  const sortedEvents = [...events].sort((a, b) => {
    if (sortBy === "date") return new Date(a.date) - new Date(b.date);
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  if (error) return <p>Something went wrong: {error}</p>;

  return (
    <div>
      <div className="sort-controls">
        <input
          className="search-input"
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={handleSearch}
        />
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

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <>
          <EventList events={sortedEvents} />
          <div className="pagination">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
            >
              ← Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
}