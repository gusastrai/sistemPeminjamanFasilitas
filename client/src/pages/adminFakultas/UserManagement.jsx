import React, { useState, useEffect } from "react";
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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { userService } from "@/api/KelolaAkunUser";
import { CheckCircle, XCircle } from "lucide-react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [userToApprove, setUserToApprove] = useState(null);
  const [userToReject, setUserToReject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  const openApproveDialog = (user) => {
    setUserToApprove(user);
    setIsApproveDialogOpen(true);
  };

  const openRejectDialog = (user) => {
    setUserToReject(user);
    setIsRejectDialogOpen(true);
  };

  const handleApprove = async () => {
    try {
      await userService.updateUserStatus(userToApprove.idUser, true);
      fetchUsers();
      setIsApproveDialogOpen(false);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to approve user");
    }
  };

  const handleReject = async () => {
    try {
      await userService.deleteUser(userToReject.idUser);
      fetchUsers();
      setIsRejectDialogOpen(false);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to reject user");
    }
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await userService.deleteUser(selectedUser.idUser);
      fetchUsers();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete user");
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      true: "bg-green-500",
      false: "bg-yellow-500",
    };
    return (
      <Badge className={statusStyles[status] || "bg-gray-500"}>
        {status ? "ACTIVE" : "PENDING"}
      </Badge>
    );
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-2">
      <Card>
        <CardHeader>
          <CardTitle>Kelola Pengguna</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nomor Induk</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Telepon</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Prodi</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.idUser}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.nomorInduk}</TableCell>
                  <TableCell>{user.nama}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.telepon}</TableCell>
                  <TableCell>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </TableCell>
                  <TableCell>{user.prodi?.namaProdi}</TableCell>
                  <TableCell className="text-right space-x-2">
                    {user.status === false && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white hover:text-white"
                          onClick={() => openApproveDialog(user)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Setujui
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-red-500 hover:bg-red-600 text-white hover:text-white"
                          onClick={() => openRejectDialog(user)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Tolak
                        </Button>
                      </>
                    )}
                    {user.status === true && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(user)}
                      >
                        Hapus
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Persetujuan</DialogTitle>
            <DialogDescription>
              Apakah anda yakin ingin menyetujui akun {userToApprove?.nama}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsApproveDialogOpen(false)}
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={handleApprove}
            >
              Setujui
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Penolakan</DialogTitle>
            <DialogDescription>
              Apakah anda yakin ingin menolak dan menghapus akun{" "}
              {userToReject?.nama}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsRejectDialogOpen(false)}
            >
              Batal
            </Button>
            <Button type="button" variant="destructive" onClick={handleReject}>
              Tolak
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah anda yakin ingin menghapus akun {selectedUser?.nama}? Aksi
              ini tidak dapat dipulihkan.
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

export default UserManagement;
