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
import { peminjamanRuanganService } from "@/api/PeminjamanRuanganApi";

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
      const data = await peminjamanRuanganService.getAllPeminjamanBarangAcc();
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
        <CardTitle>Daftar Peminjaman Ruangan</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama Gedung</TableHead>
              <TableHead>Nama Ruangan</TableHead>
              <TableHead>Tanggal Mulai</TableHead>
              <TableHead>Tanggal Selesai</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {peminjamanList.map((peminjaman, index) => (
              <TableRow key={peminjaman.idPeminjaman}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {peminjaman.peminjamanRuangan?.ruangan.gedung.namaGedung}
                </TableCell>
                <TableCell>
                  {peminjaman.peminjamanRuangan?.ruangan.namaRuangan}
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
