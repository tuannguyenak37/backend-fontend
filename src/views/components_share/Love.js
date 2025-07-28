import React, { useState, useEffect } from "react";
import "../../styles/love.scss";
import { Link } from "react-router-dom";
import Sell from "./Sell";
import loveimg from "../../assets/img/loveimg.jpg";
import { Col, Row } from "react-bootstrap";
export default function Love() {
  const [hiddenHearts, setHiddenHearts] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [win, setWin] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // thời gian đếm ngược
  const [gameOver, setGameOver] = useState(false); // kết thúc khi hết giờ
  const [timerStarted, setTimerStarted] = useState(false); // bắt đầu đếm khi người chơi click

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
  useEffect(() => {
    let timer;
    if (timerStarted && !gameOver && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setGameOver(true);
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerStarted, timeLeft, gameOver]);

  const handleClick = (index) => {
    if (hiddenHearts.includes(index) || gameOver) return;

    if (!timerStarted) setTimerStarted(true);

    const flat = heartShape.flat();
    const isHeart = flat[index] === 1;

    setHiddenHearts((prevHidden) => [...prevHidden, index]);

    if (isHeart) {
      setCorrectCount((prevCount) => {
        const newCount = prevCount + 1;
        if (newCount >= 20) {
          setWin(true);
          setGameOver(true); // thắng thì kết thúc luôn
        }
        return newCount;
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {!gameOver ? (
        <Row>
          <Col md={4} className="container mt-4">
            <Row className="text-center">
              <Col md={12}>
                <div className="text-center mb-3">
                  <h4>⏳ Còn lại: {timeLeft} giây</h4>
                </div>
              </Col>
            </Row>
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
          <h1 className="text-center">
            {win
              ? `You win! ${correctCount} điểm`
              : `⏱️ Hết giờ! Bạn được ${correctCount} điểm`}
          </h1>
          <div className="back-love d-flex align-content-center justify-content-center">
            <Link to="/" className="text-decoration-none text">
              Trở về
            </Link>
          </div>
          {win && (
            <div>
              <h1 className="mt-3">Chúc mừng bạn nhận được mã giảm giá</h1>
              <Sell />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
