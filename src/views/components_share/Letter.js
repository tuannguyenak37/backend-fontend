import React from "react";
import { Col, Row } from "react-bootstrap";
import thoImg from "../../assets/img/tho.webp"; // ảnh mặc định
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function Letter() {
  const [name, setName] = React.useState("");
  const [nameTo, setNameTo] = React.useState("");
  const [conten, setConten] = React.useState("");
  const [img, setImg] = React.useState(thoImg);

  const letterRef = React.useRef(null);

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleImgChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setImg(base64);
      } catch (error) {
        console.error("Lỗi chuyển file sang base64:", error);
      }
    }
  };

  const handleExportPDF = async () => {
    if (!letterRef.current) return;

    await new Promise((r) => setTimeout(r, 300)); // Đợi render ổn định

    html2canvas(letterRef.current, {
      scale: window.devicePixelRatio,
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Tính kích thước hình ảnh trong PDF, giữ tỉ lệ
        let imgWidth = pdfWidth * 0.9;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Nếu cao hơn chiều cao trang, giảm kích thước
        if (imgHeight > pdfHeight * 0.9) {
          imgHeight = pdfHeight * 0.9;
          imgWidth = (canvas.width * imgHeight) / canvas.height;
        }

        // Căn giữa
        const x = Math.max((pdfWidth - imgWidth) / 2, 0);
        const y = Math.max((pdfHeight - imgHeight) / 2, 0);

        pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
        pdf.save("thu-cua-toi.pdf");
      })
      .catch((err) => {
        console.error("Lỗi khi tạo PDF:", err);
      });
  };

  return (
    <div className="container text-center my-5">
      <div className="card border-2 boder-comstom shadow-lg" ref={letterRef}>
        <div className="card-body letter">
          <h2 className="card-title">Gửi người thương của tôi 💕</h2>

          <Row>
            <Col md={5}>
              <p className="card-text text-start">
                <strong> Người gửi: {name}</strong>
                <input
                  type="text"
                  className="input-content-letter"
                  placeholder="Tên của bạn"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </p>

              <p className="card-text text-end">
                <strong> Người nhận: {nameTo}</strong>
                <input
                  type="text"
                  className="input-content-letter"
                  placeholder="Người nhận"
                  value={nameTo}
                  onChange={(e) => setNameTo(e.target.value)}
                />
              </p>
            </Col>
            <Col>
              <div className="mt-3 avatar-letter rounded-circle">
                <img src={img} alt="Hình ảnh minh họa" className="img-fluid" />
              </div>
            </Col>
          </Row>

          <p className="card-text text-start">
            <strong> Nội dung:</strong>
          </p>
          <p className="card-text text-content-letter text-start">
            &nbsp; "{conten}"
          </p>
          <input
            type="text"
            placeholder="Nội dung"
            className="input-content-letter"
            value={conten}
            onChange={(e) => setConten(e.target.value)}
          />
        </div>
      </div>

      <Col className="text-center mt-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleImgChange}
          style={{ display: "none" }}
          id="customFile"
        />
        <label htmlFor="customFile" className="btn btn-primary btn-letter">
          Chọn hình ảnh
        </label>

        <button
          className="btn btn-danger btn-letter m-2"
          onClick={handleExportPDF}
        >
          Lưu thư 💕
        </button>
      </Col>
    </div>
  );
}
