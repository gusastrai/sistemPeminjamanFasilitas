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
  const { idRuangan } = useParams(); // Get the idRuangan from URL params
  const [ tanggalPeminjaman, settanggalPeminjaman] = useState(null);
  const [ tanggalSelesai, settanggalSelesai] = useState(null);
  const [ lampiran, setLampiran] = useState(null);
  const [ judulPeminjaman, setJudulPeminjaman] = useState(""); // Add state for 'judulPeminjaman'

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (
      !judulPeminjaman ||
      !tanggalPeminjaman ||
      !tanggalSelesai ||
      !lampiran
    ) {
      alert("Semua kolom harus diisi!");
      return;
    }

    // Prepare FormData to send as the request body
    const formData = new FormData();
    formData.append("judulPeminjaman", judulPeminjaman);
    formData.append("tanggalPeminjaman", tanggalPeminjaman ? format(tanggalPeminjaman, "yyyy-MM-dd") : ""); // Format tanggalPeminjaman to 'yyyy-MM-dd'
    formData.append("tanggalSelesai", tanggalSelesai ? format(tanggalSelesai, "yyyy-MM-dd") : ""); // Format date to 'yyyy-MM-dd'
    formData.append("lampiran", lampiran); // This should be the file object
    
    try {
      // Send the request with idRuangan as part of the URL path
      const response = await peminjamanService.createPeminjamanRuangan(idRuangan, formData);
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
          <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <div className="grid w-full max-w-sm items-center space-y-4">
              <Label htmlFor="judulPeminjaman">Alasan Peminjaman</Label>
              <Input
                id="judulPeminjaman"
                type="text"
                placeholder="Keperluan Pengajuan"
                value={judulPeminjaman}
                onChange={(e) => setJudulPeminjaman(e.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm items-center space-y-4">
              <Label htmlFor="lampiran">Lampiran Pengajuan</Label>
              <Input
                id="lampiran"
                type="file"
                onChange={(e) => setLampiran(e.target.files?.[0] || null)}
              />
            </div>

            <div className="grid w-full max-w-sm items-center space-y-4">
              <Label htmlFor="tanggal">Tanggal Peminjaman</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !tanggalPeminjaman && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {tanggalPeminjaman ? format(tanggalPeminjaman, "PPP") : <span>Pilih Tanggal</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={tanggalPeminjaman}
                    onSelect={settanggalPeminjaman}
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
                      !tanggalSelesai && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {tanggalSelesai ? format(tanggalSelesai, "PPP") : <span>Pilih Tanggal</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={tanggalSelesai}
                    onSelect={settanggalSelesai}
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