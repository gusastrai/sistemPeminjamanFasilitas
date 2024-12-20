import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authService } from "@/api/AuthApi";
import { prodiService } from "@/api/ProdiApi";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomorInduk: "",
    nama: "",
    email: "",
    password: "",
    telepon: "",
    role: "",
    prodiId: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [prodiList, setProdiList] = useState([]);

  useEffect(() => {
    fetchProdi();
  }, []);

  const fetchProdi = async () => {
    try {
      const data = await prodiService.getAllProdi();
      setProdiList(data);
    } catch (error) {
      console.error("Error fetching prodi:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleRoleChange = (value) => {
    setFormData({
      ...formData,
      role: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (
        !formData.nomorInduk ||
        !formData.nama ||
        !formData.email ||
        !formData.password ||
        !formData.telepon ||
        !formData.role
      ) {
        throw new Error("Semua field harus diisi");
      }

      if (!formData.prodiId) {
        throw new Error("Prodi harus dipilih");
      }

      await authService.register(formData);
      alert("Registrasi berhasil! Silahkan tunggu persetujuan admin");
      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Registrasi gagal"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="nomorInduk">NIP / NIM</Label>
            <Input
              id="nomorInduk"
              type="text"
              placeholder="Masukkan Nomor Induk"
              className="w-full mt-2 text-lg"
              value={formData.nomorInduk}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="nama">Nama</Label>
            <Input
              id="nama"
              type="text"
              placeholder="Masukkan Nama"
              className="w-full mt-2 text-lg"
              value={formData.nama}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Masukkan Email"
              className="w-full mt-2 text-lg"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Masukkan Password"
              className="w-full mt-2 text-lg"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="telepon">Telepon</Label>
            <Input
              id="telepon"
              type="text"
              placeholder="Masukkan Nomor Telepon"
              className="w-full mt-2 text-lg"
              value={formData.telepon}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="role">Role</Label>
            <Select
              onValueChange={handleRoleChange}
              value={formData.role}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Pilih Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dosen">Dosen</SelectItem>
                <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <Label htmlFor="prodiId">Program Studi</Label>
            <Select
              onValueChange={(value) => {
                console.log("Selected value:", value); 
                setFormData({ ...formData, prodiId: value });
              }}
              value={formData.prodiId?.toString()} 
            >
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Pilih Program Studi" />
              </SelectTrigger>
              <SelectContent>
                {prodiList.map((prodi) => (
                  <SelectItem
                    key={prodi.idProdi}
                    value={prodi.idProdi.toString()} 
                  >
                    {prodi.namaProdi}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full mt-6" disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
