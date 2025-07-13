import React, { Component } from "react";
import avatar from "../../assets/img/avatar.webp"; // Đảm bảo đường dẫn đúng
import shop from "../../assets/img/shop.gif"; // Đảm bảo đường dẫn đúng
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { getTotalQuantity } from "../components/Shopng_cart";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.state = {
      user: null,
      totalItems: getTotalQuantity(), // ✅ Khởi tạo số lượng giỏ hàng lúc đầu
    };
  }

  componentDidMount() {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      this.setState({ user: JSON.parse(savedUser) });
    }
    this.cartInterval = setInterval(() => {
      const currentTotal = getTotalQuantity();
      if (this.state.totalItems !== currentTotal) {
        this.setState({ totalItems: currentTotal });
      }
    }, 500); // kiểm tra mỗi 0.5 giây
  }

  handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload(); // Hoặc dùng navigate("/") nếu dùng React Router v6+
  };

  render() {
    const { user } = this.state;
    const totalItems = getTotalQuantity();

    return (
      <header className="bg-white shadow-sm py-3 px-4 w-100 bg-white shadow-sm py-3 px-4 fixed-top ">
        <div className="d-flex align-items-center justify-content-between w-100">
          {/* Logo bên trái */}
          <div className="d-flex align-items-center text-danger fw-bold fs-4">
            <span className="me-2">🌸</span>
            FLOWER
          </div>

          {/* Menu giữa */}
          <nav className="d-flex gap-4">
            <Link to="/" className="nav-link text-dark fw-semibold">
              Trang chủ
            </Link>
            <Link to="/goods" className="nav-link text-dark fw-semibold">
              Sản phẩm
            </Link>
            <Link to="/about" className="nav-link text-dark fw-semibold">
              Giới thiệu
            </Link>
            <Link to="/contact" className="nav-link text-dark fw-semibold">
              Liên hệ
            </Link>
          </nav>

          {/* Tài khoản & giỏ hàng bên phải */}
          <div className="d-flex align-items-center gap-3">
            {user ? (
              <div className="d-flex align-items-center gap-2 dropdown">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <span className="fw-semibold text-dark">
                      Xin chào, {user.username}
                      <img
                        src={avatar}
                        alt="Avatar"
                        className="rounded-circle ms-2 cover-avatar"
                        style={{
                          width: "30px",
                          height: "30px",
                          objectFit: "cover",
                        }}
                      ></img>
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <button
                      onClick={this.handleLogout}
                      className="btn btn-outline-danger btn-sm d-flex justify-content-center align-items-center w-100"
                    >
                      Đăng xuất
                    </button>
                    <Link
                      to="/HoaDonPage"
                      className="btn btn-outline-danger btn-sm d-flex justify-content-center align-items-center w-100"
                    >
                      Hóa đơn
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : (
              <>
                <Link to="/login" className="nav-link text-dark fw-semibold">
                  Đăng nhập
                </Link>
                <Link to="/register" className="nav-link text-dark fw-semibold">
                  Đăng ký
                </Link>
              </>
            )}

            <Link to="/CartPage" className="btn btn-danger px-3 rounded-pill">
              Giỏ hàng
              <img
                src={shop}
                alt="Giỏ hàng"
                className="ms-2 icon-shoping-cart"
                style={{ width: "24px", height: "24px" }}
              />
              <span>({totalItems})</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}
