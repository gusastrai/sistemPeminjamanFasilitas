const { User, Admin } = require("../models"); // Import model User dan Admin
const bcrypt = require("bcrypt"); // Untuk membandingkan password
const jwt = require("jsonwebtoken"); // Untuk generate token

// Secret key untuk JWT
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret_key";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cek apakah input email dan password ada
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email dan password harus diisi" });
    }

    // Cari di tabel User atau Admin berdasarkan email
    let user = await User.findOne({ where: { email } });
    let roleType = "user"; // Default roleType

    if (!user) {
      user = await Admin.findOne({ where: { email } });
      roleType = "admin"; // Jika ditemukan di tabel Admin
    }

    // Jika tidak ditemukan di kedua tabel
    if (!user) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    // Bandingkan password dengan hash di database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.idUser || user.id, // id bisa dari User atau Admin
        email: user.email,
        role: user.role,
        roleType, // Menyimpan dari tabel mana (user atau admin)
      },
      SECRET_KEY,
      { expiresIn: "1h" } // Token berlaku selama 1 jam
    );

    // Kirim response token
    return res.status(200).json({
      message: "Login berhasil",
      token,
      user,
      roleType,
    });
  } catch (error) {
    console.error("Error saat login:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

module.exports = { login };
