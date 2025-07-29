import pool from "../config/mysql.js";

const ThongKe = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "Thiếu userId trong query" });
  }

  const conn = await pool.getConnection();

  try {
    const [rows] = await conn.execute(
      `
     SELECT 
    m.thang,
    m.nam,
    IFNULL(c.tongChiTieu, 0) AS tongChiTieu
FROM (
    SELECT 
        MONTH(CURDATE()) AS thang, 
        YEAR(CURDATE()) AS nam
    UNION ALL
    SELECT 
        MONTH(DATE_SUB(CURDATE(), INTERVAL 1 MONTH)) AS thang, 
        YEAR(DATE_SUB(CURDATE(), INTERVAL 1 MONTH)) AS nam
    UNION ALL
    SELECT 
        MONTH(DATE_SUB(CURDATE(), INTERVAL 2 MONTH)) AS thang, 
        YEAR(DATE_SUB(CURDATE(), INTERVAL 2 MONTH)) AS nam
) AS m
LEFT JOIN (
    SELECT 
        MONTH(h.ngayDat) AS thang,
        YEAR(h.ngayDat) AS nam,
        SUM(h.ThanhTien) AS tongChiTieu
    FROM hoadon h
    WHERE h.id_KH = (
        SELECT id_KH FROM khachhang WHERE id = ? LIMIT 1
    )
    AND h.ngayDat >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
    GROUP BY YEAR(h.ngayDat), MONTH(h.ngayDat)
) AS c
ON m.thang = c.thang AND m.nam = c.nam
ORDER BY m.nam, m.thang;

    `,
      [userId]
    );

    res.json({ success: true, data: rows });
  
  } catch (err) {
    console.error("❌ Lỗi thống kê chi tiêu:", err);
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  } finally {
    conn.release();
  }
};

export default ThongKe;
