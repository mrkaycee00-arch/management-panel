import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-4">
          Welcome, {user?.name}! 👋
        </h1>
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2">Your Role</h3>
            <p className="text-lg capitalize">{user?.role}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-bold text-green-900 mb-2">Email</h3>
            <p className="text-lg">{user?.email}</p>
          </div>
        </div>
        {user?.role === "admin" && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-900">
              ✨ You have admin access. Visit the <strong>Admin</strong> page to manage users.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
