function App() {
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
          height: "60%",
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        <div>
          <label htmlFor="initial-mount">Initial Mount</label>
          <input
            type="number"
            name=""
            id="initial-mount"
            placeholder="enter initial mount"
          />
        </div>
        <div>
          <label htmlFor="interest">Interest</label>
          <input
            type="number"
            name=""
            id="interest"
            placeholder="enter interest in percentage"
          />
        </div>
        <div>
          <label htmlFor="month">Month</label>
          <input
            type="number"
            name=""
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
