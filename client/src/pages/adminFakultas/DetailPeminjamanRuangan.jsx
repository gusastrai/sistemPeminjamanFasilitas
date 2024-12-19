import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { peminjamanService } from "@/api/PeminjamanApi";

const DetailPeminjaman = () => {
  const { id } = useParams();
  const [peminjaman, setPeminjaman] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPeminjamanDetail();
  }, [id]);

  const fetchPeminjamanDetail = async () => {
    try {
      const data = await peminjamanService.getPeminjamanById(id);
      setPeminjaman(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load peminjaman details");
    }
  };

  const handleImageError = (e) => {
    e.target.src = "/placeholder-image.png"; 
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!peminjaman) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detail Peminjaman Ruangan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-3">Informasi Peminjam</h3>
          <div className="grid grid-cols-2 gap-4">
            <p><span className="font-medium">Nama:</span> {peminjaman.user.nama}</p>
            <p><span className="font-medium">NIM/NIP:</span> {peminjaman.user.nomorInduk}</p>
            <p><span className="font-medium">Email:</span> {peminjaman.user.email}</p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-3">Informasi Peminjaman</h3>
          <div className="grid grid-cols-2 gap-4">
            <p><span className="font-medium">Judul:</span> {peminjaman.judulPeminjaman}</p>
            <p>
              <span className="font-medium">Tanggal Mulai:</span>{" "}
              {format(new Date(peminjaman.tanggalPeminjaman), "dd MMMM yyyy")}
            </p>
            <p>
              <span className="font-medium">Tanggal Selesai:</span>{" "}
              {format(new Date(peminjaman.tanggalSelesai), "dd MMMM yyyy")}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span className={`px-2 py-1 rounded-full text-sm ${
                peminjaman.status ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
              }`}>
                {peminjaman.status ? "Disetujui" : "Pending"}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-3">Lampiran</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {peminjaman.dokumen && peminjaman.dokumen.map((dok, index) => (
              <div key={dok.idDokumen} className="relative group">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}${dok.lampiran}`}
                  alt={`Lampiran ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md transition-transform hover:scale-105"
                  onError={handleImageError}
                />
                <a 
                  href={`${import.meta.env.VITE_API_BASE_URL}${dok.lampiran}`}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity"
                >
                  <span className="text-white">Lihat Gambar</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailPeminjaman;
