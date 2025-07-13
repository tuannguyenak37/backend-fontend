import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import hoagift from "../../assets/img/hoagif.jpg";
import combo2 from "../../assets/img/combo2.jpg";
import qua7 from "../../assets/img/qua7.jpg";
import menuhoa2 from "../../assets/img/menuhoa2.jpg";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Star = ({ left, size, duration }) => {
  return (
    <svg
      className="star"
      viewBox="0 0 64 64"
      style={{
        position: "absolute",
        top: "-20px",
        left: `${left}vw`,
        width: `${size * 5}px`,
        height: `${size * 5}px`,
        animationDuration: `${duration}s`,
        animationDelay: `-${Math.random() * duration}s`,
      }}
    >
      <polygon
        points="32,4 39,24 60,24 42,38 48,58 32,46 16,58 22,38 4,24 25,24"
        fill="gold"
        stroke="#f8c300"
        strokeWidth="1"
      />
    </svg>
  );
};

// Component Trường Ngôi Sao
const StarField = () => {
  const stars = Array.from({ length: 100 }, () => ({
    left: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 5 + 2,
  }));
  return (
    <div className="star-field">
      {stars.map((star, index) => (
        <Star
          key={index}
          left={star.left}
          size={star.size}
          duration={star.duration}
        />
      ))}
    </div>
  );
};
export default class Outstanding extends Component {
  render() {
    return (
      <div className="container">
        <StarField />
        <div className=" text-center">
          <h3 className="fonr"> Sản phẩm nổi bật</h3>
        </div>
        <Row className="mt-5 seller">
          <Col>
            <div className="">
              <img
                src={hoagift}
                className="d-block w-75 mx-auto roundeda uniform-img"
                alt="hoa 2"
              />
              <p className="text-center mt-1 mb-0 ">
                <strong>Hoa tươi</strong>
              </p>
              <p className="text-center mt-0 mb-0">
                <strong>Giá: 200.000đ</strong>
              </p>
            </div>
            <Link to="/goods" className="btn btn-primary mt-2">
              Xem thêm
            </Link>
          </Col>
          <Col>
            <div>
              <img
                src={combo2}
                className="d-block w-75 mx-auto roundeda uniform-img"
                alt="hoa 2"
              />
            </div>
            <p className="text-center mt-1 mb-0">
              <strong>Quà đặc biệt</strong>
            </p>
            <p className="text-center mt-0 mb-0">
              <strong>Giá: 300.000đ</strong>
            </p>
            <Link to="/goods" className="btn btn-primary mt-2">
              Xem thêm
            </Link>
          </Col>
          <Col>
            <div>
              <img
                src={qua7}
                className="d-block w-75 mx-auto roundeda uniform-img"
                alt="hoa 2"
              />
              <p className="text-center mt-1 mb-0 ">
                <strong>Socola</strong>
              </p>
              <p className="text-center mt-0 mb-0">
                <strong>Giá: 210.000đ</strong>
              </p>
              <Link to="/goods" className="btn btn-primary mt-2">
                Xem thêm
              </Link>
            </div>
          </Col>
          <Col>
            <div>
              <img
                src={menuhoa2}
                className="d-block w-75 mx-auto roundeda uniform-img"
                alt="hoa 2"
              />
            </div>
            <p className="text-center mt-1 mb-0 ">
              <strong>Hoa cúc</strong>
            </p>
            <p className="text-center mt-0 mb-0">
              <strong>Giá: 100.000đ</strong>
            </p>
            <Link to="/goods" className="btn btn-primary mt-2">
              Xem thêm
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}
