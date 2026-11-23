"use client";

import { useEffect, useState } from "react";
import { fetchWelcomeMessage } from "./client";

export default function HttpClient() {
  const [welcomeOnClick, setWelcomeOnClick] = useState("");
  const [welcomeOnLoad, setWelcomeOnLoad] = useState("");

  const fetchWelcomeOnClick = async () => {
    try {
      setWelcomeOnClick(await fetchWelcomeMessage());
    } catch {
      setWelcomeOnClick("Unable to fetch the welcome message.");
    }
  };

  useEffect(() => {
    let active = true;

    const fetchWelcomeOnLoad = async () => {
      try {
        const message = await fetchWelcomeMessage();
        if (active) setWelcomeOnLoad(message);
      } catch {
        if (active) setWelcomeOnLoad("Unable to fetch the welcome message.");
      }
    };

    void fetchWelcomeOnLoad();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div id="wd-http-client" className="space-y-3">
      <h3 className="text-xl font-bold">HTTP Client</h3>
      <h4>Requesting on Click</h4>
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
        onClick={fetchWelcomeOnClick}
      >
        Fetch Welcome
      </button>
      <p aria-live="polite">Response from server: <b>{welcomeOnClick}</b></p>
      <h4>Requesting on Load</h4>
      <p aria-live="polite">Response from server: <b>{welcomeOnLoad}</b></p>
      <hr />
    </div>
  );
}
