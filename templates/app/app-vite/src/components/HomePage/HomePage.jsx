// Feel free to replace the content of this component with your own
function HomePage() {
  return (
    <section
      style={{
        padding: "28px",
        width: "100%",
      }}
    >
      <h1
        style={{
          margin: "10px 0",
          fontFamily: '"Playfair Display", Georgia, serif',
          fontWeight: 700,
          fontSize: "2.2rem",
          lineHeight: 1.2,
          letterSpacing: "0.02em",
          background: "linear-gradient(90deg, #057a1f 0%, #f83636 35%, #31067c 50%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Discover Your Next Event
      </h1>

      <p
        style={{
          margin: 0,
          color: "#123047",
          lineHeight: 1.7,
          fontFamily: '"Sora", "Segoe UI", sans-serif',
          fontWeight: 500,
          maxWidth: "62ch",
          textAlign: "justify",
        }}
      >
        Explore upcoming workshops, community meetups, and special experiences curated for
        every interest. Browse events, save your favorites, and complete your booking in a
        few quick steps.
      </p>

      <h2
        style={{
          margin: "30px 0 10px",
          color: "#2a1589",
          fontSize: "1.28rem",
          letterSpacing: "0.02em",
          fontFamily: '"Playfair Display", Georgia, serif',
          fontWeight: 700,
        }}
      >
        Why use VioApps Events?
      </h2>

      <p
        style={{
          margin: 0,
          color: "#123047",
          lineHeight: 1.7,
          fontFamily: '"Sora", "Segoe UI", sans-serif',
          fontWeight: 500,
          maxWidth: "62ch",
          textAlign: "justify",
        }}
      >
        Our platform keeps everything in one place: event details, your cart, and your order
        history. Sign in to manage your tickets smoothly from any device. Start with the Events page to find what matches your schedule, then head to Cart to
        confirm your selections.
      </p>
    </section>
  );
}

export default HomePage;
