import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { CheckCircle, XCircle, FileText } from "lucide-react";
import { peminjamanService } from "@/api/PeminjamanApi";

const DaftarPeminjamanRuangan = () => {
  const [peminjamanList, setPeminjamanList] = useState([]);
  const [selectedPeminjaman, setSelectedPeminjaman] = useState(null);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPeminjaman();
  }, []);

  const fetchPeminjaman = async () => {
    try {
      const data = await peminjamanService.getAllPeminjaman();
      setPeminjamanList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async () => {
    try {
      await peminjamanService.approvePeminjaman(
        selectedPeminjaman.idPeminjaman
      );
      setIsApproveDialogOpen(false);
      fetchPeminjaman();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async () => {
    try {
      await peminjamanService.rejectPeminjaman(selectedPeminjaman.idPeminjaman);
      setIsRejectDialogOpen(false);
      fetchPeminjaman();
    } catch (error) {
      console.error(error);
    }
  };

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
              <TableHead>Peminjam</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Tanggal Mulai</TableHead>
              <TableHead>Tanggal Selesai</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {peminjamanList.map((peminjaman, index) => (
              <TableRow key={peminjaman.idPeminjaman}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{peminjaman.user.nama}</TableCell>
                <TableCell>{peminjaman.judulPeminjaman}</TableCell>
                <TableCell>
                  {format(new Date(peminjaman.tanggalPeminjaman), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>
                  {format(new Date(peminjaman.tanggalSelesai), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>
                  {peminjaman.status ? "Disetujui" : "Pending"}
                </TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      navigate(`/adminfakultas/peminjamanruangan/${peminjaman.idPeminjaman}/detail`)
                    }
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Detail
                  </Button>
                  {!peminjaman.status && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white hover:text-white"
                        onClick={() => {
                          setSelectedPeminjaman(peminjaman);
                          setIsApproveDialogOpen(true);
                        }}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Setujui
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-500 hover:bg-red-600 text-white hover:text-white"
                        onClick={() => {
                          setSelectedPeminjaman(peminjaman);
                          setIsRejectDialogOpen(true);
                        }}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Tolak
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Approve Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Persetujuan</DialogTitle>
            <DialogDescription>
              Apakah anda yakin ingin menyetujui peminjaman ini?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsApproveDialogOpen(false)}
            >
              Batal
            </Button>
            <Button onClick={handleApprove}>Setujui</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Penolakan</DialogTitle>
            <DialogDescription>
              Apakah anda yakin ingin menolak peminjaman ini?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRejectDialogOpen(false)}
            >
              Batal
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Tolak
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default DaftarPeminjamanRuangan;
