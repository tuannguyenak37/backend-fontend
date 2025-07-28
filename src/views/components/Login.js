import { useState, useRef } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.scss";
import { motion, AnimatePresence } from "framer-motion";

function Login() {
  const [validated, setValidated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const loginFormRef = useRef(null);
  const registerFormRef = useRef(null);
  const [login_username, setLoginUsername] = useState("");
  const [login_password, setLoginPassword] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.classList.add("login-bg");

    const savedUsername = localStorage.getItem("rememberedUsername");
    if (savedUsername) {
      setLoginUsername(savedUsername);
      setRememberMe(true);
    }

    return () => {
      document.body.classList.remove("login-bg");
    };
  }, []);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    const passwordField = form.querySelector("#password");
    const confirmPasswordField = form.querySelector("#confirm-password");

    event.preventDefault();
    event.stopPropagation();

    // Mật khẩu tối thiểu 8 ký tự
    if (passwordField?.value?.length < 8) {
      passwordField.setCustomValidity("Password must be at least 8 characters");
    } else {
      passwordField?.setCustomValidity("");
    }

    // So sánh mật khẩu xác nhận nếu đang đăng ký
    if (
      !isLogin &&
      confirmPasswordField &&
      passwordField?.value !== confirmPasswordField.value
    ) {
      confirmPasswordField.setCustomValidity("Passwords do not match");
    } else {
      confirmPasswordField?.setCustomValidity("");
    }

    setValidated(true);

    if (!form.checkValidity()) return;

    try {
      if (isLogin) {
        const res = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            login_username,
            login_password,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Đăng nhập thất bại");
        }
        if (res.ok && data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          if (rememberMe) {
            localStorage.setItem("rememberedUsername", login_username);
          } else {
            localStorage.removeItem("rememberedUsername");
          }
        }

        setError(""); // Xóa lỗi cũ nếu có
        navigate("/");
      } else {
        const birthday = `${year}-${month.padStart(2, "0")}-${day.padStart(
          2,
          "0"
        )}`;
        const res = await fetch("http://localhost:5000/api/createUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName,
            password,
            firstName,
            lastName,
            email,
            birthday,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Đăng ký thất bại");
        }

        setError(""); // Xóa lỗi cũ nếu có
        setIsLogin(true);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleFormToggle = () => {
    setIsLogin(!isLogin);
    setValidated(false);
  };

  const renderDayOptions = () =>
    Array.from({ length: 31 }, (_, i) => (
      <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
        {i + 1}
      </option>
    ));

  const renderMonthOptions = () =>
    Array.from({ length: 12 }, (_, i) => (
      <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
        {i + 1}
      </option>
    ));

  const renderYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => (
      <option key={currentYear - i} value={currentYear - i}>
        {currentYear - i}
      </option>
    ));
  };
  const formVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} // bắt đầu mờ
      animate={{ opacity: 1 }} // mờ dần lên
      exit={{ opacity: 0 }} // khi rời khỏi trang thì mờ đi
      transition={{ duration: 1 }}
    >
      <AnimatePresence mode="wait">
        <div className="container mt-5 mx-auto">
          <h1 className="text-center mb-4">
            {isLogin ? "Đăng nhập" : "Tạo tài khoản"}
          </h1>
          <Card className="mx-auto mb-4 shadow" style={{ maxWidth: "40%" }}>
            <Card.Body>
              {/* FORM ĐĂNG NHẬP */}
              {isLogin && (
                <motion.div
                  key="login"
                  variants={formVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="form-box"
                >
                  <div ref={loginFormRef}>
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={handleSubmit}
                    >
                      <Row className="mb-3">
                        <Form.Group as={Col} md="12">
                          <div className="form-floating">
                            <Form.Control
                              type="text"
                              placeholder="Username"
                              required
                              className="form-control-floating"
                              value={login_username}
                              onChange={(e) => setLoginUsername(e.target.value)}
                            />
                            <Form.Label>Username</Form.Label>
                          </div>
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group as={Col} md="12">
                          <div className="form-floating">
                            <Form.Control
                              type="password"
                              id="password"
                              placeholder="Password"
                              required
                              value={login_password}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              className="form-control-floating"
                            />
                            <Form.Label>Password</Form.Label>
                          </div>
                          <input
                            type="checkbox"
                            id="rememberMe"
                            className="form-check-input m-2"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                          />
                          <label htmlFor="rememberMe" className="mt-2">
                            Nhớ tài khoản
                          </label>
                          <div className="text-danger mt-2">
                            {error && <p>{error}</p>}
                          </div>
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Col className="d-flex justify-content-center">
                          <Button type="submit">Đăng nhập</Button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </motion.div>
              )}
              {/* FORM ĐĂNG KÝ */}
              {!isLogin && (
                <motion.div
                  key="register"
                  variants={formVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="form-box"
                >
                  <div ref={registerFormRef}>
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={handleSubmit}
                    >
                      <Row className="mb-3">
                        <Form.Group as={Col} md="12">
                          <div className="form-floating">
                            <Form.Control
                              type="text"
                              placeholder="First name"
                              required
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="form-control-floating"
                            />
                            <Form.Label>First name</Form.Label>
                          </div>
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group as={Col} md="12">
                          <div className="form-floating">
                            <Form.Control
                              type="text"
                              placeholder="Last name"
                              required
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="form-control-floating"
                            />
                            <Form.Label>Last name</Form.Label>
                          </div>
                        </Form.Group>
                      </Row>
                      {/* Ngày sinh */}
                      <Row className="mb-3 justify-content-center">
                        <Col md={4}>
                          <Form.Select
                            required
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                          >
                            <option value="">Ngày</option>
                            {renderDayOptions()}
                          </Form.Select>
                        </Col>
                        <Col md={4}>
                          <Form.Select
                            required
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                          >
                            <option value="">Tháng</option>
                            {renderMonthOptions()}
                          </Form.Select>
                        </Col>
                        <Col md={4}>
                          <Form.Select
                            required
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                          >
                            <option value="">Năm</option>
                            {renderYearOptions()}
                          </Form.Select>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group as={Col} md="12">
                          <div className="form-floating">
                            <Form.Control
                              type="text"
                              placeholder="Username"
                              required
                              value={userName}
                              onChange={(e) => setUsername(e.target.value)}
                              className="form-control-floating"
                            />
                            <Form.Label>Username</Form.Label>
                          </div>
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group as={Col} md="12">
                          <div className="form-floating">
                            <Form.Control
                              type="password"
                              id="password"
                              placeholder="Password"
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="form-control-floating"
                            />
                            <Form.Label>Password</Form.Label>
                          </div>
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group as={Col} md="12">
                          <div className="form-floating">
                            <Form.Control
                              type="password"
                              id="confirm-password"
                              placeholder="Confirm Password"
                              required
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              className="form-control-floating"
                            />
                            <Form.Label>Confirm Password</Form.Label>
                          </div>
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group as={Col} md="12">
                          <div className="form-floating">
                            <Form.Control
                              type="email"
                              placeholder="Email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control-floating"
                            />
                            <Form.Label>Email</Form.Label>
                          </div>
                        </Form.Group>
                        <div className="text-danger mt-2">
                          {error && <p>{error}</p>}
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <Col className="d-flex justify-content-center">
                          <Button type="submit">Tạo tài khoản</Button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </motion.div>
              )}
              <div className="text-center mt-3">
                <Button variant="link" onClick={handleFormToggle}>
                  {isLogin
                    ? "Chưa có tài khoản? Đăng ký"
                    : "Đã có tài khoản? Đăng nhập"}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </AnimatePresence>
    </motion.div>
  );
}

export default Login;
