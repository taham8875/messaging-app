import React from "react";
import Login from "./users/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
