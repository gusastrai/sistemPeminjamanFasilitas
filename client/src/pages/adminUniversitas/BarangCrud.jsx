import React, { useState, useEffect } from "react";
import { barangService } from "@/api/BarangApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const BarangCrud = () => {
  const [barangList, setBarangList] = useState([]);
  const [selectedBarang, setSelectedBarang] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    namaBarang: "",
    jumlah: "",
    status: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBarangList();
  }, []);

  const fetchBarangList = async () => {
    try {
      setIsLoading(true);
      const data = await barangService.getAllBarang();
      setBarangList(data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch barang list");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedBarang(null);
    setFormData({ namaBarang: "", jumlah: "", status: true });
    setIsFormDialogOpen(true);
  };

  const handleEdit = (barang) => {
    setSelectedBarang(barang);
    setFormData({
      namaBarang: barang.namaBarang,
      jumlah: barang.jumlah,
      status: barang.status,
    });
    setIsFormDialogOpen(true);
  };

  const handleDelete = (barang) => {
    setSelectedBarang(barang);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (selectedBarang) {
        await barangService.updateBarang(selectedBarang.idBarang, formData);
      } else {
        await barangService.createBarang(formData);
      }
      fetchBarangList();
      setIsFormDialogOpen(false);
      setFormData({ namaBarang: "", jumlah: "", status: true });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to save barang");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await barangService.deleteBarang(selectedBarang.idBarang);
      fetchBarangList();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete barang");
    }
  };

  return (
    <div className="p-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Kelola Barang</CardTitle>
          {/* <Button onClick={handleAdd}>Tambah Barang Baru</Button> */}
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama Barang</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Harga Sewa</TableHead>
                {/* <TableHead className="text-right">Aksi</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {barangList.map((barang, index) => (
                <TableRow key={barang.idBarang}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{barang.namaBarang.charAt(0).toUpperCase() + barang.namaBarang.slice(1)}</TableCell>
                  <TableCell>{barang.jumlah}</TableCell>
                  <TableCell>{barang.hargaSewa ?? "Gratis"}</TableCell>
                  {/* <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(barang)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(barang)}
                    >
                      Hapus
                    </Button>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedBarang ? "Edit Barang" : "Tambah Barang Baru"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="namaBarang" className="text-right">
                  Nama Barang
                </Label>
                <Input
                  id="namaBarang"
                  value={formData.namaBarang}
                  onChange={(e) =>
                    setFormData({ ...formData, namaBarang: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="jumlah" className="text-right">
                  Jumlah
                </Label>
                <Input
                  id="jumlah"
                  type="number"
                  value={formData.jumlah}
                  onChange={(e) =>
                    setFormData({ ...formData, jumlah: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {selectedBarang ? "Simpan" : "Tambah"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog> */}

      {/* <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah anda yakin ingin menghapus {selectedBarang?.namaBarang}?
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
      </Dialog> */}
    </div>
  );
};

export default BarangCrud;
