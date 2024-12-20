const { User, Admin } = require("../models"); // Import model User dan Admin
const bcrypt = require("bcrypt"); // Untuk membandingkan password
const jwt = require("jsonwebtoken"); // Untuk generate token
const { Op } = require("sequelize");

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

const register = async (req, res) => {
  try {
    const { nomorInduk, nama, email, password, telepon, role, prodiId } = req.body;

    // Validate required fields
    if (!nomorInduk || !nama || !email || !password || !telepon || !role) {
      return res.status(400).json({ 
        message: "All fields are required" 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      where: { 
        [Op.or]: [
          { email },
          { nomorInduk }
        ]
      } 
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email or nomor induk already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      nomorInduk,
      nama,
      email,
      password: hashedPassword,
      telepon,
      role,
      prodiId,
      status: false // Pending approval
    });

    // Remove password from response
    const userWithoutPassword = {
      idUser: newUser.idUser,
      nomorInduk: newUser.nomorInduk,
      nama: newUser.nama,
      email: newUser.email,
      telepon: newUser.telepon,
      role: newUser.role,
      status: newUser.status
    };

    res.status(201).json({
      message: "Registration successful, waiting for admin approval",
      user: userWithoutPassword
    });

  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login, register };
