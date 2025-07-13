import { useEffect, useRef, useState } from "react";
import thohoa from "../../assets/img/thohoa.jpg";
import thohoa1 from "../../assets/img/thohoa1.jpg";
import thohoa2 from "../../assets/img/thohoa2.jpg";
import thohoa3 from "../../assets/img/thohoa3.jpg";
import thohoa4 from "../../assets/img/thohoa4.jpg";
import thohoa5 from "../../assets/img/thohoa5.jpg";
import thohoa6 from "../../assets/img/thohoa6.jpg";

import thohoa8 from "../../assets/img/thohoa8.jpg";

import thohoa10 from "../../assets/img/thohoa10.jpg";
import thohoa11 from "../../assets/img/thohoa11.jpg";

import SplitText from "../components_share/SplitText";

import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "framer-motion";
import "../../styles/Contact.scss";
import { Col, Row } from "react-bootstrap";

const IMGS = [
  thohoa,
  thohoa1,
  thohoa2,
  thohoa3,
  thohoa4,
  thohoa5,
  thohoa6,
  thohoa8,
  thohoa10,
  thohoa11,
];

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

const RollingGallery = ({
  autoplay = false,
  pauseOnHover = false,
  images = [],
}) => {
  images = IMGS;
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(
    window.innerWidth <= 640
  );

  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = images.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.5;
  const dragFactor = 0.05;
  const radius = cylinderWidth / (2 * Math.PI);

  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const autoplayRef = useRef();

  const handleDrag = (_, info) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20,
        mass: 0.1,
        ease: "easeOut",
      },
    });
  };

  const transform = useTransform(rotation, (value) => {
    return `rotate3d(0, 1, 0, ${value}deg)`;
  });

  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        controls.start({
          rotateY: rotation.get() - 360 / faceCount,
          transition: { duration: 2, ease: "linear" },
        });
        rotation.set(rotation.get() - 360 / faceCount);
      }, 2000);

      return () => clearInterval(autoplayRef.current);
    }
  }, [autoplay, rotation, controls, faceCount]);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSizeSm(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      clearInterval(autoplayRef.current);
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      controls.start({
        rotateY: rotation.get() - 360 / faceCount,
        transition: { duration: 2, ease: "linear" },
      });
      rotation.set(rotation.get() - 360 / faceCount);

      autoplayRef.current = setInterval(() => {
        controls.start({
          rotateY: rotation.get() - 360 / faceCount,
          transition: { duration: 2, ease: "linear" },
        });
        rotation.set(rotation.get() - 360 / faceCount);
      }, 2000);
    }
  };

  return (
    <div className="gallery-container">
      <div className="gallery-gradient gallery-gradient-left"></div>
      <Row>
        <Col className="text-center mt-0 font-contact">
          <SplitText
            text="của hàng hoa FLOWER!"
            className="text-2xl font-semibold text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="gallery-gradient gallery-gradient-right"></div>
          <div className="gallery-content">
            <motion.div
              drag="x"
              className="gallery-track"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: transform,
                rotateY: rotation,
                width: cylinderWidth,
                transformStyle: "preserve-3d",
              }}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              animate={controls}
            >
              {images.map((url, i) => (
                <div
                  key={i}
                  className="gallery-item"
                  style={{
                    width: `${faceWidth}px`,
                    transform: `rotateY(${
                      i * (360 / faceCount)
                    }deg) translateZ(${radius}px)`,
                  }}
                >
                  <img src={url} alt="gallery" className="gallery-img" />
                </div>
              ))}
            </motion.div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RollingGallery;
