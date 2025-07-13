import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="impact-footer">
          <div className="impact-footer-inner">
            <div className="impact-left">
              <h2>💐 Đặt hoa liền tay – Giao trong 2H!</h2>
              <p className="ms-5">
                Tiệm hoa Flower – Gửi cảm xúc thay lời muốn nói 🌷
              </p>
              <Link to="/Goods" className="cta-btn">
                {" "}
                đặt hoa ngay
              </Link>
            </div>

            <div className="impact-right">
              <div className="column">
                <h4>Liên hệ nhanh</h4>
                <p>📞 0979326005</p>
                <p>📍 123 Đường Hoa, TP.HCM</p>
                <p>✉️ tuannguyenak47z@gmail.com</p>
              </div>
              <div className="column">
                <h4>Theo dõi chúng tôi</h4>
                <div className="socials d-flex justify-content-center gap-3">
                  <a
                    href="https://www.facebook.com/trongtim.khoang.75?locale=vi_VN"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                      alt="Facebook"
                      width="32"
                      height="32"
                    />
                  </a>

                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                      alt="Instagram"
                      width="32"
                      height="32"
                    />
                  </a>

                  <a
                    href="https://zalo.me/0979326005"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/512px-Icon_of_Zalo.svg.png"
                      alt="Zalo"
                      width="32"
                      height="32"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-note">
            &copy; 2025 Flower Giao hoa nhanh – Quà tặng trọn vẹn cảm xúc 💞
          </div>
        </footer>
      </div>
    );
  }
}
