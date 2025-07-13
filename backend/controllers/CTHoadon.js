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
        CTHD.id_CTHD,
        SP.name_SP,
        SP.gia_SP,
        CTHD.SOLUONG,
        CTHD.tongTIEN
       FROM CTHOADON CTHD
       JOIN SANPHAM SP ON CTHD.id_SP = SP.id_SP
       WHERE CTHD.id_HD = ?`,
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
