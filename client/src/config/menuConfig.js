import { Calendar, Home, Inbox, Search, Settings, CheckSquare, FileText, Building } from "lucide-react";

export const adminFakultasMenu = [
  { title: "Home", url: "/adminfakultas/dashboard", icon: Home },
  { title: "Persetujuan Peminjaman", url: "/adminfakultas/persetujuan", icon: CheckSquare },
  { title: "Inbox", url: "#", icon: Inbox },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
];

export const adminUniversitasMenu = [
  { title: "Home", url: "/adminuniversitas/dashboard", icon: Home },
  { title: "Laporan Peminjaman", url: "/adminuniversitas/laporan", icon: FileText },
  { title: "Kelola Gedung", url: "/adminuniversitas/gedung", icon: Building },
  { title: "Kelola Pengguna", url: "/adminuniversitas/users", icon: Search },
  { title: "Inbox", url: "#", icon: Inbox },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Settings", url: "#", icon: Settings },
];

export const userMenu = [
  { title: "Home", url: "/user/dashboard", icon: Home },
  { title: "Fasilitas", url: "/user/fasilitas", icon: Building },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
];