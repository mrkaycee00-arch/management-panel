import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Dashboard() {
  const [health, setHealth] = useState<string>("loading");
  useEffect(() => {
    api.get("/health").then(r => setHealth(JSON.stringify(r.data)));
  }, []);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
      <div className="bg-white p-4 rounded shadow">
        <p>API health: {health}</p>
      </div>
    </div>
  );
}
