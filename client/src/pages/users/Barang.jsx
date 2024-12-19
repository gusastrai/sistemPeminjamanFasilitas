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
import { barangService } from "@/api/BarangApi";
function Barang() {
  const [barangList, setBarangList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate for navigation in Vite/React
  const [ruanganList, setRuanganList] = useState([]);

  useEffect(() => {
    fetchBarangList();
  }, []);

  const fetchBarangList = async () => {
    try {
      setIsLoading(true);
      const data = await barangService.getAllBarang(); // Assuming gedungService is correct
      setBarangList(data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch gedung list");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle request button click (e.g., navigate to a reservation form or new page)
  const handleRequest = (Barang) => {
    // Redirect to the reservation page for the specific gedung (using navigate)
    navigate(`/user/PengajuanBarang/${Barang}`); // Assuming this route exists
  };

  // Function to display status based on boolean or 1/0 value
  const getStatusText = (jumlah) => {
    return jumlah > 0 ? "Tersedia" : "Tidak Tersedia";
  };

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" style={{ fontWeight: "bold" }}>
              Barang
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Daftar Barang</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : barangList.length === 0 ? (
            <p>No buildings available.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nama Barang</TableHead>
                  <TableHead>Jumlah tersedia</TableHead>
                  <TableHead>Harga Sewa</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {barangList.map((barang) => (
                  <TableRow key={barang.idBarang}>
                    <TableCell>{barang.idBarang}</TableCell>
                    <TableCell>{barang.namaBarang}</TableCell>
                    <TableCell>{barang.jumlah}</TableCell>
                    <TableCell>{barang.hargaSewa}</TableCell>
                    <TableCell>{getStatusText(barang.jumlah)}</TableCell>
                    <TableCell className="text-right space-x-2">
                      {/* Conditionally render the button based on status */}
                      {barang.jumlah > 0 ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRequest(barang.idBarang)}
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

export default Barang;
