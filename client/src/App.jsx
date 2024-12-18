import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardAdminFakultas from "./pages/adminFakultas/Dashboard";
import DashboardAdminUniversitas from "./pages/adminUniversitas/Dashboard";
import DashboardUser from "./pages/users/Dashboard";
import GedungCrud from "./pages/adminUniversitas/GedungCrud";
import RuanganCrud from "./pages/adminUniversitas/RuanganCrud";
import UserManagement from "./pages/adminUniversitas/UserManagement";
import Layout from "./components/Layouts";

const App = () => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [roleType, setRoleType] = useState(localStorage.getItem("roleType"));

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem("role"));
      setRoleType(localStorage.getItem("roleType"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/adminfakultas" element={<Layout role="admin fakultas" />}>
          <Route index element={<DashboardAdminFakultas />} />
          <Route path="dashboard" element={<DashboardAdminFakultas />} />
          <Route path="persetujuan" element={<div>Persetujuan Peminjaman</div>} />
        </Route>

        <Route path="/adminuniversitas" element={<Layout role="admin universitas" />}>
          <Route index element={<DashboardAdminUniversitas />} />
          <Route path="dashboard" element={<DashboardAdminUniversitas />} />
          <Route path="laporan" element={<div>Laporan Peminjaman</div>} />

          <Route path="gedung" element={<GedungCrud />} />
          <Route path="gedung/:id/ruangan" element={<RuanganCrud />} /> 

          <Route path="users" element={<UserManagement />} />
        </Route>

        <Route path="/user" element={<Layout role="user" />}>
          <Route index element={<DashboardUser />} />
          <Route path="dashboard" element={<DashboardUser />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;