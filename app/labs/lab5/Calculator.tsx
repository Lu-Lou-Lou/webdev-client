"use client";

import { useRef, useState } from "react";

const operations = { add: "+", subtract: "-", multiply: "×", divide: "÷" };
type Operation = keyof typeof operations;
type Calculation = { a: number; b: number; operation: Operation; result: number };

export default function CalculatorNextWebApiClient() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [operation, setOperation] = useState<Operation>("add");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const latestRequest = useRef(0);

  async function calculate(selectedOperation: Operation) {
    const request = ++latestRequest.current;
    setResult("");
    setError("");
    if (a === "" || b === "") return;

    try {
      const query = new URLSearchParams({ a, b, operation: selectedOperation });
      const response = await fetch(`/api/lab5/calculator?${query}`);
      if (!response.ok) {
        const { error } = (await response.json()) as { error: string };
        if (request === latestRequest.current) setError(error);
        return;
      }
      const data = (await response.json()) as Calculation;
      if (request === latestRequest.current) {
        setResult(`${data.a} ${operations[data.operation]} ${data.b} = ${data.result}`);
      }
    } catch {
      if (request === latestRequest.current) setError("Unable to reach the calculator.");
    }
  }

  const fieldClass = "rounded border border-neutral-300 px-2 py-1";

  return (
    <div id="wd-lab5-next-calculator" className="space-y-3 p-2">
      <h3 className="text-xl font-bold">Calculator (Next.js Web API)</h3>
      <div>
        <label htmlFor="a-input" className="mr-2">A:</label>
        <input id="a-input" type="number" step="any" placeholder="A" className={fieldClass}
          value={a} onChange={(event) => setA(event.target.value)} />
      </div>
      <div>
        <label htmlFor="b-input" className="mr-2">B:</label>
        <input id="b-input" type="number" step="any" placeholder="B" className={fieldClass}
          value={b} onChange={(event) => setB(event.target.value)} />
      </div>
      <div>
        <label htmlFor="operation-select" className="mr-2">Operation:</label>
        <select id="operation-select" className={fieldClass} value={operation}
          onChange={(event) => {
            const selected = event.target.value as Operation;
            setOperation(selected);
            void calculate(selected);
          }}>
          {Object.entries(operations).map(([value, symbol]) => (
            <option key={value} value={value}>{symbol}</option>
          ))}
        </select>
      </div>
      <button type="button" className="rounded bg-blue-600 px-4 py-1.5 text-white disabled:opacity-50"
        disabled={a === "" || b === ""} onClick={() => calculate(operation)}>
        Calculate
      </button>
      {result && <input aria-label="Result" className={`block ${fieldClass}`} value={result} readOnly />}
      {error && <p role="alert">{error}</p>}
      <hr />
    </div>
  );
}
