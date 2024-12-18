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
import { Eye } from "lucide-react"; 

const GedungCrud = () => {
  const [gedungList, setGedungList] = useState([]);
  const [selectedGedung, setSelectedGedung] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ namaGedung: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchGedungList();
  }, []);

  const fetchGedungList = async () => {
    try {
      setIsLoading(true);
      const data = await gedungService.getAllGedung();
      setGedungList(data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch gedung list");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedGedung(null);
    setFormData({ namaGedung: "" });
    setIsFormDialogOpen(true);
  };

  const handleEdit = (gedung) => {
    setSelectedGedung(gedung);
    setFormData({ namaGedung: gedung.namaGedung });
    setIsFormDialogOpen(true);
  };

  const handleDelete = (gedung) => {
    setSelectedGedung(gedung);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (selectedGedung) {
        await gedungService.updateGedung(selectedGedung.idGedung, formData);
      } else {
        await gedungService.createGedung(formData);
      }
      fetchGedungList();
      setIsFormDialogOpen(false);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to save gedung");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await gedungService.deleteGedung(selectedGedung.idGedung);
      fetchGedungList();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete gedung");
    }
  };

  const handleDetail = (gedungId) => {
    navigate(`/adminuniversitas/gedung/${gedungId}/ruangan`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Kelola Gedung</CardTitle>
          <Button onClick={handleAdd}>Tambahkan Gedung Baru</Button>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama Gedung</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gedungList.map((gedung, index) => (
                <TableRow key={gedung.idGedung}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{gedung.namaGedung}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDetail(gedung.idGedung)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Detail
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(gedung)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(gedung)}
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
              {selectedGedung ? "Edit Gedung" : "Add New Gedung"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="namaGedung" className="text-right">
                  Nama Gedung
                </Label>
                <Input
                  id="namaGedung"
                  value={formData.namaGedung}
                  onChange={(e) =>
                    setFormData({ ...formData, namaGedung: e.target.value })
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
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Apakah anda yakin ingin menghapus {selectedGedung?.namaGedung}?
              Aksi ini tidak dapat dipulihkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
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

export default GedungCrud;
