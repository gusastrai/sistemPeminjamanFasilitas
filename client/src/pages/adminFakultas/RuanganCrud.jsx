import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { gedungService } from "@/api/GedungApi";
import { ruanganService } from "@/api/RuanganApi";

const RuanganCrud = () => {
  const { id: gedungId } = useParams();
  const [gedung, setGedung] = useState(null);
  const [ruanganList, setRuanganList] = useState([]);
  const [selectedRuangan, setSelectedRuangan] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    namaRuangan: "",
    kapasitas: "",
    hargaSewa: "",
    status: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [gedungId]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [gedungData, ruanganData] = await Promise.all([
        gedungService.getGedungById(gedungId),
        ruanganService.getRuanganByGedungId(gedungId),
      ]);
      setGedung(gedungData);
      setRuanganList(ruanganData);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedRuangan(null);
    setFormData({
      namaRuangan: "",
      kapasitas: "",
      hargaSewa: "",
      status: true,
    });
    setIsFormDialogOpen(true);
  };

  const handleEdit = (ruangan) => {
    setSelectedRuangan(ruangan);
    setFormData({
      namaRuangan: ruangan.namaRuangan,
      kapasitas: ruangan.kapasitas,
      hargaSewa: ruangan.hargaSewa,
      status: ruangan.status,
    });
    setIsFormDialogOpen(true);
  };

  const handleDelete = (ruangan) => {
    setSelectedRuangan(ruangan);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        ...formData,
        gedungId,
        kapasitas: parseInt(formData.kapasitas),
      };

      if (selectedRuangan) {
        await ruanganService.updateRuangan(selectedRuangan.idRuangan, payload);
      } else {
        await ruanganService.createRuangan(payload);
      }
      fetchData();
      setIsFormDialogOpen(false);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to save ruangan");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await ruanganService.deleteRuangan(selectedRuangan.idRuangan);
      fetchData();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete ruangan");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!gedung) return <div>Gedung not found</div>;

  return (
    <div className="p-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Kelola Ruangan - {gedung.namaGedung}</CardTitle>
          <Button onClick={handleAdd}>Tambah Ruangan Baru</Button>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama Ruangan</TableHead>
                <TableHead>Kapasitas</TableHead>
                <TableHead>Harga Sewa</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ruanganList.map((ruangan, index) => (
                <TableRow key={ruangan.idRuangan}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{ruangan.namaRuangan}</TableCell>
                  <TableCell>{ruangan.kapasitas}</TableCell>
                  <TableCell>{ruangan.hargaSewa}</TableCell>
                  <TableCell>
                    {ruangan.status ? "Tersedia" : "Tidak Tersedia"}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(ruangan)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(ruangan)}
                    >
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedRuangan ? "Edit Ruangan" : "Tambah Ruangan Baru"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="namaRuangan" className="text-right">
                  Nama Ruangan
                </Label>
                <Input
                  id="namaRuangan"
                  value={formData.namaRuangan}
                  onChange={(e) =>
                    setFormData({ ...formData, namaRuangan: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="kapasitas" className="text-right">
                  Kapasitas
                </Label>
                <Input
                  id="kapasitas"
                  type="number"
                  value={formData.kapasitas}
                  onChange={(e) =>
                    setFormData({ ...formData, kapasitas: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hargaSewa" className="text-right">
                  Harga Sewa
                </Label>
                <Input
                  id="hargaSewa"
                  value={formData.hargaSewa}
                  onChange={(e) =>
                    setFormData({ ...formData, hargaSewa: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Simpan Perubahan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah anda yakin ingin menghapus {selectedRuangan?.namaRuangan}?
              Aksi ini tidak dapat dipulihkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RuanganCrud;
