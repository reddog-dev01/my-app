import React, { useState, useEffect } from "react";
import "./Ungthugan.scss";
const Ungthugan = ({ results }) => {
  const [trig, setTriglycerides] = useState(null);
  const [hdlc, setHDLC] = useState(null);
  const [tuoiV2, setTuoiV2] = useState(null);
  const [bmi, setBMI] = useState(null);
  const [nhiemMo, setNhiemmo] = useState(null);
  const [doNhiemmo, setDonhiemmo] = useState(null);
  const [CAP, setCAP] = useState(null);
  const [chuyenHoa, setChuyenhoa] = useState(null);
  const [tieuDuong, setTieuduong] = useState(null);
  const [AFP, setAFP] = useState(null);
  const [HBV, setHBV] = useState(null);
  const [HCV, setHCV] = useState(null);
  const [sinThiet, setSinhthiet] = useState(null);
  useEffect(() => {
    if (results && results.length > 0) {
      setTriglycerides(results[0].triglyceride_v2);
      setChuyenhoa(results[0].trieu_chung_chuyen_hoa_v2);
      setHDLC(results[0].hdlc_v2);
      const age = results[0].tuoi_v2;
      const height = results[0].cao_v2;
      const weight = results[0].can_nang_v2;
      setTuoiV2(age);
      setBMI(weight / ((height * height) / 10000));
      setDonhiemmo(results[0].do_nhiem_mo);
      setNhiemmo(results[0].gan_nhiem_mo);
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
      setAFP(null);
      setHCV(null);
      setHBV(null);
      setSinhthiet(null);
    }
  }, [results]);
  return (
    <section>
      <div className="container">
        <div className="box">
          <h2>1. Xét nghiệm</h2>

          {AFP === null ? (
            <div>Loading...</div>
          ) : (
            <div className="level-red">HCC</div>
          )}
          <div className="row">
            <div className="list-item red">
              <b>AFP: </b> {AFP !== null ? AFP : "chưa có dữ liệu"} <a>ng/ml</a>
            </div>
            <div className="list-item black">
              <b>HBV: </b> {HBV !== null ? HBV : "chưa có dữ liệu"}
            </div>
            <div className="list-item red">
              <b>HCV: </b> {HCV !== null ? HCV : "chưa có dữ liệu"}
            </div>
          </div>
        </div>
        <div className="box">
          <h2>2. Kết quả sinh thiết</h2>

          {sinThiet === null ? (
            <div>Loading...</div>
          ) : (
            <div className="level-blue">KHÔNG</div>
          )}
        </div>
      </div>
      <div className="note">
        <div className="row-note">
          <div className="item-container">
            <div className="item">
              <b>APRI:</b> 26
            </div>
            <i>Bình thường/An toàn</i>
          </div>
          <div className="item-container">
            <div className="item">
              <b>APRI:</b> <b className="blue">26</b>
            </div>
            <i>Dưới ngưỡng</i>
          </div>
          <div className="item-container">
            <div className="item">
              <b>APRI:</b> <b className="red">26</b>
            </div>
            <i>Vượt ngưỡng/Nguy hiểm</i>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Ungthugan;
