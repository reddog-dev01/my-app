import React, { useState, useEffect } from "react";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import "./Gannhiemmo.scss";
import Popup from "../../components/Popup";

const GanNhiemMo = ({ results }) => {
  const [trig, setTriglycerides] = useState(null);
  const [hdlc, setHDLC] = useState(null);
  const [tuoiV2, setTuoiV2] = useState(null);
  const [bmi, setBMI] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [nhiemMo, setNhiemmo] = useState(null);
  const [doNhiemmo, setDonhiemmo] = useState(null);
  const [CAP, setCAP] = useState(null);
  const [chuyenHoa, setChuyenhoa] = useState(null);
  const [tieuDuong, setTieuduong] = useState(null);
  useEffect(() => {
    if (results && results.length > 0) {
      setTriglycerides(results[0].triglyceride_v2);
      setChuyenhoa(results[0].trieu_chung_chuyen_hoa_v2);
      setHDLC(results[0].hdlc_v2);
      const age = results[0].tuoi_v2;
      const height = results[0].chieu_cao_v2;
      const weight = results[0].cannang_v2;
      setTuoiV2(age);
      if (height && weight) {
        const heightInMeters = height / 100; // Convert height to meters
        setBMI(weight / (heightInMeters * heightInMeters)); // BMI calculation
      } else {
        setBMI(null); // Reset BMI if height or weight is invalid
      }
      setDonhiemmo(results[0].do_nhiem_mo);
      setNhiemmo(results[0].gan_nhiem_mo);
      setTieuduong(parseInt(results[0].tieu_duong) || 0);
    } else {
      setTriglycerides(null);
      setHDLC(null);
      setTuoiV2(null);
      setBMI(null);
      setDonhiemmo(null);
      setNhiemmo(null);
      setCAP(null);
      setChuyenhoa(null);
      setTieuduong(null);
    }
  }, [results]);

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <section>
      <div className="container">
        <div className="box">
          <h2>1. Kết quả siêu âm</h2>
          {CAP === null ? (
            <div>Loading...</div>
          ) : (
            <div className="level-orange">S2</div>
          )}

          <div className="column">
            <div className="list-item red">
              <b>Gan nhiễm mỡ:</b>{" "}
              {nhiemMo !== null ? nhiemMo : "chưa có dữ liệu"}
            </div>
            <div className="list-item red">
              <b>Độ nhiễm mỡ:</b>{" "}
              {doNhiemmo !== null ? doNhiemmo : "chưa có dữ liệu"}
            </div>
            <div className="list-item green">
              <b>CAP:</b> {CAP !== null ? CAP : "chưa có dữ liệu"}
            </div>
          </div>
        </div>
        <div className="box">
          <h2>2. MAFLD</h2>
          {bmi === null ? (
            <div>Loading...</div>
          ) : bmi > 23 ? (
            <div className="level-red" onClick={handlePopup}>
              CÓ
            </div>
          ) : (
            <div className="level-red">KHÔNG</div>
          )}
          <div className="row">
            <div className="list-item black">
              <b>BMI: </b> {bmi !== null ? `${bmi.toFixed(2)}` : ""} kg/m2
            </div>
            <div className="list-item black">
              <b>HDL-C: </b> {hdlc !== null ? hdlc : "chưa có dữ liệu"} mmol/l
            </div>
          </div>
          <div className="row">
            <div className="list-item blue">
              <b>Triglycerides: </b> {trig !== null ? trig : "chưa có dữ liệu"}{" "}
              mmol/l
            </div>
          </div>
          <div className="row">
            <div className="list-item black">
              <b>Chuyển hóa: </b>{" "}
              {chuyenHoa !== chuyenHoa ? trig : "chưa có dữ liệu"}
            </div>
            <div className="list-item red">
              <b>Tiểu đường: </b>
              {tieuDuong !== null
                ? tieuDuong === 0
                  ? "Không"
                  : "Có"
                : "chưa có dữ liệu"}
            </div>
          </div>
        </div>
      </div>
      <div className="note">
        <div className="row-note">
          <div className="item-container">
            <div className="item">
              <b className="green">26</b>
            </div>
            <i>Mức bình thường/An toàn</i>
          </div>
          <div className="item-container">
            <div className="item">
              <b className="yellow">S1</b>
            </div>
            <i>Mức nhẹ</i>
          </div>
          <div className="item-container">
            <div className="item">
              <b className="orange">S2</b>
            </div>
            <i>Mức nhẹ</i>
          </div>
          <div className="item-container">
            <div className="item">
              <b className="red">S3</b>
            </div>
            <i>Mức nhiều</i>
          </div>
        </div>
        <div className="row-note">
          <div className="item-container">
            <div className="item">
              <b>BMI: 22</b>
            </div>
            <i>Bình thường</i>
          </div>
          <div className="item-container">
            <div className="item">
              <b>
                BMI: <b className="blue">26</b>
              </b>
            </div>
            <i>Dưới ngưỡng</i>
          </div>
          <div className="item-container">
            <div className="item">
              <b>
                BMI: <b className="red">26</b>
              </b>
            </div>
            <i>Vượt ngưỡng/Nguy hiểm</i>
          </div>
        </div>
      </div>
      {showPopup && (
        <Popup show={showPopup} handleClose={handlePopup}>
          {/* <button type="button" onClick={handlePopup}>
            Đóng
          </button> */}
        </Popup>
      )}
    </section>
  );
};

export default GanNhiemMo;
