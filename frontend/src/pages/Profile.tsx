import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    try {
      // In a real app, you'd call the API to update the profile
      setMessage("Profile update would be sent to backend");
      setTimeout(() => setMessage(""), 3000);
      setIsEditing(false);
    } catch (error) {
      setMessage("Failed to update profile");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6 max-w-md">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Role</label>
          <input
            type="text"
            value={user?.role || ""}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 capitalize"
          />
        </div>

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                className="flex-1 bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-400 text-white font-bold py-2 px-4 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
