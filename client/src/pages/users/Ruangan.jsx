import { Slash } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate from react-router-dom
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { gedungService } from "@/api/gedungApi";
import { ruanganService } from "@/api/RuanganApi";

function Ruangan() {
  const [gedungList, setGedungList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate for navigation in Vite/React
  const [ruanganList, setRuanganList] = useState([]);

  useEffect(() => {
    fetchGedungList();
  }, []);
  useEffect(() => {
    fetchRuanganList();
  }, []);

  const fetchRuanganList = async () => {
    try {
      setIsLoading(true);
      const data = await ruanganService.getAllRuangan(); // Assuming gedungService is correct
      setRuanganList(data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch gedung list");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGedungList = async () => {
    try {
      setIsLoading(true);
      const data = await gedungService.getAllGedung(); // Assuming gedungService is correct
      setGedungList(data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch gedung list");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle request button click (e.g., navigate to a reservation form or new page)
  const handleRequest = (idRuangan) => {
    // Redirect to the reservation page for the specific gedung (using navigate)
    navigate(`/user/PengajuanRuangan/${idRuangan}`); // Assuming this route exists
  };

  // Function to display status based on boolean or 1/0 value
  const getStatusText = (status) => {
    return status === true || status === 1 ? "Tersedia" : "Tidak Tersedia";
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Daftar Ruangan</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : gedungList.length === 0 ? (
            <p>No buildings available.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nama Ruangan</TableHead>
                  <TableHead>Nama Gedung</TableHead>
                  <TableHead>Kapasitas</TableHead>
                  <TableHead>Harga Sewa</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ruanganList.map((ruangan) => (
                  <TableRow key={ruangan.idRuangan}>
                    <TableCell>{ruangan.idRuangan}</TableCell>
                    <TableCell>{ruangan.namaRuangan}</TableCell>
                    <TableCell>{ruangan.gedung.namaGedung}</TableCell>
                    <TableCell>{ruangan.kapasitas}</TableCell>
                    <TableCell>{ruangan.hargaSewa}</TableCell>
                    <TableCell>{getStatusText(ruangan.status)}</TableCell>
                    <TableCell className="text-right space-x-2">
                      {/* Conditionally render the button based on status */}
                      {ruangan.status === 1 || ruangan.status === true ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRequest(ruangan.idRuangan)}
                        >
                          Ajukan Peminjaman
                        </Button>
                      ) : (
                        <span className="text-gray-500">Tidak Tersedia</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default Ruangan;
