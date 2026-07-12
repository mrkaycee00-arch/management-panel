import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    api.get("/users").then(r => setUsers(r.data));
  }, []);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Users</h2>
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full table-fixed">
          <thead>
            <tr className="text-left">
              <th className="w-1/3">Name</th>
              <th className="w-1/3">Email</th>
              <th className="w-1/3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
