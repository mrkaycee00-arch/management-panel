import React from "react";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";

export default function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Management Panel (Demo)</h1>
      <Dashboard />
      <hr className="my-6" />
      <Users />
    </div>
  );
}
