const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
const authRoutes = require("./routes/Auth");
const gedungRoutes = require("./routes/Gedung");
const ruanganRoutes = require("./routes/Ruangan"); 
const userManagementRoutes = require("./routes/UserManagement");
const peminjamanRoute = require("./routes/Peminjaman");
const adminManagementRoutes = require("./routes/AdminManagement");
const barangRoutes = require("./routes/Barang");
require("dotenv").config();


app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/gedung", gedungRoutes);
app.use("/ruangan", ruanganRoutes); // Add this line
app.use("/users", userManagementRoutes);
app.use("/peminjaman", peminjamanRoute); // Add this line
app.use("/admins", adminManagementRoutes);
app.use("/barang", barangRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

db.sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});