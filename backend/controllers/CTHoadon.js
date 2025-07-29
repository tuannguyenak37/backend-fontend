import pool from "../config/mysql.js";

const CTHoaDon = async (req, res) => {
  const { id_HD } = req.query;

  if (!id_HD) {
    return res.status(400).json({ success: false, message: "Thiếu id_HD" });
  }

  const conn = await pool.getConnection();
  try {
    const [results] = await conn.query(
      `SELECT 
    cthoadon.id_CTHD,
    sanpham.name_SP,
    sanpham.gia_SP,
    cthoadon.SOLUONG,
    cthoadon.tongTIEN,
    hoadon.giamgia,
    hoadon.ThanhTien
FROM cthoadon
JOIN sanpham ON cthoadon.id_SP = sanpham.id_SP
JOIN hoadon ON cthoadon.id_HD = hoadon.id_HD
WHERE cthoadon.id_HD = ?

`,
      [id_HD]
    );

    res.status(200).json({ success: true, chiTiet: results });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  } finally {
    conn.release();
  }
};

export default CTHoaDon;
