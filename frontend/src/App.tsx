import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminUsers from "./pages/AdminUsers";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Navigation from "./components/Navigation";
import "./index.css";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <div className="min-h-screen bg-gray-50">
                  <Navigation />
                  <Dashboard />
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <div className="min-h-screen bg-gray-50">
                  <Navigation />
                  <AdminUsers />
                </div>
              </AdminRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <div className="min-h-screen bg-gray-50">
                  <Navigation />
                  <Products />
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <div className="min-h-screen bg-gray-50">
                  <Navigation />
                  <Profile />
                </div>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
