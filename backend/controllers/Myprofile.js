import pool from "../config/mysql.js";
import bcrypt from "bcrypt"; // bảo mật mã hóa nè
const MyProfile = async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ success: false, message: "Thiếu userId" });
  }

  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.execute(`SELECT * FROM user WHERE id =?`, [
      userId,
    ]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy người dùng" });
    }

    res.json({ success: true, userProfile: rows[0] });
  } catch (err) {
    console.error("❌ Lỗi lấy thông tin người dùng:", err);
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  } finally {
    conn.release();
  }
};
function formatBirthdayToMySQLDate(birthday) {
  if (!birthday) return null;

  const date = new Date(birthday);

  // Lấy từng phần: năm, tháng, ngày
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng từ 0-11
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // Chuỗi định dạng YYYY-MM-DD
}

const updateProfile = async (req, res) => {
  const { userId, firstName, lastName, email, birthday } = req.body;

  const newbirthday = formatBirthdayToMySQLDate(birthday);
  if (!userId) {
    return res.status(400).json({ success: false, message: "Thiếu userId" });
  }
  console.log("Cập nhật thông tin người dùng:", {
    firstName,
    lastName,
    email,
    birthday,
    newbirthday,
    req: req.body,
  });

  const conn = await pool.getConnection();
  try {
    await conn.execute(
      `UPDATE user SET firstName =?, lastName = ?, email =? , birthday=? WHERE id = ?`,
      [firstName, lastName, email, newbirthday, userId]
    );

    res.json({ success: true, message: "Cập nhật thành công" });
  } catch (err) {
    console.error("❌ Lỗi cập nhật thông tin người dùng:", err);
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  } finally {
    conn.release();
  }
};

const updatePassword = async (req, res) => {
  const { userId, oldPassword, NewPassword } = req.body;
  if (!userId || !oldPassword || !NewPassword) {
    return res.status(400).json({ success: false, message: "Thiếu thông tin" });
  }

  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.execute(
      `SELECT password FROM user WHERE id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy người dùng" });
    }

    const isMatch = await bcrypt.compare(oldPassword, rows[0].password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Mật khẩu cũ không đúng" });
    }

    const newPasswordHash = await bcrypt.hash(NewPassword, 10);
    await conn.execute(`UPDATE user SET password = ? WHERE id = ?`, [
      newPasswordHash,
      userId,
    ]);

    return res.json({ success: true, message: "Cập nhật mật khẩu thành công" });
  } catch (err) {
    console.error("❌ Lỗi truy vấn:", err);
    return res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  } finally {
    conn.release();
  }
};

const Myprofilelist = {
  MyProfile,
  updateProfile,
  updatePassword,
};
export default Myprofilelist;
