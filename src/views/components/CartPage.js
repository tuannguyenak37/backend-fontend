import React, { Component } from "react";
import { getCart, saveCart } from "./Shopng_cart";
import Header from "../components_share/Header";
import { motion } from "framer-motion";

export default class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: getCart(),
      mota: "",
      rememberCustomer: true,
      khachHang: {
        name_KH: "",
        dt_KH: "",
        diachi_KH: "",
        motaDiaCHi_KH: "",
        email_KH: "",
      },
      selectedCode: "",
      sellCode: "",
      sellPercent: 0,
      discountApplied: false,
    };
  }

  componentDidMount() {
    const remember = localStorage.getItem("rememberCustomer") === "true";
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.id;

    const sellData = JSON.parse(localStorage.getItem("sell") || "{}");
    if (sellData.code && sellData.percent) {
      this.setState({ sellCode: sellData.code });
      this.setState({ sellPercent: sellData.percent });
    }

    if (remember) {
      const savedKH = JSON.parse(localStorage.getItem("savedKH") || "{}");
      if (savedKH.name_KH) {
        // Nếu đã lưu thủ công => dùng
        this.setState({ khachHang: savedKH });
      } else if (userId) {
        // Nếu chưa từng lưu thủ công => fetch từ server
        fetch(`http://localhost:5000/api/user/${userId}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success && data.khachHang) {
              this.setState({ khachHang: data.khachHang });
            }
          })
          .catch((err) => console.error("❌ Lỗi lấy KH theo userId:", err));
      }
    }
  }
  handleApplyDiscount = () => {
    const { selectedCode, sellCode } = this.state;
    if (selectedCode === sellCode) {
      this.setState({ discountApplied: true });
    } else {
      this.setState({ discountApplied: false });
    }
  };

  handleQuantityChange = (index, newQuantity) => {
    const cart = [...this.state.cart];
    const quantity = parseInt(newQuantity);
    if (quantity >= 1) {
      cart[index].quantity = quantity;
      saveCart(cart);
      this.setState({ cart });
    }
  };

  handleRemoveItem = (index) => {
    const cart = [...this.state.cart];
    cart.splice(index, 1);
    saveCart(cart);
    this.setState({ cart });
  };

  getTotalPrice = () => {
    return this.state.cart.reduce(
      (total, item) => total + item.gia_SP * item.quantity,
      0
    );
  };

  handleAddCustomer = async () => {
    const { khachHang, rememberCustomer } = this.state;
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.id;

    if (!khachHang.name_KH.trim()) return alert("⚠️ Vui lòng nhập họ tên!");
    if (!/^[0-9]{9,11}$/.test(khachHang.dt_KH))
      return alert("⚠️ Số điện thoại không hợp lệ (9-11 số)!");
    if (!khachHang.diachi_KH.trim()) return alert("⚠️ Nhập địa chỉ!");
    if (!khachHang.motaDiaCHi_KH.trim()) return alert("⚠️ Nhập mô tả địa chỉ!");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(khachHang.email_KH))
      return alert("⚠️ Email không hợp lệ!");
    if (!userId) return alert("⚠️ Bạn chưa đăng nhập!");

    try {
      const res = await fetch("http://localhost:5000/api/KH", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name_KH: khachHang.name_KH,
          dt_KH: khachHang.dt_KH,
          diachi_KH: khachHang.diachi_KH,
          motaDiaCHi_KH: khachHang.motaDiaCHi_KH,
          email_KH: khachHang.email_KH,
          userId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Lưu thông tin khách hàng thành công!");

        if (rememberCustomer) {
          localStorage.setItem("rememberCustomer", "true");

          // 👉 Thêm id_KH trả về từ backend vào localStorage
          const fullKH = { ...khachHang, id_KH: data.id_KH };
          localStorage.setItem("savedKH", JSON.stringify(fullKH));
        } else {
          localStorage.removeItem("rememberCustomer");
          localStorage.removeItem("savedKH");
        }
      }
    } catch (err) {
      console.error("❌ Lỗi gửi KH:", err);
    }
  };

  handleCheckout = async () => {
    const { cart, mota } = this.state;

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.id;
    const savedKH = JSON.parse(localStorage.getItem("savedKH") || "{}");
    const id_KH = savedKH.id_KH;

    if (!userId || userId.trim() === "") return alert("Bạn chưa đăng nhập!");

    if (cart.length === 0) return alert("Giỏ hàng trống!");

    const cartItems = cart.map((item) => ({
      id_SP: item.id_SP,
      ten_SP: item.name_SP,
      soLuong: item.quantity,
      donGia: item.gia_SP,
    }));

    try {
      const res = await fetch("http://localhost:5000/api/Pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, mota, id_KH, cartItems }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`✅ Đặt hàng thành công! Mã: ${data.id_HD}`);
        saveCart([]);
        this.setState({ cart: [], mota: "" });
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("❌ Lỗi thanh toán:", err);
    }
  };
  getDiscountedTotal = () => {
    const { sellPercent } = this.state;
    const total = this.getTotalPrice();
    const discounted = total - (total * sellPercent) / 100;
    return discounted;
  };

  render() {
    const { cart, mota, khachHang, rememberCustomer } = this.state;

    return (
      <div>
        <header className="container">
          <Header />
        </header>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="container" style={{ marginTop: "100px" }}>
            <h2>🛒 Giỏ hàng của bạn</h2>

            {/* Form khách hàng */}
            <div className="p-4 mb-5 border rounded bg-light">
              <h4>🧾 Nhập thông tin khách hàng</h4>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <label className="form-label">Họ và tên</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Họ và tên"
                    value={khachHang.name_KH}
                    onChange={(e) =>
                      this.setState({
                        khachHang: { ...khachHang, name_KH: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <label className="form-label">Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="VD: 0987654321"
                    value={khachHang.dt_KH}
                    onChange={(e) =>
                      this.setState({
                        khachHang: { ...khachHang, dt_KH: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <label className="form-label">Địa chỉ</label>
                  <input
                    type="text"
                    className="form-control"
                    value={khachHang.diachi_KH}
                    onChange={(e) =>
                      this.setState({
                        khachHang: {
                          ...khachHang,
                          diachi_KH: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <label className="form-label">Mô tả địa chỉ</label>
                  <input
                    type="text"
                    className="form-control"
                    value={khachHang.motaDiaCHi_KH}
                    onChange={(e) =>
                      this.setState({
                        khachHang: {
                          ...khachHang,
                          motaDiaCHi_KH: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="col-md-12 mb-2">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={khachHang.email_KH}
                    onChange={(e) =>
                      this.setState({
                        khachHang: { ...khachHang, email_KH: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="form-check mt-3 ms-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberKH"
                    checked={rememberCustomer}
                    onChange={(e) =>
                      this.setState({ rememberCustomer: e.target.checked })
                    }
                  />
                  <label className="form-check-label" htmlFor="rememberKH">
                    Ghi nhớ khách hàng cho lần sau
                  </label>
                </div>

                <div className="col-md-12 text-end mt-3">
                  <button
                    className="btn btn-primary"
                    onClick={this.handleAddCustomer}
                  >
                    Lưu thông tin khách hàng
                  </button>
                </div>
              </div>
            </div>

            {cart.length === 0 ? (
              <p>Giỏ hàng đang trống, hãy mua sắm thêm đi nào.</p>
            ) : (
              <>
                <table className="table table-bordered mt-4">
                  <thead>
                    <tr>
                      <th className="text-center">Hình</th>
                      <th className="text-center">Tên</th>
                      <th className="text-center">Giá</th>
                      <th className="text-center">Số lượng</th>
                      <th className="text-center">Tổng</th>
                      <th className="text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={item.id_SP}>
                        <td>
                          <img
                            src={`/${item.img}`}
                            alt={item.name_SP}
                            className="form-img d-flex mx-auto"
                          />
                        </td>
                        <td className="text-center">{item.name_SP}</td>
                        <td className="text-center">
                          {item.gia_SP.toLocaleString()}đ
                        </td>
                        <td>
                          <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            className="form-control form-count"
                            onChange={(e) =>
                              this.handleQuantityChange(index, e.target.value)
                            }
                          />
                        </td>
                        <td className="text-center">
                          {(item.gia_SP * item.quantity).toLocaleString()}đ
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-danger"
                            onClick={() => this.handleRemoveItem(index)}
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="d-flex justify-content-end text-center mt-4">
                  <textarea
                    className="form-control w-50"
                    rows="3"
                    placeholder="Nhập ghi chú..."
                    value={mota}
                    onChange={(e) => this.setState({ mota: e.target.value })}
                  ></textarea>

                  <select
                    className="form-select w-25"
                    value={this.state.selectedCode}
                    onChange={(e) =>
                      this.setState({ selectedCode: e.target.value })
                    }
                  >
                    <option value="">-- Chọn mã giảm giá --</option>
                    {this.state.sellCode && (
                      <option value={this.state.sellCode}>
                        {this.state.sellCode}
                      </option>
                    )}
                  </select>

                  <button
                    className="btn btn-outline-primary ms-2"
                    onClick={this.handleApplyDiscount}
                  >
                    Áp dụng
                  </button>

                  {this.state.discountApplied && (
                    <div>
                      <p className="text-success">
                        ✅ Mã giảm giá đã được áp dụng!
                        <br /> Giảm {this.state.sellPercent}% cho tổng giá trị
                        đơn hàng.
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-end mt-5">
                  <h4>
                    Tổng cộng:{" "}
                    <span
                      className={
                        this.state.discountApplied
                          ? "text-muted"
                          : "text-danger"
                      }
                      style={
                        this.state.discountApplied
                          ? { textDecoration: "line-through" }
                          : {}
                      }
                    >
                      {this.getTotalPrice().toLocaleString()}đ
                    </span>
                  </h4>

                  {this.state.discountApplied && (
                    <h4 className="text-success">
                      ➖ Thàn tiền:{" "}
                      <strong>
                        {this.getDiscountedTotal().toLocaleString()}đ
                      </strong>
                    </h4>
                  )}

                  <button
                    className="btn btn-success mt-3"
                    onClick={this.handleCheckout}
                  >
                    Thanh toán
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    );
  }
}
