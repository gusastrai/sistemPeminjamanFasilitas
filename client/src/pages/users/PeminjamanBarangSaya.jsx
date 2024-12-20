import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { peminjamanBarangService } from "@/api/PeminjamanBarangApi";

const DaftarPeminjamanBarang = () => {
  const [peminjamanList, setPeminjamanList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPeminjaman();
  }, []);

  const fetchPeminjaman = async () => {
    try {
      setIsLoading(true);
      const data = await peminjamanBarangService.getPeminjamanByUser();
      setPeminjamanList(data);
    } catch (error) {
      setError("Failed to fetch peminjaman list");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Peminjaman Barang Saya</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Tujuan Peminjaman</TableHead>
              <TableHead>Nama Barang</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Total Sewa</TableHead>
              <TableHead>Tanggal Mulai</TableHead>
              <TableHead>Tanggal Selesai</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {peminjamanList.map((peminjaman, index) => (
              <TableRow key={peminjaman.idPeminjaman}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{peminjaman.judulPeminjaman}</TableCell>
                <TableCell>
                  {peminjaman.peminjamanBarang?.barang.namaBarang
                    .charAt(0)
                    .toUpperCase() +
                    peminjaman.peminjamanBarang?.barang.namaBarang.slice(1)}
                </TableCell>
                <TableCell>
                  {peminjaman.peminjamanBarang?.jumlahPeminjaman}
                </TableCell>
                <TableCell>
                  {peminjaman.totalSewa}
                </TableCell>
                <TableCell>
                  {format(new Date(peminjaman.tanggalPeminjaman), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>
                  {format(new Date(peminjaman.tanggalSelesai), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      peminjaman.status
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {peminjaman.status ? "Disetujui" : "Pending"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DaftarPeminjamanBarang;
