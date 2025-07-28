import React, { Component } from "react";
import axios from "axios";
import "../../styles/Myprofile.css";
import Header from "../components_share/Header";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("vi-VN");
};
const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: null,
      editProfile: false,
      changePassword: false,
      errorMessage: "",
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        birthday: "",
      },
      formDataPassword: {
        oldPassword: "",
        NewPassword: "",
        New2Password: "",
      },
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.id;

    if (!userId) {
      alert("Bạn chưa đăng nhập!");
      return;
    }

    this.fetchProfile(userId);
  }

  fetchProfile = (userId) => {
    axios
      .get(`http://localhost:5000/api/MyProfile?userId=${userId}`)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            userProfile: res.data.userProfile,

            formData: {
              firstName: res.data.userProfile.firstName || "",
              lastName: res.data.userProfile.lastName || "",
              email: res.data.userProfile.email || "",
              birthday: res.data.userProfile.birthday || "",
            },
          });
        } else {
          alert("Không tìm thấy thông tin người dùng.");
        }
      })
      .catch((err) => console.error("Lỗi:", err));
  };

  handleTrueEditProfile = () => {
    this.setState({ editProfile: true });
  };
  changePassword = () => {
    this.setState({ changePassword: true });
  };
  handelEditprofile = (e) => {
    const { name, value } = e.target;
    // Cập nhật formData theo từng trường nhập
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { formData } = this.state;
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.id;
    if (!userId) {
      alert("Bạn chưa đăng nhập!");
      return;
    }

    axios
      .put(`http://localhost:5000/api/updateProfile?userID=${userId}`, {
        userId,
        ...formData,
      })
      .then((res) => {
        if (res.data.success) {
          alert("Cập nhật thành công!");
          this.setState({ editProfile: false });
          this.fetchProfile(userId); // Cập nhật lại thông tin sau khi chỉnh sửa
        } else {
          alert("Cập nhật thất bại. Vui lòng thử lại.");
        }
      })
      .catch((err) => console.error("Lỗi cập nhật:", err));
  };
  handleSubmitPassword = (e) => {
    e.preventDefault();
    const { formDataPassword } = this.state;
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.id;
    if (!userId) {
      alert("Bạn chưa đăng nhập!");
      return;
    }

    if (formDataPassword.NewPassword !== formDataPassword.New2Password) {
      this.setState({ errorMessage: "Mật khẩu mới không khớp!" });

      return;
    }
    axios
      .put(`http://localhost:5000/api/updatePassword?userID=${userId}`, {
        userId,
        ...formDataPassword,
      })
      .then((res) => {
        if (res.data.success) {
          alert("Đổi mật khẩu thành công!");
          this.setState({ changePassword: false, errorMessage: "" });
        } else {
          alert("Đổi mật khẩu thất bại. Vui lòng thử lại.");
        }
      })
      .catch((err) => {
        console.error("Lỗi đổi mật khẩu:", err);
        this.setState({
          errorMessage: "Đổi mật khẩu thất bại. Vui lòng thử lại.",
        });
      });
  };
  editformpassword = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formDataPassword: {
        ...prevState.formDataPassword,
        [name]: value,
      },
    }));
  };

  render() {
    const { userProfile, editProfile, changePassword } = this.state;
    return (
      <div className="profile-page">
        <Header />
        <div className="mt-5"></div>
        <div className="profile-container mt-5">
          {userProfile ? (
            <>
              <div className="profile-header">
                <div className="avatar">TT</div>
                <div>
                  <h2>
                    {userProfile.firstName} {userProfile.lastName}
                  </h2>
                  <p className="username">@{userProfile.username}</p>
                  <div className="status">🟢 Trạng thái: Hoạt động</div>
                </div>
              </div>

              <div className="profile-stats">
                <div className="stat-box ho-so">
                  <h3>100%</h3>
                  <p>Hồ sơ</p>
                </div>
                <div className="stat-box">
                  <h3>A+</h3>
                  <p>Xếp hạng</p>
                </div>
              </div>

              <div className="info-section">
                <div className="info-box">
                  <h4>📧 Thông Tin Liên Hệ</h4>
                  <p>
                    <strong>Email:</strong> {userProfile.email}
                  </p>
                  <p>
                    <strong>Tên người dùng:</strong> {userProfile.username}
                  </p>
                </div>

                <div className="info-box">
                  <h4>👤 Thông Tin Cá Nhân</h4>
                  <p>
                    <strong>Ngày sinh:</strong>{" "}
                    {formatDate(userProfile.birthday)}
                  </p>
                  <p>
                    <strong>Họ và tên đầy đủ:</strong> {userProfile.firstName}{" "}
                    {userProfile.lastName}
                  </p>
                </div>
              </div>

              <div className="dashboard">
                <h4>📊 Bảng Điều Khiển Chuyên Nghiệp</h4>
                <div className="dashboard-stats">
                  <div>
                    <h3 className="txt-ht">100% ✅</h3>
                    <p>Tỷ lệ hoàn thiện</p>
                    <p>hồ sơ đầy đủ</p>
                  </div>
                  <div>
                    <h3 className="txt-a">A+ ⭐</h3>
                    <p>Xếp hạng </p>
                    <p>CHất lượng cao</p>
                  </div>
                  <div>
                    <h3 className="txt-9">99.9% 🔥</h3>
                    <p>Độ tin cậy</p>
                    <p> Tin tưởng</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Đang tải thông tin...</p>
          )}
        </div>
        <div className="text-center mt-5">
          {editProfile ? (
            <div className="edit-profile-form d-flex justify-content-center w-100">
              <div className="container-profile">
                <div className="heading-profile">Chỉnh sửa thông tin</div>
                <form className="form-profile" onSubmit={this.handleSubmit}>
                  <input
                    className="input-profile"
                    type="text"
                    name="firstName"
                    placeholder="Họ và tên lót"
                    value={this.state.formData.firstName}
                    onChange={this.handelEditprofile}
                    required
                  />
                  <input
                    className="input-profile"
                    type="text"
                    name="lastName"
                    value={this.state.formData.lastName}
                    onChange={this.handelEditprofile}
                    placeholder="tên"
                    required
                  />
                  <input
                    className="input-profile"
                    type="email"
                    name="email"
                    onChange={this.handelEditprofile}
                    value={this.state.formData.email}
                    placeholder="Email"
                    required
                  />

                  <input
                    className="input-profile"
                    type="date"
                    name="birthday"
                    onChange={this.handelEditprofile}
                    value={formatDateForInput(this.state.formData.birthday)}
                    placeholder="Sinh nhật"
                  />

                  <input
                    className="login-button-profile"
                    type="submit"
                    value="Lưu thay đổi"
                  />
                </form>
              </div>
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={this.handleTrueEditProfile}
            >
              Chỉnh sửa hồ sơ
            </button>
          )}
          {changePassword ? (
            <div className="change-password-form d-flex justify-content-center w-100">
              <div className="container-profile">
                <div className="heading-profile">Đổi mật khẩu</div>
                <form
                  className="form-profile"
                  onSubmit={this.handleSubmitPassword}
                >
                  <input
                    className="input-profile"
                    type="password"
                    name="oldPassword"
                    placeholder="Mật khẩu cũ"
                    value={this.state.formDataPassword.oldPassword || ""}
                    onChange={this.editformpassword}
                    required
                  />
                  <input
                    className="input-profile"
                    type="password"
                    name="NewPassword"
                    placeholder="Mật khẩu mới"
                    value={this.state.formDataPassword.NewPassword || ""}
                    onChange={this.editformpassword}
                    required
                  />
                  <input
                    className="input-profile"
                    type="password"
                    name="New2Password"
                    placeholder="Xác nhận mật khẩu mới"
                    value={this.state.formDataPassword.New2Password || ""}
                    onChange={this.editformpassword}
                    required
                  />
                  {this.state.errorMessage && (
                    <p className="mt-3" style={{ color: "red" }}>
                      {this.state.errorMessage}
                    </p>
                  )}

                  <button className="login-button-profile" type="submit">
                    Lưu mật khẩu
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <button
              className="btn btn-secondary m-5"
              onClick={() => this.setState({ changePassword: true })}
            >
              Đổi mật khẩu
            </button>
          )}
        </div>
      </div>
    );
  }
}
