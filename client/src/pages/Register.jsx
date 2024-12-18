// src/components/Register.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label"; // Import Label from shadcn
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            {/* Nomor Induk */}
            <div className="mb-4">
              <Label htmlFor="nomorInduk">
                NIP / NIK
              </Label>
              <Input
                id="nomorInduk"
                type="text"
                placeholder="Masukkan Nomor Induk"
                className="w-full mt-2 text-lg"
              />
            </div>

            {/* Nama */}
            <div className="mb-4">
              <Label htmlFor="nama">
                Nama
              </Label>
              <Input
                id="nama"
                type="text"
                placeholder="Masukkan Nama"
                className="w-full mt-2 text-lg"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <Label htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Masukkan Email"
                className="w-full mt-2 text-lg"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <Label htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan Password"
                className="w-full mt-2 text-lg"
              />
            </div>

            {/* Telepon */}
            <div className="mb-4">
              <Label htmlFor="telepon">
                Telepon
              </Label>
              <Input
                id="telepon"
                type="text"
                placeholder="Masukkan Nomor Telepon"
                className="w-full mt-2 text-lg"
              />
            </div>

            {/* Role Select */}
            <div className="mb-4">
              <Label htmlFor="role">
                Role
              </Label>
              <Select id="role" className="w-full mt-2 text-lg">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dosen">Dosen</SelectItem>
                  <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full mt-4 text-lg">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-gray-600 flex gap-1">
            Sudah punya akun?{" "}
            <Link to="/login">
              <p className="text-blue-500 hover:underline"> Login</p>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
