"use client";

import { useEffect, useState } from "react";
import { fetchHello } from "./client";

export default function HelloRoute() {
  const [hello, setHello] = useState<{ message?: string }>({});
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetchHello(controller.signal).then(setHello).catch(() => {
      if (!controller.signal.aborted) setError("Unable to fetch the hello message.");
    });
    return () => controller.abort();
  }, []);

  return (
    <div id="wd-lab5-next-hello" className="space-y-3">
      <h4>GET /api/lab5/hello (Next.js Route Handler)</h4>
      <pre aria-live="polite">{JSON.stringify(hello, null, 2)}</pre>
      {error && <p role="alert">{error}</p>}
      <hr />
    </div>
  );
}
