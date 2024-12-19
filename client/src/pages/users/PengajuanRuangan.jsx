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
import { peminjamanService } from "@/api/PeminjamanApi";

const PengajuanRuanganUser = () => {
  const { idRuangan } = useParams(); 
  const [formData, setFormData] = useState({
    judulPeminjaman: "",
    tanggalPeminjaman: null,
    tanggalSelesai: null,
    lampiran: null
  });
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({...formData, lampiran: file});
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.judulPeminjaman ||
      !formData.tanggalPeminjaman ||
      !formData.tanggalSelesai ||
      !formData.lampiran
    ) {
      alert("Semua kolom harus diisi!");
      return;
    }

    const data = new FormData();
    data.append("judulPeminjaman", formData.judulPeminjaman);
    data.append("tanggalPeminjaman", formData.tanggalPeminjaman ? format(formData.tanggalPeminjaman, "yyyy-MM-dd") : ""); 
    data.append("tanggalSelesai", formData.tanggalSelesai ? format(formData.tanggalSelesai, "yyyy-MM-dd") : ""); 
    data.append("lampiran", formData.lampiran); 
    
    try {
      const response = await peminjamanService.createPeminjamanRuangan(idRuangan, data);
      alert("Peminjaman berhasil diajukan!");
      console.log(response);
    } catch (error) {
      alert("Terjadi kesalahan saat mengajukan peminjaman");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Pengajuan Peminjaman Ruangan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid w-full max-w-sm items-center space-y-4">
              <Label htmlFor="judulPeminjaman">Alasan Peminjaman</Label>
              <Input
                id="judulPeminjaman"
                type="text"
                placeholder="Keperluan Pengajuan"
                value={formData.judulPeminjaman}
                onChange={(e) => setFormData({...formData, judulPeminjaman: e.target.value})}
              />
            </div>
            <div className="grid w-full max-w-sm items-center space-y-4">
              <Label htmlFor="lampiran">Lampiran Pengajuan</Label>
              <Input
                id="lampiran"
                type="file"
                onChange={handleFileChange}
              />
              {previewUrl && (
                <img 
                  src={previewUrl} 
                  alt="Preview"
                  style={{maxWidth: "200px"}} 
                />
              )}
            </div>

            <div className="grid w-full max-w-sm items-center space-y-4">
              <Label htmlFor="tanggal">Tanggal Peminjaman</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !formData.tanggalPeminjaman && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {formData.tanggalPeminjaman ? format(formData.tanggalPeminjaman, "PPP") : <span>Pilih Tanggal</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.tanggalPeminjaman}
                    onSelect={(date) => setFormData({...formData, tanggalPeminjaman: date})}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid w-full max-w-sm items-center space-y-4">
              <Label htmlFor="tanggal">Tanggal Selesai</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !formData.tanggalSelesai && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {formData.tanggalSelesai ? format(formData.tanggalSelesai, "PPP") : <span>Pilih Tanggal</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.tanggalSelesai}
                    onSelect={(date) => setFormData({...formData, tanggalSelesai: date})}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button type="submit" className="w-full mt-4 text-lg">
              Ajukan Peminjaman
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PengajuanRuanganUser;