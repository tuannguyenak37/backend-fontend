import connection from "../config/mysql.js";
import bcrypt from "bcrypt"; // bảo mật mã hóa nè

export const login = async (req, res) => {
  const { login_username, login_password } = req.body;

  if (!login_username || !login_password) {
    return res
      .status(400)
      .json({ message: "Vui lòng nhập username và password" });
  }

  try {
    const [results] = await connection.query(
      "SELECT * FROM user WHERE username = ?",
      [login_username]
    );

    if (results.length === 0) {
      // Username không tồn tại
      return res.status(401).json({ message: "Sai tài khoản" });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(login_password, user.password);

    if (!isMatch) {
      // Username đúng, nhưng mật khẩu sai
      return res.status(401).json({ message: "Sai mật khẩu" });
    }

    // Đăng nhập thành công
    return res.json({
      message: "Đăng nhập thành công",
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Lỗi khi truy vấn database:", error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

// Đăng ký tài khoản
// Đăng ký tài khoản

export const createUser = async (req, res) => {
  const { firstName, lastName, userName, password, email, birthday } = req.body;

  if (
    !firstName ||
    !lastName ||
    !birthday ||
    !userName ||
    !password ||
    !email
  ) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
  }

  try {
    const [result] = await connection.query(
      "SELECT * FROM user WHERE userName = ?",
      [userName]
    );

    if (result.length > 0) {
      return res.status(400).json({ message: "Tài khoản đã tồn tại" });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // 10 là số vòng hash càng cao càng an toàn nhưng chậm hơn

    const [countResult] = await connection.query(
      "SELECT COUNT(*) count FROM user"
    );
    const count = countResult[0].count;

    // Tạo id mới
    const newId = "id" + (count + 1);

    const sql =
      "INSERT INTO `user` (`id`, `userName`, `password`, `firstName`, `lastName`, `email`,`birthday`) VALUES (?, ?, ?, ?, ?, ?,?)";
    const [insertResult] = await connection.query(sql, [
      newId,
      userName,
      hashedPassword,
      firstName,
      lastName,
      email,
      birthday,
    ]);

    res.status(201).json({
      message: "Tạo tài khoản thành công",
      user: { id: insertResult.insertId, userName },
    });
  } catch (error) {
    console.error("Lỗi khi truy vấn database:", error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

const userController = {
  login,
  createUser,
};

export default userController;
