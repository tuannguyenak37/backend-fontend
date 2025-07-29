
import pool from "../config/mysql.js";

const KH = async (req, res) => {
  const { diachi_KH, dt_KH,email_KH, motaDiaCHi_KH, name_KH,    userId } =
    req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: "Thiếu userId." });
  }
  console.log("📥 Dữ liệu khách hàng:", {
    diachi_KH,
    dt_KH,
    email_KH,
    motaDiaCHi_KH,
    name_KH,
    userId,
  });

  const conn = await pool.getConnection();
  try {
    const newIdKH = `KH${Date.now().toString().slice(-6)}`;
    
    

    await conn.execute(
      `INSERT INTO khachhang (id_KH, name_KH, dt_KH, diachi_KH, motaDiaCHi_KH, email_KH, id)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [newIdKH, name_KH, dt_KH, diachi_KH, motaDiaCHi_KH, email_KH, userId]
    );

    return res.json({ success: true, id_KH: newIdKH });
  } catch (error) {
    console.error("Lỗi tạo khách hàng:", error);
    return res.status(500).json({ success: false, error: "Lỗi máy chủ" });
  } finally {
    conn.release(); // Thêm dòng này để đảm bảo connection được trả về pool
  }
  


};

// 👉 Lấy thông tin khách hàng theo id_KH
export const getKhachHang = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Thiếu userId",
    });
  }

  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT * FROM KHACHHANG WHERE id = ? ORDER BY id_KH DESC LIMIT 1`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Không tìm thấy khách hàng với userId = ${userId}`,
      });
    }

    return res.json({ success: true, khachHang: rows[0] });
  } catch (err) {
    console.error("❌ Lỗi lấy KH theo userId:", err);
    return res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  } finally {
    conn.release();
  }
};
const KHlist = { KH, getKhachHang };

export default KHlist;
