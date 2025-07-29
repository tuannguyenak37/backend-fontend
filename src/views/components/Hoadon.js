import React, { Component } from "react";
import Header from "../components_share/Header";

export default class HoaDonPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoaDons: [],
      hoaDon: {}, // chứa giamgia, ThanhTien
      chiTietHoaDon: [],
      selectedHoaDonId: null,
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.id;

    if (!userId) {
      alert("Bạn chưa đăng nhập!");
      return;
    }

    this.fetchHoaDon(userId);
  }

  fetchHoaDon = (userId) => {
    fetch(`https://backendflower-9t22.onrender.com/api/HoaDon?userId=${userId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu hóa đơn");
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          this.setState({ hoaDons: data.hoaDons });
        } else {
          alert("Không có hóa đơn nào.");
        }
      })
      .catch((error) => console.error("Lỗi:", error));
  };

  xemChiTiet = (id_HD) => {
    fetch("https://backendflower-9t22.onrender.com/api/CTHoaDon?id_HD=" + id_HD)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const { chiTiet } = data;
          const { giamgia, ThanhTien } = chiTiet[0] || {};

          this.setState({
            hoaDon: {
              giamgia: giamgia,
              ThanhTien: ThanhTien,
            },
            chiTietHoaDon: chiTiet,
            selectedHoaDonId: id_HD,
          });
        } else {
          alert("Không tìm thấy chi tiết hóa đơn.");
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy chi tiết:", err);
      });
  };

  render() {
    const { hoaDons, chiTietHoaDon, selectedHoaDonId, hoaDon } = this.state;

    return (
      <div className="container">
        <Header />

        <h1 className="text-center mt-5">Danh sách hóa đơn</h1>
        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th>ID Hóa Đơn</th>
              <th>Ngày Đặt</th>
              <th>Trạng Thái</th>
              <th>Mô Tả</th>
              <th>Tên Khách Hàng</th>
              <th>Thành tiền</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {hoaDons.map((hoaDon) => (
              <tr key={hoaDon.id_HD}>
                <td>{hoaDon.id_HD}</td>
                <td>{new Date(hoaDon.ngayDat).toLocaleString("vi-VN")}</td>
                <td>{hoaDon.TrangThai}</td>
                <td>{hoaDon.mota}</td>
                <td>{hoaDon.name_KH}</td>
                <td>{hoaDon.ThanhTien.toLocaleString()} đ</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => this.xemChiTiet(hoaDon.id_HD)}
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Chi tiết hóa đơn */}
        {selectedHoaDonId && (
          <div className="mt-5">
            <h3>Chi tiết hóa đơn: {selectedHoaDonId}</h3>
            <table className="table table-striped table-bordered mt-3 text-center">
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {chiTietHoaDon.map((item) => (
                  <tr key={item.id_CTHD}>
                    <td>{item.name_SP}</td>
                    <td>{item.gia_SP.toLocaleString()} đ</td>
                    <td>{item.SOLUONG}</td>
                    <td>{item.tongTIEN.toLocaleString()} đ</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Giảm giá và Thành tiền sau giảm */}
            {chiTietHoaDon.length > 0 && (
              <div className="text-end mt-2 fw-bold">
                <p>Giảm giá: {hoaDon.giamgia || 0}%</p>
                <p>
                  Thành tiền sau giảm:{" "}
                  {hoaDon.ThanhTien ? hoaDon.ThanhTien.toLocaleString() : 0} đ
                </p>
              </div>
            )}
          </div>
        )}

        {/* Trường hợp không có hóa đơn */}
        {hoaDons.length === 0 && (
          <div className="text-center mt-4">
            <p>Không có hóa đơn nào.</p>
          </div>
        )}
      </div>
    );
  }
}
