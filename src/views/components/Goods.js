import React, { Component } from "react";
import "../../styles/goods.scss";
import hoa from "../../assets/img/chose1.png";
import gifs from "../../assets/img/chosegifs.avif";
import combo from "../../assets/img/combo.png";
import Header from "../components_share/Header";
import { Tab, Tabs, Row, Col } from "react-bootstrap";
import BackTo from "../components_share/BackTo";
import axios from "axios";
import { addToCart } from "./Shopng_cart";
import { motion, AnimatePresence } from "framer-motion";

// Chia nhóm theo hàng
function chunkArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

export default class Goods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultTab: "hoa",
      products: [],
      productGif: [],
      productCombo: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/productList")
      .then((res) => this.setState({ products: res.data.data }))
      .catch((error) => console.error("Lỗi không nhận được sản phẩm:", error));

    axios
      .get("http://localhost:5000/api/ProductListGif")
      .then((res) => this.setState({ productGif: res.data.data }))
      .catch((error) =>
        console.error("Lỗi không nhận được sản phẩm gif:", error)
      );

    axios
      .get("http://localhost:5000/api/ProductListCombo")
      .then((res) => this.setState({ productCombo: res.data.data }))
      .catch((error) =>
        console.error("Lỗi không nhận được sản phẩm combo:", error)
      );
  }

  // Hiệu ứng bay vào giỏ hàng
  handleAddToCartWithFly = (product, event) => {
    const img = event.currentTarget.closest(".card").querySelector("img");
    const cartIcon = document.querySelector(".icon-shoping-cart");

    if (!img || !cartIcon) return;

    const flyImg = img.cloneNode(true);
    flyImg.classList.add("fly-img");

    const imgRect = img.getBoundingClientRect();
    const centerX = imgRect.left + imgRect.width / 2;
    const centerY = imgRect.top + imgRect.height / 2;

    flyImg.style.top = `${centerY}px`;
    flyImg.style.left = `${centerX}px`;

    document.body.appendChild(flyImg);

    const cartRect = cartIcon.getBoundingClientRect();

    requestAnimationFrame(() => {
      flyImg.style.top = `${cartRect.top}px`;
      flyImg.style.left = `${cartRect.left}px`;
      flyImg.style.width = "0px";
      flyImg.style.height = "0px";
      flyImg.style.opacity = "0.2";
      flyImg.style.transform = "scale(1.2)";
    });

    setTimeout(() => {
      flyImg.remove();
    }, 1000);

    addToCart(product);
  };

  render() {
    const { defaultTab, products, productGif, productCombo } = this.state;

    return (
      <div>
        <header>
          <Header />
        </header>

        <div className="container" style={{ marginTop: "100px" }}></div>

        <Tabs
          defaultActiveKey="hoa"
          activeKey={defaultTab}
          onSelect={(k) => this.setState({ defaultTab: k })}
          id="uncontrolled-tab-example"
          className="mb-3 d-flex justify-content-center mt-5"
        >
          {/* Tab hoa */}
          <Tab
            eventKey="hoa"
            title={<img className="menu-card" src={hoa} alt="Hoa" />}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={defaultTab}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                {chunkArray(products, 3).map((group, rowIndex) => (
                  <Row key={rowIndex} className="text-center g-0 px a">
                    {group.map((product, colIndex) => (
                      <Col key={colIndex} md={4}>
                        <div className="card mt-5 mb-5 menu-card border-0">
                          <img
                            src={`/${product.img}`}
                            className="goods-img"
                            alt={product.name_SP || "hoa"}
                          />
                          <div className="card-body text-center">
                            <p className="goods-items">{product.name_SP}</p>
                            <p className="goods-price">
                              Giá: {product.gia_SP}đ
                            </p>
                            <p className="text">{product.mota_SP}</p>
                            <button
                              className="btn btn-danger"
                              onClick={(e) =>
                                this.handleAddToCartWithFly(product, e)
                              }
                            >
                              Thêm vào giỏ hàng
                            </button>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                ))}
              </motion.div>
            </AnimatePresence>
          </Tab>

          {/* Tab gifs */}
          <Tab
            eventKey="gifs"
            title={<img className="menu-card" src={gifs} alt="quà" />}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={defaultTab}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                {chunkArray(productGif, 3).map((group, rowIndex) => (
                  <Row key={rowIndex} className="text-center g-0 px a">
                    {group.map((product, colIndex) => (
                      <Col key={colIndex} md={4}>
                        <div className="card mt-5 mb-5 menu-card border-0">
                          <img
                            src={`/${product.img}`}
                            className="goods-img"
                            alt={product.name_SP || "gif"}
                          />
                          <div className="card-body text-center">
                            <p className="goods-items">{product.name_SP}</p>
                            <p className="goods-price">
                              Giá: {product.gia_SP}đ
                            </p>
                            <p className="text">{product.mota_SP}</p>
                            <button
                              className="btn btn-danger"
                              onClick={(e) =>
                                this.handleAddToCartWithFly(product, e)
                              }
                            >
                              Thêm vào giỏ hàng
                            </button>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                ))}
              </motion.div>
            </AnimatePresence>
          </Tab>

          {/* Tab combo */}
          <Tab
            eventKey="combo"
            title={<img className="menu-card" src={combo} alt="combo" />}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={defaultTab}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                {chunkArray(productCombo, 3).map((group, rowIndex) => (
                  <Row key={rowIndex} className="text-center g-0 px a">
                    {group.map((product, colIndex) => (
                      <Col key={colIndex} md={4}>
                        <div className="card mt-5 mb-5 menu-card border-0">
                          <img
                            src={`/${product.img}`}
                            className="goods-img"
                            alt={product.name_SP || "combo"}
                          />
                          <div className="card-body text-center">
                            <p className="goods-items">{product.name_SP}</p>
                            <p className="goods-price">
                              Giá: {product.gia_SP}đ
                            </p>
                            <p className="text">{product.mota_SP}</p>
                            <button
                              className="btn btn-danger"
                              onClick={(e) =>
                                this.handleAddToCartWithFly(product, e)
                              }
                            >
                              Thêm vào giỏ hàng
                            </button>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                ))}
              </motion.div>
            </AnimatePresence>
          </Tab>
        </Tabs>

        <BackTo />
      </div>
    );
  }
}
