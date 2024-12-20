import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PUBLIC
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// FAKULTAS
import DashboardAdminFakultas from "./pages/adminFakultas/Dashboard";
import GedungCrudFakultas from "./pages/adminFakultas/GedungCrud";
import BarangCrud from "./pages/adminFakultas/BarangCrud";
import RuanganCrud from "./pages/adminUniversitas/RuanganCrud";
import UserManagementFakultas from "./pages/adminFakultas/UserManagement";
import PeminjamanBarang from "./pages/adminFakultas/PeminjamanBarang";
import PeminjamanRuangan from "./pages/adminFakultas/PeminjamanRuangan";
import DetailPeminjamanRuangan from "./pages/adminFakultas/DetailPeminjamanRuangan";
import DetailPeminjamanBarang from "./pages/adminFakultas/DetailPeminjamanBarang";

// UNIVERSITAS
import DashboardAdminUniversitas from "./pages/adminUniversitas/Dashboard";
import GedungCrud from "./pages/adminUniversitas/GedungCrud";
import UserManagement from "./pages/adminUniversitas/UserManagement";
import AdminManagement from "./pages/adminUniversitas/AdminManagement";
import BarangCrudUniversitas from "./pages/adminUniversitas/BarangCrud";
import PeminjamanBarangUniversitas from "./pages/adminUniversitas/PeminjamanBarang";
import PeminjamanRuanganUniversitas from "./pages/adminUniversitas/PeminjamanRuangan";
import DetailPeminjamanBarangUniversitas from "./pages/adminUniversitas/DetailPeminjamanBarang";
import DetailPeminjamanRuanganUniversitas from "./pages/adminUniversitas/DetailPeminjamanRuangan";

// USER
import DashboardUser from "./pages/users/Dashboard";
import RuanganUser from "./pages/users/Ruangan";
import BarangUser from "./pages/users/Barang";
import PengajuanRuanganUser from "./pages/users/PengajuanRuangan";
import PengajuanBarangUser from "./pages/users/PengajuanBarang";
import DaftarPeminjamanBarang from "./pages/users/DaftarPeminjamanBarang";
import DaftarPeminjamanRuangan from "./pages/users/DaftarPeminjamanRuangan";
import PeminjamanBarangSaya from "./pages/users/PeminjamanBarangSaya";
import PeminjamanRuanganSaya from "./pages/users/PeminjamanRuanganSaya";

// LAYOUT
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

          <Route path="peminjamanruangan" element={<PeminjamanRuangan />} />
          <Route path="peminjamanruangan/:id/detail" element={<DetailPeminjamanRuangan />} />

          <Route path="peminjamanbarang" element={<PeminjamanBarang />} />
          <Route path="peminjamanbarang/:id/detail" element={<DetailPeminjamanBarang />} />

          <Route path="gedung" element={<GedungCrudFakultas />} />
          <Route path="gedung/:id/ruangan" element={<RuanganCrud />} /> 

          <Route path="users" element={<UserManagementFakultas />} />

          <Route path="barang" element={<BarangCrud />} />
        </Route>

        <Route path="/adminuniversitas" element={<Layout role="admin universitas" />}>
          <Route index element={<DashboardAdminUniversitas />} />
          <Route path="dashboard" element={<DashboardAdminUniversitas />} />

          <Route path="peminjamanbarang" element={<PeminjamanBarangUniversitas />} />
          <Route path="peminjamanbarang/:id/detail" element={<DetailPeminjamanBarangUniversitas />} />

          <Route path="peminjamanruangan" element={<PeminjamanRuanganUniversitas />} />
          <Route path="peminjamanruangan/:id/detail" element={<DetailPeminjamanRuanganUniversitas />} />

          <Route path="gedung" element={<GedungCrud />} />
          <Route path="gedung/:id/ruangan" element={<RuanganCrud />} /> 

          <Route path="users" element={<UserManagement />} />
          <Route path="admins" element={<AdminManagement />} />

          <Route path="barang" element={<BarangCrudUniversitas />} /> 
        </Route>

        <Route path="/user" element={<Layout role="user" />}>
          <Route index element={<DashboardUser />} />
          <Route path="dashboard" element={<DashboardUser />} />

          <Route path="ruangan" element={<RuanganUser />} />
          <Route path="PengajuanRuangan/:idRuangan" element={<PengajuanRuanganUser />} />
          <Route path="daftarpeminjamanruangan" element={<DaftarPeminjamanRuangan />} />
          <Route path="daftarpeminjamanruangansaya" element={<PeminjamanRuanganSaya />} />

          <Route path="barang" element={<BarangUser />} />
          <Route path="PengajuanBarang/:idBarang" element={<PengajuanBarangUser />} />
          <Route path="daftarpeminjamanbarang" element={<DaftarPeminjamanBarang />} />
          <Route path="daftarpeminjamanbarangsaya" element={<PeminjamanBarangSaya />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;