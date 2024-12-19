import { Calendar, Home, Inbox, Search, Settings, CheckSquare, FileText, Building, Users, Box } from "lucide-react";

export const adminFakultasMenu = [
  { title: "Home", url: "/adminfakultas/dashboard", icon: Home },
  { title: "Persetujuan Peminjaman Ruangan", url: "/adminfakultas/peminjamanruangan", icon: CheckSquare },
  { title: "Kelola Ruangan", url: "/adminfakultas/gedung", icon: Building },
  { title: "Kelola Barang", url: "/adminfakultas/barang", icon: Box },
  { title: "Kelola Pengguna", url: "/adminfakultas/users", icon: Users },
];

export const adminUniversitasMenu = [
  { title: "Home", url: "/adminuniversitas/dashboard", icon: Home },
  { title: "Laporan Peminjaman", url: "/adminuniversitas/laporan", icon: FileText },
  { title: "Kelola Gedung", url: "/adminuniversitas/gedung", icon: Building },
  { title: "Daftar Barang", url: "/adminuniversitas/barang", icon: Box },
  { title: "Daftar Pengguna", url: "/adminuniversitas/users", icon: Search },
  { title: "Kelola Admin", url: "/adminuniversitas/admins", icon: Users },
];

export const userMenu = [
  { title: "Home", url: "/user/dashboard", icon: Home },
  { title: "Ruangan", url: "/user/ruangan", icon: Building },
  { title: "Barang", url: "/user/barang", icon: Box },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
];