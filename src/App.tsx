import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

import { useCallback, useState } from "react";

type GetFinalAmoutInput = {
  amount: number;
  interest: number;
  iteration: number;
};

const width = 840;
const height = 550;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

function App() {
  const [amount, setAmount] = useState(0);
  const [interest, setInterest] = useState(0.01);
  const [iteration, setIteration] = useState(1);

  const onChangeAmount = (newValue: number) => {
    if (amount < 0) return setAmount(0);
    setAmount(newValue);
  };

  const onChangeInterest = (newValue: number) => {
    if (interest < 0) return setInterest(0.1);
    setInterest(newValue);
  };

  const onChangeIteration = (newValue: number) => {
    if (iteration < 1) return setIteration(1);
    setIteration(newValue);
  };

  const getFinalAmount = ({
    amount,
    interest,
    iteration,
  }: GetFinalAmoutInput) => {
    return (
      amount *
      (1 + interest / (100 * (iteration - 1))) **
        ((iteration - 1) * (iteration / 12))
    );
  };

  const interestChartRef = useCallback(
    (container: SVGGElement | null) => {
      if (!container) return;

      d3.select(container).attr("background", "red");

      const barChartRoot = d3.select(container).select("#bar-chart");
      const axesChartRoot = d3.select(container).select("#axes-chart");
      console.log({ barChartRoot });
      console.log({ axesChartRoot });
      const data = getCompoundRate({ iteration, amount, interest });
      drawBarChart({ data, root: barChartRoot, amount });
      drawAxesChart({
        amount,
        height,
        interest,
        iteration,
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
        root: axesChartRoot,
        width,
      });
    },
    [iteration, amount, interest]
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
            onChange={(e) => onChangeAmount(Number(e.target.value))}
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
            onChange={(e) => onChangeInterest(Number(e.target.value))}
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
            onChange={(e) => onChangeIteration(Number(e.target.value))}
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
        The amount accumulated in {iteration} months is: 💵{" "}
        {getFinalAmount({ amount, interest, iteration })} 💵
      </p>
      <section style={{ flex: "1", position: "relative" }}>
        {/* <svg
          ref={axesRef}
          style={{ position: "absolute", bottom: "-40px", left: "-40px" }}
        /> */}
        <div style={{ width: `${width}`, height: `${height}` }}>
          <svg
            ref={interestChartRef}
            width={width}
            height={height}
            style={{ background: "black" }}
          >
            <g id="bar-chart"></g>
            <g id="axes-chart"></g>
          </svg>
        </div>
      </section>
    </main>
  );
}

export default App;

type GetCompoundRateInput = {
  iteration: number;
  amount: number;
  interest: number;
};

type CompoundRateResult = {
  last: number;
  data: number[];
};

type drawBarChartInput = {
  amount: number;
  data: number[];
  root: any;
};

type drawAxeChartInput = {
  amount: number;
  iteration: number;
  interest: number;
  root: any;
  height: number;
  width: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  data?: number[];
};

const getCompoundRate = ({
  iteration,
  amount,
  interest,
}: GetCompoundRateInput): number[] => {
  const { data } = new Array(iteration).fill(amount).reduce(
    (acu: CompoundRateResult): CompoundRateResult => {
      const newCapital = acu.last * interest + acu.last;
      console.log(newCapital);
      return {
        last: newCapital,
        data: [...acu.data, newCapital],
      };
    },
    { last: amount, data: [] }
  );
  return data;
};

const drawBarChart = ({ amount, data, root }: drawBarChartInput) => {
  console.log({ root });

  const rectElement = root.selectAll("rect").data(data);
  rectElement
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

const drawAxesChart = ({
  amount,
  iteration,
  interest,
  root,
  height,
  width,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
}: drawAxeChartInput) => {
  // const rootElement = d3.select(root);
  console.log({ root }, "root2");
  const xAxe = d3
    .scaleLinear()
    .domain([0, iteration])
    .range([marginLeft, width - marginRight]);

  const yAxe = d3
    .scaleLinear()
    .domain([0, amount + interest])
    .range([height - marginBottom, marginTop]);

  root
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(xAxe));

  root.attr("transform", `translate(${marginLeft},0)`).call(d3.axisLeft(yAxe));
};
