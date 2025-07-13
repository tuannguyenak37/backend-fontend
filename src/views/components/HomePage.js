import "bootstrap/dist/css/bootstrap.min.css";
import Countdown from "../components_share/Countdown";
import Outstanding from "../components_share/Outstanding";
import ChoseMenu from "../components_share/ChoseMenu";
import Header from "../components_share/Header";
import Letter from "../components_share/Letter";

import { Link } from "react-router-dom"; // Sử dụng Link từ react-router-dom

import "../../styles/global.scss"; // Đảm bảo đường dẫn đúng đến file CSS

import hoa1 from "../../assets/img/hoa1.avif";
import hoa2 from "../../assets/img/hoa2.avif";
import hoa3 from "../../assets/img/hoa3.avif";
import { Col, Row } from "react-bootstrap";
import Footer from "../components_share/Footer"; // Import FootƯer
import RollingGallery from "./Contact";

import { motion } from "framer-motion";
const HomePage = () => {
  return (
    <div>
      <header>
        <Header />
      </header>

      <motion.div
        initial={{ x: 100, opacity: 0 }} // bắt đầu mờ
        animate={{ x: 0, opacity: 1 }} // mờ dần lên
        exit={{ x: -100, opacity: 0 }} // khi rời khỏi trang thì mờ đi
        transition={{ duration: 1 }}
      >
        <main
          className="container-fluid banner-hero py-5"
          style={{ marginTop: "100px" }}
        >
          <div className="row align-items-center">
            <div className="col-md-6 text-start ps-5">
              <h1 className="display-5 fw-bold text-center text-danger">
                Trao hoa – Gửi quà <br></br> Gửi trọn yêu thương
                <Row className="text-center">
                  <Col className="text-center">
                    <Link to="/Love" className="btn btn-danger mt-3 mb-4">
                      THAM GIA NGAY
                    </Link>
                  </Col>
                </Row>
              </h1>

              {/* đếm ngược countdown */}
              <Countdown />
            </div>

            <div className="col-md-6 text-center">
              <div
                id="flowerCarousel"
                className="carousel slide carousel-fade"
                data-bs-ride="carousel"
                data-bs-interval="2000"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={hoa1}
                      className="d-block w-50 mx-auto"
                      alt="hoa 1"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={hoa2}
                      className="d-block w-50 mx-auto"
                      alt="hoa 2"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={hoa3}
                      className="d-block w-50 mx-auto"
                      alt="hoa 3"
                    />
                  </div>
                  <div
                    id="flowerCarousel"
                    className="carousel slide carousel-fade"
                    data-bs-ride="carousel"
                    data-bs-interval="2000"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <section>
          <Outstanding />
        </section>
        <section>
          <ChoseMenu />
        </section>
        <div className="container">
          <Letter />
        </div>
        <div className="bg-radi">
          <RollingGallery />{" "}
          <footer>
            <Footer />
          </footer>
        </div>

        {/* // Footer */}
      </motion.div>
    </div>
  );
};

export default HomePage;
