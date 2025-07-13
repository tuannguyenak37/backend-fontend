// src/routes/RoutesLogin.js
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HomePage from "../views/components/HomePage";
import Login from "../views/components/Login";
import Goods from "../views/components/Goods";
import Love from "../views/components_share/Love";
import CartPage from "../views/components/CartPage";
import About from "../views/components/About";
import HoaDonPage from "../views/components/Hoadon";
const RoutesLogin = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/goods" element={<Goods />} />
        <Route path="/Love" element={<Love />} />
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/About" element={<About />} />
        <Route path="/HoaDonPage" element={<HoaDonPage />} />
        {/* Thêm các route khác nếu cần */}
      </Routes>
    </AnimatePresence>
  );
};

export default RoutesLogin;
