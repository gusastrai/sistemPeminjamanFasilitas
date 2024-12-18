import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Adjust the import path as necessary
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { peminjamanService } from "@/api/PeminjamanApi";
const PengajuanRuanganUser = () => {
  const { idRuangan } = useParams();
  const [date, setDate] = useState(null);
  const [waktuMulai, setWaktuMulai] = useState("");
  const [waktuSelesai, setWaktuSelesai] = useState("");
  const [gambar, setGambar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!date || !waktuMulai || !waktuSelesai || !gambar) {
      alert("Semua kolom harus diisi!");
      return;
    }

    try {
      // Menggunakan peminjamanServie untuk mengirimkan data
      const response = await peminjamanService.createPeminjamanRuangan(
        idRuangan,
        date.toString(),
        waktuMulai,
        waktuSelesai,
        gambar
      );

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
          <CardTitle className="text-center text-2xl">Pengajuan Peminjaman Ruangan</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full max-w-sm items-center space-y-4">
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" onChange={(e) => setGambar(e.target.files?.[0] || null)} />
            </div>

            <div className="grid w-full max-w-sm items-center space-y-4">
              <Label htmlFor="tanggal">Tanggal Peminjaman</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid w-full max-w-sm items-center space-y-4">
              <Label htmlFor="waktuMulai">Waktu Mulai</Label>
              <Input
                id="waktuMulai"
                type="text"
                placeholder="e.g 07:00"
                value={waktuMulai}
                onChange={(e) => setWaktuMulai(e.target.value)}
              />
            </div>

            <div className="grid w-full max-w-sm items-center space-y-4">
              <Label htmlFor="waktuSelesai">Waktu Selesai</Label>
              <Input
                id="waktuSelesai"
                type="text"
                placeholder="e.g 07:00"
                value={waktuSelesai}
                onChange={(e) => setWaktuSelesai(e.target.value)}
              />
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
