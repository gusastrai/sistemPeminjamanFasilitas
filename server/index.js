require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const db = require("./models");

const authRoutes = require("./routes/Auth");
const gedungRoutes = require("./routes/Gedung");
const ruanganRoutes = require("./routes/Ruangan"); 
const barangRoutes = require("./routes/Barang");
const userManagementRoutes = require("./routes/UserManagement");
const adminManagementRoutes = require("./routes/AdminManagement");
const peminjamanRuanganRoutes = require("./routes/PeminjamanRuangan");
const peminjamanBarangRoutes = require("./routes/PeminjamanBarang");
const prodiRoutes = require("./routes/Prodi");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/gedung", gedungRoutes);
app.use("/ruangan", ruanganRoutes); 
app.use("/users", userManagementRoutes);
app.use("/peminjamanruangan", peminjamanRuanganRoutes); 
app.use("/peminjamanbarang", peminjamanBarangRoutes); 
app.use("/admins", adminManagementRoutes);
app.use("/barang", barangRoutes);
app.use("/prodi", prodiRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Hello World");
});
db.sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});