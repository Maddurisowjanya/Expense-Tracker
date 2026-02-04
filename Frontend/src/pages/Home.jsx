function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        color: "white",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>
        Smart Expense Tracker
      </h1>

      <p style={{ fontSize: "1.2rem", maxWidth: "600px", marginBottom: "30px" }}>
        Track your daily expenses, stay within your budget,  
        and take control of your financial future.
      </p>

      <div>
        <button
          style={buttonStyle}
          onClick={() => window.location.href = "/login"}
        >
          Login
        </button>

        <button
          style={{ ...buttonStyle, backgroundColor: "#22c55e" }}
          onClick={() => window.location.href = "/register"}
        >
          Get Started
        </button>
      </div>

      <p style={{ marginTop: "40px", fontStyle: "italic" }}>
        “Small savings today lead to big freedom tomorrow.”
      </p>
    </div>
  );
}

const buttonStyle = {
  padding: "12px 24px",
  margin: "10px",
  fontSize: "1rem",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  backgroundColor: "#facc15",
};

export default Home;
