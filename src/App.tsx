import { useState } from "react";

function App() {
  const [mount, setMount] = useState(0);
  const [interest, setInterest] = useState(0);
  const [month, setMonth] = useState(1);

  return (
    <main
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        gap: "20px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <header>
        <h1>compound interest</h1>
      </header>
      <section
        style={{
          width: "300px",
          height: "60%",
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="initial-mount">Initial Mount (s/.)</label>
          <input
            value={mount}
            onChange={(e) => setMount(Number(e.target.value))}
            style={{
              padding: "6px",
            }}
            type="number"
            id="initial-mount"
            placeholder="enter initial mount"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="interest">Interest (%)</label>
          <input
            value={interest}
            onChange={(e) => setInterest(Number(e.target.value))}
            style={{
              padding: "6px",
            }}
            type="number"
            id="interest"
            placeholder="enter interest in percentage"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="month">Month </label>
          <input
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            style={{
              padding: "6px",
            }}
            type="number"
            id="month"
            placeholder="enter month in number"
          />
        </div>
      </section>
      <section>
        <img src="" alt="graphic" />
      </section>
    </main>
  );
}

export default App;
