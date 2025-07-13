import pool from "../config/mysql.js";

const HoaDon = async (req, res) => {
  const { userId } = req.query;
  const conn = await pool.getConnection();

  try {
    const [rows] = await conn.execute(
      `SELECT HOADON.*, KHACHHANG.name_KH
FROM HOADON
JOIN KHACHHANG ON HOADON.id_KH = KHACHHANG.id_KH
WHERE KHACHHANG.id = ?
ORDER BY HOADON.ngayDat DESC;
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
