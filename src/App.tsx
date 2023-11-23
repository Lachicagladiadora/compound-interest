import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

import { useCallback, useState } from "react";

const width = 840;
const height = 550;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

function App() {
  const [amount, setAmount] = useState<number>();
  const [interest, setInterest] = useState<number>(0.01);
  const [iteration, setIteration] = useState<number>();

  if (amount < 0) return setAmount(0);
  if (interest < 0) return setInterest(0.1);
  if (iteration < 1) return setIteration(1);

  const finalAmount =
    amount *
    (1 + interest / (100 * (iteration - 1))) **
      ((iteration - 1) * (iteration / 12));

  const barData: object = new Array(iteration).fill(amount).reduce(
    (acu) => {
      const newCapital = acu.last * interest + acu.last;
      console.log(newCapital);
      return {
        last: newCapital,
        barDataArray: [...acu.barDataArray, newCapital],
      };
    },
    { last: amount, barDataArray: [] }
  );

  console.log({ barData });
  // console.log(barData.barDataArray);

  const generateAxes = () => {
    const x = d3
      .scaleUtc()
      .domain([0, iteration])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleLinear()
      .domain([0, amount + interest])
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
        return i * 10;
      })
      .attr("y", function (d: number) {
        return height - d * amount;
      })
      .attr("width", 5)
      .attr("height", function (d: number) {
        return d * amount;
      })
      .attr("fill", "green");
  };

  const axesRef = useCallback(
    (container: SVGGElement | null) => {
      if (!container) return;
      container.append(generateAxes().node());
    },
    [amount, interest, iteration]
  );

  const barChartRef = useCallback(
    (container: SVGGElement) => {
      if (!container) return;
      return drawBarChart(barData.barDataArray, container);
    },
    [interest, amount, iteration]
  );

  return (
    <main
      style={{
        width: "100%",
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
          width: "400px",
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
          <label
            htmlFor="initial-mount"
            style={{
              color: `${amount < 1 ? "red" : "green"}`,
            }}
          >
            Initial Amount{" "}
          </label>
          <input
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            style={{
              padding: "6px",
              border: `${amount < 1 ? "none" : "red"}`,
              color: `${amount < 1 ? "red" : "green"}`,
            }}
            type="number"
            id="initial-mount"
            placeholder="enter initial amount"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label
            htmlFor="interest"
            style={{
              color: `${interest <= 0 ? "red" : "green"}`,
            }}
          >
            Annual Interest (%)
          </label>
          <input
            value={interest}
            onChange={(e) => setInterest(Number(e.target.value))}
            style={{
              padding: "6px",
              border: `${interest < 0 ? "none" : "red"}`,
              color: `${interest < 0 ? "red" : "green"}`,
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
          <label
            htmlFor="month"
            style={{
              color: `${iteration < 1 ? "red" : "green"}`,
            }}
          >
            Number of iterations{" "}
          </label>
          <input
            value={iteration}
            onChange={(e) => setIteration(Number(e.target.value))}
            style={{
              padding: "6px",
              border: `${iteration < 1 ? "none" : "red"}`,
              color: `${iteration < 1 ? "red" : "green"}`,
            }}
            type="number"
            id="month"
            placeholder="enter number of iterations"
          />
        </div>
      </section>
      <p>
        The amount accumulated in {iteration} months is: 💵 {finalAmount} 💵
      </p>
      <section style={{ flex: "1", position: "relative" }}>
        <svg
          ref={axesRef}
          style={{ position: "absolute", bottom: "-40px", left: "-40px" }}
        />
        <div style={{ width: `${width}`, height: `${height}` }}>
          <svg
            ref={barChartRef}
            width={width}
            height={height}
            style={{ background: "silver" }}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
