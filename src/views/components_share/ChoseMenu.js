import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import hoa from "../../assets/img/chose1.png";
import gifs from "../../assets/img/chosegifs.avif";
import combo from "../../assets/img/combo.png";

export default class ChoseMenu extends Component {
  render() {
    return (
      <div>
        <div className="container  ">
          <Row className="">
            <Col xs={12} className="text-center">
              <h2 className="font-chose mb-5 mt-5">
                Còn chần chờ gì nữa mà không chọn một món quà cho người thương
                ngay đi nào{" "}
              </h2>
            </Col>
          </Row>
          <Row className="color">
            <Col xs={4} md={4} className="text-center">
              <div className="card mt-5 mb-5 menu-card  border-0 color">
                <Link
                  to="/goods"
                  className="text-decoration-none text-dark menu-img "
                >
                  <img src={hoa} className="card-img-top" alt="hoa" />
                  <div className="card-body menu-img text-center">
                    <h5 className="card-title">HOA</h5>
                  </div>
                </Link>
              </div>
            </Col>

            <Col xs={4} md={4} className="text-center">
              <div className="card mt-5 mb-5 menu-card  border-0 color">
                <Link to="/goods" className="text-decoration-none text-dark">
                  <img
                    src={gifs}
                    className="card-img-top menu-img "
                    alt="hoa"
                  />
                  <div className="card-body menu-img">
                    <h5 className="card-title">QUÀ</h5>
                  </div>
                </Link>
              </div>
            </Col>
            <Col xs={4} md={4} className="text-center">
              <div className="card mt-5 mb-5 menu-card  border-0 color">
                <Link to="/goods" className="text-decoration-none text-dark">
                  <img src={combo} className="card-img-top" alt="hoa" />
                  <div className="card-body menu-img">
                    <h5 className="card-title">COMBO</h5>
                  </div>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
