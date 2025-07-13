import express from "express";
import { login, createUser } from "../controllers/User.js";
import ProductController from "../controllers/ProductList.js";
import Pay from "../controllers/Pay.js";
import KHlist from "../controllers/KH.js";
import HoaDon from "../controllers/HoaDon.js";
import CTHoaDon from "../controllers/CTHoadon.js"; // Import CTHoaDon controller
const router = express.Router();

// Định nghĩa các route cho người dùng
router.post("/login", login);
router.post("/createUser", createUser);
router.get("/productList", ProductController.ProductList);
router.get("/productListGif", ProductController.ProductListGif);
router.get("/productListCombo", ProductController.ProductListCombo);
router.post("/Pay", Pay);
router.post("/KH", KHlist.KH);
router.get("/user/:userId", KHlist.getKhachHang);
router.get("/HoaDon", HoaDon);
router.get("/CTHoaDon", CTHoaDon);
export default router;
