import React from "react";
import "./Popup.scss";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

const Popup = ({ handleClose, show, children }) => {
  const showHideClassName = show
    ? "modal-popup display-block"
    : "modal-popup display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main-popup">
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
        <h2>Bảng tính MAFLD</h2>
        <div className="box1">
          <h3>Gan nhiễm mỡ ở người lớn</h3>
          <p>
            được phát hiện bằng kĩ thuật hình ảnh, dấu ấn/điểm số sinh học trong
            máu hoặc bằng mô học gan
          </p>
        </div>
        <div className="container-popup-arrow">
          <div className="arrow arrow1"></div>
          <div className="arrow arrow2"></div>
          <div className="arrow arrow3"></div>
        </div>

        <div className="container-popup-box">
          <div className="box2">
            <h3>Thừa cân hoặc béo phì</h3>
            <p>
              BMI &ge; 23kg/m² với người châu Á và BMI &ge; 25kg/m² với người da
              trắng
            </p>
          </div>
          <div className="box3">
            <h3>Cân nặng nạc/bình thường</h3>
            <p>
              BMI &lt; 23kg/m² với người châu Á và BMI &lt; 25kg/m² với người da
              trắng
            </p>
          </div>
          <div className="box4">
            <h3>Đái tháo đường tuýp 2</h3>
            <p>theo tiêu chuẩn quốc tế</p>
          </div>
        </div>
        <div className="arrow arrow4"></div>

        <div className="box-arrow-container">
          <div className="arrow arrow6"></div>
          <div className="box5">
            <h3>Nếu có ít nhất hai bất thường về nguy cơ chuyển hóa</h3>
            <p>
              - Vòng eo &ge;102/88cm ở nam/nữ da trắng hoặc &ge;90/80cm ở nam/nữ
              châu Á<br></br>- Huyết áp &ge;130/85mmHg hoặc điều trị bằng thuốc
              cụ thể <br></br>-Triglyceride huyết tương
              &ge;150mg/dl(&ge;1.70mmol/L) hoặc điều trị bằng thuốc cụ thể
              <br></br>- DHL-cholesterol huyết tương &lt;40mg/dl (&lt;1.0mmol/L)
              đối với nam và &lt;50mg/dl (&lt;1.3mmol/L) đối với nữ hoặc điều
              trị bằng thuốc cụ thể
              <br></br>- Tiền tiểu đường (tức là mức đường huyết lúc đói 100 đến
              125mg/dl [5.6 đến 6.9 mmol/L], hoặc mức đường huyết sau 2h ăn 140
              đến 199mg/dl [7.8 đến 11.0 mmol] hoặc HbA1c 5.7% đến 6.4% [39 đến
              47 mmol/mol])
              <br></br>- Đánh giá mô hình cân bằng nội môi về điểm kháng insulin
              &gt;2.5
              <br></br>- Nồng độ protein phản ứng C có độ nhạy cao trong huyết
              tương &gt;2mg/L
            </p>
          </div>
          <div className="arrow arrow8"></div>
        </div>

        <div className="arrow arrow5"></div>
        <div className="box6">
          <h3>MAFLD</h3>
          <p>bệnh gan nhiễm mỡ liên quan đến rối loạn chuyển hóa</p>
        </div>
      </section>
    </div>
  );
};

export default Popup;
