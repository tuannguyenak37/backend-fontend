import React, { useEffect, useState } from "react";
import len from "../../assets/img/len.svg";

export default function BackTo() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          border: "none",
          borderRadius: "50%",
          width: "45px",
          height: "45px",
          fontSize: "18px",
          backgroundColor: "#ff6b6b",
          color: "#fff",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        }}
      >
        <img
          src={len}
          alt="Back to top"
          style={{
            width: "30px",
            height: "30px",
            animation: "bounceUpDown 1s infinite",
          }}
        ></img>
      </button>
    )
  );
}
