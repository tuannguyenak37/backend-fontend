import React, { useState } from "react";
import "../../styles/love.scss";
import { Link } from "react-router-dom";
import Sell from "./Sell";
import loveimg from "../../assets/img/loveimg.jpg";
import { Col, Row } from "react-bootstrap";
export default function Love() {
  const [hiddenHearts, setHiddenHearts] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [win, setWin] = useState(false);

  const heartShape = [
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  ];

  const handleClick = (index) => {
    if (hiddenHearts.includes(index)) return;

    const flat = heartShape.flat();
    const isHeart = flat[index] === 1;

    setHiddenHearts((prevHidden) => [...prevHidden, index]);

    if (isHeart) {
      setCorrectCount((prevCount) => {
        const newCount = prevCount + 1;
        if (newCount >= 20) {
          setWin(true);
        }
        return newCount;
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {!win ? (
        <Row>
          <Col md={4} className="container mt-4">
            <row className="container ">
              <Col md={4}>
                <img
                  className="img-iconlove rounded-circle"
                  src={loveimg}
                  alt="a"
                ></img>
              </Col>
            </row>
          </Col>

          <Col>
            <div className="heart-container">
              <div className="heart-grid">
                {heartShape.flat().map((cell, index) => (
                  <div key={index} className="heart-cell">
                    {cell === 1 && !hiddenHearts.includes(index) ? (
                      <span
                        onClick={() => handleClick(index)}
                        className="heart"
                      >
                        &#10084;
                      </span>
                    ) : (
                      " "
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      ) : (
        <div>
          <h1 className="text-center">You win! {correctCount} điểm </h1>
          <div className="back-love d-flex align-content-center justify-content-center">
            <Link to="/" className="text-decoration-none text">
              Trở về
            </Link>
          </div>
          <div>
            {" "}
            <h1 className=" mt-3"> chúc mừng bạn nhận được mã giảm giá</h1>{" "}
          </div>
          <Sell />
        </div>
      )}
    </div>
  );
}
