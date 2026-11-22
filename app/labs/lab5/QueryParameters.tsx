
"use client";

import { useState } from "react";

export default function QueryParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");
  const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

  return (
    <div id="wd-query-parameters" className="space-y-3">
      <h3 className="text-xl font-bold">Query Parameters</h3>

      <div className="flex gap-2">
        <input
          type="number"
          value={a}
          onChange={(e) => setA(e.target.value)}
          className="rounded border p-2"
        />
        <input
          type="number"
          value={b}
          onChange={(e) => setB(e.target.value)}
          className="rounded border p-2"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          id="wd-query-parameter-add"
          href={`${HTTP_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}
          className="rounded bg-blue-600 px-3 py-2 text-white"
        >
          Add {a} + {b}
        </a>

        <a
          id="wd-query-parameter-subtract"
          href={`${HTTP_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}
          className="rounded bg-blue-600 px-3 py-2 text-white"
        >
          Subtract {a} - {b}
        </a>

        <a
          id="wd-query-parameter-multiply"
          href={`${HTTP_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}
          className="rounded bg-blue-600 px-3 py-2 text-white"
        >
          Multiply {a} × {b}
        </a>

        <a
          id="wd-query-parameter-divide"
          href={`${HTTP_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}
          className="rounded bg-blue-600 px-3 py-2 text-white"
        >
          Divide {a} ÷ {b}
        </a>
      </div>
    </div>
  );
}
