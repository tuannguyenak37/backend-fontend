import React from "react";
import { Col, Row } from "react-bootstrap";
import thoImg from "../../assets/img/tho.webp"; // ảnh mặc định
import { useNavigate } from "react-router-dom"; // ✅ Bổ sung dòng này
export default function Letter() {
  const navigate = useNavigate(); // ✅ Khai báo navigate
  const [name, setName] = React.useState("");
  const [nameTo, setNameTo] = React.useState("");
  const [conten, setConten] = React.useState("");
  const [img, setImg] = React.useState(thoImg);
  const [imgLoaded, setImgLoaded] = React.useState(true); // trạng thái ảnh đã sẵn sàng

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
    if (file && file.type.startsWith("image/")) {
      try {
        const base64 = await fileToBase64(file);
        const imgTest = new Image();
        imgTest.src = base64;
        imgTest.onload = () => {
          setImg(base64);
          setImgLoaded(true);
        };
        imgTest.onerror = () => {
          console.error("Không thể load ảnh tải lên");
          setImgLoaded(false);
        };
      } catch (error) {
        console.error("Lỗi chuyển file sang base64:", error);
      }
    } else {
      alert("Vui lòng chọn đúng định dạng ảnh!");
    }
  };

  // const handleExportPDF = async () => {
  //   if (!letterRef.current) return;

  //   // Đợi ảnh load
  //   const imgElements = letterRef.current.querySelectorAll("img");
  //   await Promise.all(
  //     Array.from(imgElements).map((img) => {
  //       if (img.complete && img.naturalWidth !== 0) return Promise.resolve();
  //       return new Promise((resolve, reject) => {
  //         img.onload = resolve;
  //         img.onerror = () => {
  //           console.error("Không thể load ảnh:", img.src);
  //           reject("Ảnh không load được");
  //         };
  //       });
  //     })
  //   );

  //   // Đợi DOM render ổn định
  //   await new Promise((r) => setTimeout(r, 300));

  //   html2canvas(letterRef.current, {
  //     scale: 2,
  //     useCORS: true,
  //     allowTaint: true,
  //   })
  //     .then((canvas) => {
  //       const imgData = canvas.toDataURL("image/png");

  //       if (!imgData.startsWith("data:image")) {
  //         throw new Error("Dữ liệu ảnh không hợp lệ");
  //       }

  //       const pdf = new jsPDF({
  //         orientation: "portrait",
  //         unit: "mm",
  //         format: "a4",
  //       });

  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = pdf.internal.pageSize.getHeight();

  //       let imgWidth = pdfWidth * 0.9;
  //       let imgHeight = (canvas.height * imgWidth) / canvas.width;

  //       if (imgHeight > pdfHeight * 0.9) {
  //         imgHeight = pdfHeight * 0.9;
  //         imgWidth = (canvas.width * imgHeight) / canvas.height;
  //       }

  //       const x = (pdfWidth - imgWidth) / 2;
  //       const y = (pdfHeight - imgHeight) / 2;

  //       pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
  //       pdf.save("thu-cua-toi.pdf");
  //     })
  //     .catch((err) => {
  //       console.error("Lỗi khi tạo PDF:", err?.message || err);
  //       alert("Không thể tạo PDF: " + (err?.message || err));
  //     });
  // };

  return (
    <div className="container text-center my-5">
      <div className="card border-2 border-custom shadow-lg" ref={letterRef}>
        <div className="card-body letter">
          <h2 className="card-title">Gửi người thương của tôi 💕</h2>

          <Row>
            <Col md={5}>
              <p className="card-text text-start">
                <strong>Người gửi:</strong>
                <input
                  type="text"
                  className="input-content-letter"
                  placeholder="Tên của bạn"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </p>

              <p className="card-text text-end">
                <strong>Người nhận:</strong>
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
                <img
                  src={img}
                  alt="Hình ảnh minh họa"
                  className="img-fluid"
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgLoaded(false)}
                />
              </div>
            </Col>
          </Row>

          <p className="card-text text-start">
            <strong>Nội dung:</strong>
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
          onClick={() => navigate("/")}
        >
          Lưu thư 💕
        </button>
      </Col>
    </div>
  );
}
