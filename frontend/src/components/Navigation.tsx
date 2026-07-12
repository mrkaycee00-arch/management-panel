import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:text-blue-100">
          Management Panel
        </Link>
        <div className="flex gap-4 items-center">
          <Link to="/" className="hover:text-blue-100">
            Dashboard
          </Link>
          <Link to="/products" className="hover:text-blue-100">
            Products
          </Link>
          {user?.role === "admin" && (
            <Link to="/admin/users" className="hover:text-blue-100">
              Admin
            </Link>
          )}
          <div className="flex gap-3 items-center">
            <span className="text-sm">{user?.name}</span>
            <Link to="/profile" className="hover:text-blue-100">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
