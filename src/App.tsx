import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

import { useCallback, useState } from "react";

function App() {
  const [mount, setMount] = useState(0);
  const [interest, setInterest] = useState(0);
  const [month, setMonth] = useState(1);

  const width = 640;
  const height = 400;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;
  const generateAxes = () => {
    const x = d3
      .scaleUtc()
      .domain([0, month])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleLinear()
      .domain([0, mount + interest])
      .range([height - marginBottom, marginTop]);

    const svg = d3.create("svg").attr("width", width).attr("height", height);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y));

    return svg;
  };

  const drawBarChart = (data: number[], root: SVGGElement) => {
    const interestElement = d3.select(root).selectAll("rect").data(data);
    interestElement
      .join("rect")
      .attr("x", function (_: number, i: number) {
        return i * 80;
      })
      .attr("y", function (d: number) {
        return 200 - d * 5;
      })
      .attr("width", 70)
      .attr("height", function (d: number) {
        return d * 5;
      })
      .attr("fill", "blue");
  };

  const axesRef = useCallback((container: SVGGElement | null) => {
    if (!container) return;
    container.append(generateAxes().node());
  }, []);

  const barChartRef = useCallback(
    (container: SVGGElement) => {
      // if (!container) return
      return drawBarChart(interest, container);
    },
    [interest]
  );

  return (
    <main
      style={{
        width: "100%",
        // height: "100vh",
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
          <label htmlFor="initial-mount">Initial Mount </label>
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
      <section style={{ flex: "1" }}>
        <svg ref={axesRef} />
        <svg
          ref={barChartRef}
          width={width}
          height={height}
          style={{ background: "whiteSmoke" }}
        />
      </section>
    </main>
  );
}

export default App;
