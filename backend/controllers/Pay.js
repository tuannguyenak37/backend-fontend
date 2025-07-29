import pool from "../config/mysql.js";

const Pay = async (req, res) => {
  const { mota, id_KH, cartItems, userId, sellPercent, finalAmount } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: "Thiếu userId" });
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Thiếu dữ liệu giỏ hàng" });
  }

  const conn = await pool.getConnection();

  try {
    // 🧾 2. Tạo id_HD mới

    const newIdHD = `HD${Date.now().toString().slice(-6)}${Math.floor(
      Math.random() * 100
    )}`;

    // 🗓️ 3. Tạo hóa đơn
    await conn.query(
      "INSERT INTO hoadon (id_HD, id_KH, ngayDat, TrangThai, mota,giamgia,ThanhTien) VALUES (?, ?, ?, ?, ?,?,?)",
      [
        newIdHD,
        id_KH,
        new Date(),
        "Đã thanh toán",
        mota,
        sellPercent,
        finalAmount,
      ]
    );

    // 🧾 4. Chi tiết hóa đơn
    for (const item of cartItems) {
      const id_CTHD = `CT${Date.now().toString().slice(-5)}${Math.floor(
        Math.random() * 100000
      )}`; // tạo mã mỗi lần lặp

      await conn.query(
        `INSERT INTO cthoadon (id_CTHD, id_HD, id_SP, SOlUONG, tongTIEN)
         VALUES (?, ?, ?, ?, ?)`,
        [id_CTHD, newIdHD, item.id_SP, item.soLuong, item.soLuong * item.donGia]
      );
    }
    console.log("📤 Dữ liệu thanh toán:", {
      id_HD: newIdHD,
      id_KH,
      sellPercent,
    });

    return res.json({ success: true, id_HD: newIdHD });
  } catch (err) {
    console.error("❌ Lỗi thanh toán:", err);
    return res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  } finally {
    conn.release();
  }
};

export default Pay;
