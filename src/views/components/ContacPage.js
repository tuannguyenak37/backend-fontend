import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../../styles/Contact.scss"; // Vẫn giữ nếu bạn có style khác
import Header from "../components_share/Header";
import { motion } from "framer-motion";
import { Col, Row } from "react-bootstrap";
import Footer from "../components_share/Footer";

const jobs = [
  {
    title: "Nhân Viên Thiết Kế Hoa",
    icon: "🌹",
    location: "Hà Nội",
    type: "Full-time",
    badge: "Mới",
    description:
      "Tạo ra những bó hoa đẹp mắt và ý nghĩa cho khách hàng. Yêu cầu có kinh nghiệm thiết kế hoa và óc thẩm mỹ tốt.",
    requirements: [
      "Kinh nghiệm 1-2 năm trong thiết kế hoa",
      "Có óc thẩm mỹ và sáng tạo",
      "Kỹ năng giao tiếp tốt",
    ],
    salary: "8-12 triệu",
  },
  {
    title: "Nhân Viên Bán Hàng",
    icon: "🛍️",
    location: "TP.HCM",
    type: "Full-time",
    badge: "Hot",
    description:
      "Tư vấn và bán hàng trực tiếp cho khách hàng. Hỗ trợ khách hàng chọn lựa sản phẩm phù hợp nhất.",
    requirements: [
      "Kỹ năng bán hàng và tư vấn",
      "Giao tiếp tốt, thân thiện",
      "Yêu thích hoa và quà tặng",
    ],
    salary: "7-10 triệu",
  },
  {
    title: "Nhân Viên Giao Hàng",
    icon: "🚚",
    location: "Đà Nẵng",
    type: "Part-time",
    badge: "Linh hoạt",
    description:
      "Giao hàng nhanh chóng và an toàn đến tay khách hàng. Đảm bảo sản phẩm được bảo quản tốt trong quá trình vận chuyển.",
    requirements: [
      "Có xe máy và bằng lái",
      "Thành thạo đường xá địa phương",
      "Trách nhiệm và đúng giờ",
    ],
    salary: "5-8 triệu",
  },
  {
    title: "Marketing Online",
    icon: "📱",
    location: "Remote",
    type: "Full-time",
    badge: "Remote",
    description:
      "Quản lý và phát triển các kênh marketing online. Tạo nội dung hấp dẫn và tăng độ nhận diện thương hiệu.",
    requirements: [
      "Kinh nghiệm marketing digital",
      "Thành thạo social media",
      "Kỹ năng viết content tốt",
    ],
    salary: "10-15 triệu",
  },
];
const cardData = [
  {
    icon: "💝",
    title: "Môi Trường Sáng Tạo",
    description:
      "Làm việc trong không gian đầy màu sắc và sáng tạo với những sản phẩm đẹp mắt",
  },
  {
    icon: "🌱",
    title: "Phát Triển Bản Thân",
    description:
      "Cơ hội học hỏi và phát triển kỹ năng trong ngành hoa tươi và quà tặng",
  },
  {
    icon: "🤝",
    title: "Đội Ngũ Thân Thiện",
    description:
      "Làm việc cùng những người đồng nghiệp nhiệt tình và hỗ trợ lẫn nhau",
  },
];
export default function ContactPage() {
  const formRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    const form = formRef.current;
    const name = form["user_name"].value.trim();
    const email = form["email"].value.trim();
    const message = form["message"].value.trim();

    if (!name || !email || !message) {
      setError("Please fill in all required fields (Name, Email, Message).");
      setSuccess("");
      return;
    }

    setError("");

    emailjs
      .sendForm(
        "service_18gmjpo",
        "template_kwfrojt",
        formRef.current,
        "HUsqoV-_hpoV6HhXN"
      )
      .then(
        () => {
          setSuccess(
            "🎉cảm ơn bạn đã liên hệ  chúng tôi sẽ phản hồi sớm nhất. xin cảm ơn!"
          );
          setError("");
          form.reset();
        },
        (error) => {
          setError("❌ Failed to send. Please try again later.");
          setSuccess("");
          console.error(error);
        }
      );
  };

  return (
    <div className="contact-wrapper">
      <Header />
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="container-profile mt-5 mx-auto mgx">
          <p className="heading-profile">Contact Us</p>
          <span className="title-profile">liên hệ với chúng tôi</span>

          {error && (
            <p className="contact-error" style={{ color: "red" }}>
              {error}
            </p>
          )}
          {success && (
            <p className="contact-success" style={{ color: "green" }}>
              {success}
            </p>
          )}

          <form ref={formRef} onSubmit={sendEmail} className="form-profile">
            <input
              className="input-profile"
              type="text"
              name="user_name"
              id="user_name"
              placeholder="Your name"
            />
            <input
              className="input-profile"
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
            />
            <input
              className="input-profile"
              type="tel"
              name="user_phone"
              id="user_phone"
              placeholder="(123) 456-7890"
            />
            <textarea
              className="input-profile"
              name="message"
              id="message"
              rows="4"
              placeholder="Type your message here..."
            ></textarea>

            <button type="submit" className="login-button-profile">
              Send Message
            </button>
          </form>

          <div className="contact-social-message d-flex align-items-center justify-content-center mt-4">
            <div
              className="contact-line"
              style={{ flex: 1, height: "1px", background: "#ccc" }}
            ></div>
            <p className="contact-message mx-3">
              Liên hệ chúng tôi qua mạng xã hội
            </p>
            <div
              className="contact-line"
              style={{ flex: 1, height: "1px", background: "#ccc" }}
            ></div>
          </div>

          <div className="d-flex justify-content-center gap-3 mt-3">
            <a
              href="https://www.facebook.com/trongtim.khoang.75?locale=vi_VN"
              target="_blank"
              rel="noopener noreferrer"
              className="social-button-profile"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                alt="Facebook"
                width="20"
                height="20"
                className="svg-profile"
              />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-button-profile"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram"
                width="20"
                height="20"
                className="svg-profile"
              />
            </a>

            <a
              href="https://zalo.me/0979326005"
              target="_blank"
              rel="noopener noreferrer"
              className="social-button-profile"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/512px-Icon_of_Zalo.svg.png"
                alt="Zalo"
                width="20"
                height="20"
                className="svg-profile"
              />
            </a>
          </div>
        </div>
      </motion.div>

      <div>
        <Row className="text-center mt-5">
          <Col md={12} className="text-center">
            <h1>FLOWER tuyển dụng</h1>
          </Col>
        </Row>
        <Row className="text-center mt-5">
          <Col md={12} className="text-center">
            <h4 className="text-center">
              Cùng chúng tôi mang niềm vui và hạnh phúc đến mọi người qua những
              bông hoa và món quà ý nghĩa
            </h4>
          </Col>
        </Row>
        <Row className="text-center mt-5">
          <Col md={12} className="text-center">
            <h1 className="display-5 fw-bold text-danger">
              Tại Sao Chọn Flower 🌸 ?
            </h1>
          </Col>
        </Row>
        <div className="stack-job">
          {cardData.map((card, index) => (
            <div className="card-job" key={index}>
              <div className="icon-job">{card.icon}</div>
              <h3 className="title-job">{card.title}</h3>
              <p className="desc-job">{card.description}</p>
            </div>
          ))}
        </div>
        <div className="container">
          <div className="row">
            {jobs.map((job, idx) => (
              <div className="col-md-6 mb-4" key={idx}>
                <div className="card h-100 shadow-sm p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0">{job.title}</h5>
                    <span className="fs-4">{job.icon}</span>
                  </div>
                  <div className="mb-2">
                    <span className="badge bg-primary me-1">
                      {job.location}
                    </span>
                    <span className="badge bg-success me-1">{job.type}</span>
                    <span className="badge bg-warning text-dark">
                      {job.badge}
                    </span>
                  </div>
                  <p className="text-muted">{job.description}</p>
                  <ul className="mb-2">
                    {job.requirements.map((req, i) => (
                      <li key={i}>• {req}</li>
                    ))}
                  </ul>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-danger">{job.salary}</span>
                    <button className="btn btn-outline-primary">
                      Ứng Tuyển Ngay tại phần thông tin liên hệ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container my-5">
          <h4 className="text-center fw-bold mb-4">Quyền Lợi Nhân Viên</h4>
          <div className="row g-4 justify-content-center">
            {[
              {
                icon: "💰",
                title: "Lương Cạnh Tranh",
                desc: "Mức lương hấp dẫn + thưởng hiệu suất",
              },
              {
                icon: "📄",
                title: "Bảo Hiểm",
                desc: "Bảo hiểm xã hội đầy đủ",
              },
              {
                icon: "🎉",
                title: "Team Building",
                desc: "Hoạt động vui chơi hàng tháng",
              },
              {
                icon: "🧠",
                title: "Đào Tạo",
                desc: "Khóa học nâng cao kỹ năng",
              },
            ].map((item, idx) => (
              <div className="col-6 col-md-3" key={idx}>
                <div className="text-center border rounded-4 p-3 h-100 bg-white shadow-sm">
                  <div style={{ fontSize: "2rem" }}>{item.icon}</div>
                  <div className="fw-bold mt-2">{item.title}</div>
                  <div className="text-muted small">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container my-5">
          <h4 className="text-center fw-bold mb-4">Liên Hệ Tuyển Dụng</h4>
          <div className="row text-center g-4 justify-content-center">
            <div className="col-md-4">
              <div className="fs-4">📧</div>
              <div className="fw-bold">Email</div>
              <div className="text-muted"> tuannguyenak47z@gmail.com</div>
            </div>
            <div className="col-md-4">
              <div className="fs-4 text-danger">📞</div>
              <div className="fw-bold">Hotline</div>
              <div className="text-muted"> 0979326005</div>
            </div>
            <div className="col-md-4">
              <div className="fs-4">📍</div>
              <div className="fw-bold">Địa Chỉ</div>
              <div className="text-muted">123 Đường Hoa, Quận 1, TP.HCM</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
