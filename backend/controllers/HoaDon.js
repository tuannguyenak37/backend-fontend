import pool from "../config/mysql.js";

const HoaDon = async (req, res) => {
  const { userId } = req.query;
  const conn = await pool.getConnection();

  try {
    const [rows] = await conn.execute(
      `SELECT hoadon.*, khachhang.name_KH
FROM hoadon
JOIN khachhang ON hoadon.id_KH = khachhang.id_KH
WHERE khachhang.id = ?
ORDER BY hoadon.ngayDat DESC;
`,
      [userId]
    );

    res.json({ success: true, hoaDons: rows });
    console.log("📥 Dữ liệu hóa đơn:", rows);
  } catch (err) {
    console.error("❌ Lỗi lấy hóa đơn:", err);
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  } finally {
    conn.release();
  }
};

export default HoaDon;
