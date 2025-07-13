import pool from "../config/mysql.js";

const ProductList = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM sanpham where loai_SP ='hoa'"
    );
    res.status(200).json({
      message: "Lấy danh sách sản phẩm thành công",
      data: rows,
    });
  } catch (error) {
    console.error("Lỗi khi truy vấn database:", error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

const ProductListGif = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM sanpham WHERE loai_SP = 'quà'"
    );
    res.status(200).json({
      message: "Lấy danh sách sản phẩm quà thành công",
      data: rows,
    });
  } catch (error) {
    console.error("Lỗi khi truy vấn database:", error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

const ProductListCombo = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM sanpham WHERE loai_SP = 'combo'"
    );
    res.status(200).json({
      message: "Lấy danh sách sản phẩm combo thành công",
      data: rows,
    });
  } catch (error) {
    console.error("Lỗi khi truy vấn database:", error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
const product = { ProductList, ProductListGif, ProductListCombo };

export default product;
