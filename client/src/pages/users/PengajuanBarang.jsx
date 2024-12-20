import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { peminjamanBarangService } from "@/api/PeminjamanBarangApi";
import ErrorModal from "@/components/myComponents/ErrorModal";
import SuccessModal from "@/components/myComponents/SuccessModal";

const PengajuanBarangUser = () => {
  const { idBarang } = useParams();
  const [formData, setFormData] = useState({
    judulPeminjaman: "",
    jumlahPeminjaman: "",
    tanggalPeminjaman: null,
    tanggalSelesai: null,
    lampiran: null,
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, lampiran: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.judulPeminjaman ||
      !formData.jumlahPeminjaman ||
      !formData.tanggalPeminjaman ||
      !formData.tanggalSelesai ||
      !formData.lampiran
    ) {
      setErrorMessage("Semua kolom harus diisi!");
      setIsErrorModalOpen(true);
      return;
    }

    const data = new FormData();
    data.append("judulPeminjaman", formData.judulPeminjaman);
    data.append("jumlahPeminjaman", formData.jumlahPeminjaman);
    data.append(
      "tanggalPeminjaman",
      formData.tanggalPeminjaman ? format(formData.tanggalPeminjaman, "yyyy-MM-dd") : ""
    );
    data.append(
      "tanggalSelesai",
      formData.tanggalSelesai ? format(formData.tanggalSelesai, "yyyy-MM-dd") : ""
    );
    data.append("lampiran", formData.lampiran);

    try {
      await peminjamanBarangService.createPeminjamanBarang(idBarang, data);
      setSuccessMessage("Peminjaman berhasil diajukan!");
      setIsSuccessModalOpen(true);
      setFormData({
        judulPeminjaman: "",
        jumlahPeminjaman: "",
        tanggalPeminjaman: null,
        tanggalSelesai: null,
        lampiran: null,
      });
      setPreviewUrl("");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Terjadi kesalahan saat mengajukan peminjaman");
      setIsErrorModalOpen(true);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengajuan Peminjaman Barang</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <div>
            <Label htmlFor="judulPeminjaman">Tujuan Peminjaman</Label>
            <Input
              id="judulPeminjaman"
              type="text"
              placeholder="Masukkan tujuan peminjaman"
              value={formData.judulPeminjaman}
              onChange={(e) =>
                setFormData({ ...formData, judulPeminjaman: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="jumlahPeminjaman">Jumlah Barang</Label>
            <Input
              id="jumlahPeminjaman"
              type="number"
              placeholder="Masukkan jumlah barang"
              value={formData.jumlahPeminjaman}
              onChange={(e) =>
                setFormData({ ...formData, jumlahPeminjaman: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="tanggal-peminjaman">Tanggal Peminjaman</Label>
            <Popover id="tanggal-peminjaman">
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start",
                    !formData.tanggalPeminjaman && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.tanggalPeminjaman ? (
                    format(formData.tanggalPeminjaman, "PPP")
                  ) : (
                    <span>Pilih Tanggal</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.tanggalPeminjaman}
                  onSelect={(date) =>
                    setFormData({ ...formData, tanggalPeminjaman: date })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="tanggal-selesai">Tanggal Selesai</Label>
            <Popover id="tanggal-selesai">
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start",
                    !formData.tanggalSelesai && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.tanggalSelesai ? (
                    format(formData.tanggalSelesai, "PPP")
                  ) : (
                    <span>Pilih Tanggal</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.tanggalSelesai}
                  onSelect={(date) =>
                    setFormData({ ...formData, tanggalSelesai: date })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="lampiran">Proposal Pengajuan</Label>
            <Input id="lampiran" type="file" onChange={handleFileChange} />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                style={{ maxWidth: "300px", marginTop: "10px" }}
              />
            )}
          </div>

          <Button type="submit">
            Ajukan Peminjaman
          </Button>
        </form>
      </CardContent>
      <ErrorModal 
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message={errorMessage}
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message={successMessage}
      />
    </Card>
  );
};

export default PengajuanBarangUser;