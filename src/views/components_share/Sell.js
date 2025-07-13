import React, { useState } from "react";

export default function Sell() {
  const randomSell = () => {
    const code = "Maliketh-me" + Date.now();
    const percentages = [10, 15, 20, 25, 30, 40, 50]; // % giảm
    const percent = percentages[Math.floor(Math.random() * percentages.length)];
    return { code, percent };
  };

  localStorage.setItem("sell", JSON.stringify(randomSell()));

  const [ma] = useState(randomSell());

  return (
    <div className="d-flex justify-content-center mt-5 sell">
      <div className="card text-center" style={{ width: "38rem" }}>
        <div className="card-body">
          <h5 className="card-title text-center">Ưu đãi đặc biệt</h5>
          <h6 className="card-subtitle mb-2 text-center txtsell">
            Giảm giá {ma.percent}%
          </h6>
          <p className="card-text text-center ">Mã giảm giá:</p>
          <p className="card-text text-nowrap">
            <strong> {ma.code}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
