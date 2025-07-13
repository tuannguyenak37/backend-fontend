import React from "react";
import Header from "../components_share/Header";
import ScrollReveal from "../components_share/ScrollReveal";
import Stack from "../components_share/Stack";
import SplitText from "../components_share/SplitText";
import { Col, Row } from "react-bootstrap";
import dichvu from "../../assets/img/dichvu1.jpg";
import dichvu2 from "../../assets/img/dichvu2.jpg";
import dichvu3 from "../../assets/img/dichvu3.jpg";
import dichvu4 from "../../assets/img/dichvu4.jpg";
import Footer from "../components_share/Footer";

export default function About() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
  const images = [
    {
      id: 1,
      img: dichvu,
    },
    {
      id: 2,
      img: dichvu2,
    },
    {
      id: 3,
      img: dichvu3,
    },
    {
      id: 4,
      img: dichvu4,
    },
  ];

  return (
    <div className="container-about container">
      <Header />
      <div className="">
        <Row>
          <Col className="container mt-5 ">
            <div className="about-container mt-5 text-center text-about">
              <SplitText
                text="Flower chúng tôi là ai?"
                className="text-2xl font-semibold text-center "
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
            </div>
          </Col>
        </Row>
        <Row className="container mt-5">
          <Col md={6} className="col-md-6 text-center">
            <div>
              <h1 className="fw-bold text-start text-pabout">
                Người sáng lập và giám đốc điều hành: Nguyễn Thị Vân Khảnh
              </h1>
              <p className="text-start text-pabout">
                Flower là một dự án được hình thành từ sự hợp tác của những
                người trẻ đầy nhiệt huyết, cùng chung đam mê với hoa tươi và
                nghệ thuật tặng quà. Dưới sự kết nối và dẫn dắt của Nguyễn Thị
                Vân Khánh, nhóm đã cùng nhau xây dựng Flower như một không gian
                mang đến những sản phẩm không chỉ đẹp mắt mà còn chứa đựng thông
                điệp yêu thương. Chúng tôi tin rằng mỗi bông hoa, mỗi món quà
                đều là cầu nối cảm xúc, giúp khách hàng gửi gắm tình cảm trong
                những dịp đặc biệt. Với tinh thần làm việc nhóm, sự sáng tạo và
                tận tâm, Flower không ngừng nỗ lực mang đến những trải nghiệm
                tốt nhất cho khách hàng.
              </p>
            </div>
          </Col>
          <Col md={6} className="col-md-6 text-center">
            <Stack
              randomRotation={true}
              sensitivity={180}
              sendToBackOnClick={false}
              cardDimensions={{ width: 500, height: 300 }}
              cardsData={images}
            />
          </Col>
        </Row>
        <Row className="container mt-5 ">
          
        </Row>
      </div>

      <div className="">
        <Row className="container mt-5 g-4">
          <Col md={3}>
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 text-center custom-hover">
              <div style={{ fontSize: "1.8rem" }}>🌸</div>
              <ScrollReveal
                tagName="div"
                innerTagName="p"
                containerClassName=""
                textClassName="fs-6 text-secondary fw-medium"
                baseOpacity={0}
                baseRotation={2}
                enableBlur={true}
                blurStrength={5}
              >
                🌸Chúng tôi không chỉ bán hoa, mà còn truyền cảm xúc yêu thương
                qua từng món quà.
              </ScrollReveal>
            </div>
          </Col>

          <Col md={3}>
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 text-center custom-hover">
              <div style={{ fontSize: "1.8rem" }}>🌸</div>
              <ScrollReveal
                tagName="div"
                innerTagName="p"
                containerClassName=""
                textClassName="fs-6 text-secondary fw-medium"
                baseOpacity={0}
                baseRotation={2}
                enableBlur={true}
                blurStrength={5}
              >
                💌 Không cần lời nói – chỉ cần một bó hoa đúng lúc là đủ để lay
                động trái tim.
              </ScrollReveal>
            </div>
          </Col>
          <Col md={3}>
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 text-center custom-hover">
              <div style={{ fontSize: "1.8rem" }}>🌸</div>
              <ScrollReveal
                tagName="div"
                innerTagName="p"
                containerClassName=""
                textClassName="fs-6 text-secondary fw-medium"
                baseOpacity={0}
                baseRotation={2}
                enableBlur={true}
                blurStrength={5}
              >
                ⏱️ Từ hoa sinh nhật đến lời xin lỗi, chúng tôi luôn là người
                đồng hành trong mọi cung bậc cảm xúc.
              </ScrollReveal>
            </div>
          </Col>
          <Col md={3}>
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 text-center custom-hover">
              <div style={{ fontSize: "1.8rem" }}>🌸</div>
              <ScrollReveal
                tagName="div"
                innerTagName="p"
                containerClassName=""
                textClassName="fs-6 text-secondary fw-medium"
                baseOpacity={0}
                baseRotation={2}
                enableBlur={true}
                blurStrength={5}
              >
                🛍️ Chúng tôi kết nối trái tim bằng những điều giản dị và đẹp đẽ
                nhất.
              </ScrollReveal>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Row className="container mt-5">
          <Col md={6} className="col-md-6 text-center"></Col>
          <Col>
            <div className="map-container text-center mt-4">
              <h5 className="fw-bold mb-3">Tìm chúng tôi trên bản đồ</h5>
              <iframe
                title="Bản đồ Đại học Bình Dương"
                src="https://www.google.com/maps?q=10.973469,106.672145&hl=vi&z=16&output=embed"
                width="100%"
                height="350"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Col>
        </Row>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
}
