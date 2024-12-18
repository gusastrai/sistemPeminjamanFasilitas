import React, { useState } from "react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const GedungCrud = () => {
  const [gedungList, setGedungList] = useState([
    { id: 1, namaGedung: "RKBF" },
    { id: 2, namaGedung: "Laboratorium Teknik" },
  ]);
  const [selectedGedung, setSelectedGedung] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ namaGedung: "" });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedGedung) {
      // Edit existing gedung
      setGedungList(
        gedungList.map((gedung) =>
          gedung.id === selectedGedung.id
            ? { ...gedung, namaGedung: formData.namaGedung }
            : gedung
        )
      );
    } else {
      // Add new gedung
      setGedungList([
        ...gedungList,
        { id: gedungList.length + 1, namaGedung: formData.namaGedung },
      ]);
    }
    setIsFormDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    setGedungList(gedungList.filter((gedung) => gedung.id !== selectedGedung.id));
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="p-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Gedung</CardTitle>
          <Button onClick={handleAdd}>Add New Gedung</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama Gedung</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gedungList.map((gedung) => (
                <TableRow key={gedung.id}>
                  <TableCell>{gedung.id}</TableCell>
                  <TableCell>{gedung.namaGedung}</TableCell>
                  <TableCell className="text-right space-x-2">
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
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Form Dialog */}
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
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedGedung?.namaGedung}? This
              action cannot be undone.
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
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GedungCrud;