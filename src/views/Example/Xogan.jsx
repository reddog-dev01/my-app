import React, { useState, useEffect } from "react";
import "./Xogan.scss";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

const MathFormula = ({ formula }) => {
  return <BlockMath math={formula} />;
};

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

const Xogan = ({ results }) => {
  const [showFormula, setShowFormula] = useState(false);
  const [formulaType, setFormulaType] = useState("");
  const [nfs, setNfs] = useState(null);
  const [bard, setBard] = useState(null);
  const [astAlt, setAstAlt] = useState(null);
  const [apri, setApri] = useState(null);
  const [albumin, setAlbumin] = useState(null);
  const [inr, setINR] = useState(null);
  const [fib4, setFib4] = useState(null);
  const [astV2, setAstV2] = useState(null);
  const [tuoiV2, setTuoiV2] = useState(null);
  const [altV2, setAltV2] = useState(null);
  const [bmi, setBMI] = useState(null);
  const [bilirubinV2, setBilirubin] = useState(null);
  const [childPugh, setChildPugh] = useState(null);
  const [tieuCau, setTieucau] = useState(null);
  const [coTruong, setCotruong] = useState(null);
  const [benhNaoGan, setBenhnaogan] = useState(null);
  const [median, setMedian] = useState(null);
  const [IQRMed, setIQRMed] = useState(null);
  const [CAP, setCAP] = useState(null);
  const [khoangCua, setKhoangcua] = useState(null);
  const [tieuThuy, setTieuthuy] = useState(null);
  const [giaidoanXogan, setgdXogan] = useState(null);
  const [gender, setGender] = useState(null);
  const [tieuDuong, setTieuduong] = useState(null);
  useEffect(() => {
    if (results.length > 0) {
      const result = results[0];

      setAlbumin(result.albumin_v2 / 10);
      setINR(result.inr_v2);
      setBilirubin(result.bil_toan_phan_v2);
      setgdXogan(result.xo_gan_level_v2);
      const ast = result.ast_v2;
      const age = result.tuoi_v2;
      const alt = result.alt_v2;
      const height = result.chieu_cao_v2;
      const weight = result.cannang_v2;
      const tieuCau = result.tieu_cau_v2;
      setTieuduong(parseInt(result.tieu_duong) || 0);
      setBenhnaogan(parseInt(result.benh_nao_gan) || 0);
      setCotruong(parseInt(result.co_truong) || 0);
      setGender(result.gioi_tinh_v2);
      setAstV2(ast);
      setTieucau(tieuCau);
      setTuoiV2(age);
      setAltV2(alt);

      if (height && weight) {
        const heightInMeters = height / 100;
        setBMI(weight / (heightInMeters * heightInMeters));
      }

      if (ast) {
        const upperLimit = gender === "Nữ" ? 35 : 40;
        setApri((ast / upperLimit / tieuCau) * 100);
      } else {
        setApri(null);
      }
      if (ast && alt) {
        setAstAlt((ast / alt).toFixed(4));
      } else {
        setAstAlt(null);
      }
      if (age && ast && alt) {
        setFib4(((age * ast) / (tieuCau * Math.sqrt(alt))).toFixed(4));
      } else {
        setFib4(null);
      }
      if (age && weight && height && tieuDuong !== null && albumin) {
        setNfs(
          -1.675 +
            0.037 * age +
            (0.094 * weight) / ((height * height) / 10000) +
            1.13 * tieuDuong +
            0.99 * (ast / alt) -
            0.013 * tieuCau -
            0.66 * albumin
        );
      } else {
        setNfs(null);
      }
      const bmiScore = bmi >= 28 ? 1 : 0;
      const astAltScore = ast / alt >= 0.8 ? 2 : 0;
      setBard(bmiScore + astAltScore + tieuDuong);

      // tính childpugh
      const albuminScore =
        albumin > 3.5 ? 1 : albumin >= 2.8 && albumin <= 3.5 ? 2 : 3;
      const inrScore = inr < 1.7 ? 1 : inr <= 2.3 ? 2 : 3;
      const bilirubinScore = bilirubinV2 < 1 ? 1 : bilirubinV2 <= 3 ? 2 : 3;
      const childPughScore = albuminScore + inrScore + bilirubinScore;
      setChildPugh(childPughScore);
    } else {
      setBenhnaogan(null);
      setCotruong(null);
      setNfs(null);
      setBard(null);
      setApri(null);
      setAlbumin(null);
      setINR(null);
      setAstV2(null);
      setTuoiV2(null);
      setAltV2(null);
      setBMI(null);
      setChildPugh(null);
      setTieucau(null);
      setCAP(null);
      setMedian(null);
      setIQRMed(null);
      setKhoangcua(null);
      setTieuthuy(null);
      setgdXogan(null);
    }
  }, [results]);

  const handleToggleFormula = (type) => {
    setFormulaType(type);
    setShowFormula(true);
  };

  const formulas = {
    APRI: `\\text{APRI} =\\left( \\frac{\\text{AST}}{\\text{giới hạn trên mức bình thường(nam/nữ=40/35)}} \\right) \\times \\left( \\frac{100}{\\text{số lượng tiểu cầu}} \\right) \\\\= \\left( \\frac{${astV2}}{${
      gender === "Nữ" ? 35 : 40
    }} \\right) \\times \\left( \\frac{100}{${tieuCau}} \\right)`,
    FIB4: `\\text{FIB-4} = \\frac{\\text{tuổi} \\times \\text{AST}}{\\text{số lượng tiểu cầu} \\times \\sqrt{\\text{ALT}}} = \\frac{${tuoiV2} \\times ${astV2}}{${tieuCau} \\times \\sqrt{${altV2}}}`,
    NFS: `\\text{NFS} = -1.675 + 0.037 \\times \\text{tuổi} + 0.094 \\times \\text{BMI} + 1.13 \\times \\text{tiểu đường} 
    \\\\+ 0.99 \\times \\frac{\\text{AST}}{\\text{ALT}} - 0.013 \\times \\text{số lượng tiểu cầu} - 0.66 \\times \\text{Albumin}
    \\\\=-1.675 + 0.037 \\times ${tuoiV2} + 0.094 \\times ${bmi} \\ + 1.13 \\times ${tieuDuong} \\\\+ 0.99 \\times \\frac{${astV2}}{${altV2}} \\ - 0.013 \\times ${tieuCau} - 0.66 \\times ${albumin}`,
    BARD: `\\text{BARD} = \\left( \\text{BMI} \\geq 28 \\text{ = 1đ} \\right) + \\left( \\frac{\\text{AST}}{\\text{ALT}} \\geq 0.8 \\text{ = 2đ} \\right) + \\left( \\text{Tiểu đường = 1đ} \\right)
    \\\\=\\left(\\text{BMI} = ${bmi}\\right) + \\left(\\frac{\\text{AST}}{\\text{ALT}} = \\frac{${astV2}}{${altV2}}\\right) + \\left(\\text{Tiểu đường = ${
      tieuDuong === 1 ? "1 point" : "0 point"
    }}\\right)`,
    ChildPugh: `\\text{ChildPugh} = \\begin{cases} 4 < A(100\\%) < 7 \\\\6 < B(85\\%) < 10 \\\\9 < C(45\\%) < 16\\end{cases}
    \\\\=\\begin{array}{|c|c|c|c|} \\hline \\textbf{Tham số} & \\textbf{1 điểm} & \\textbf{2 điểm} & \\textbf{3 điểm} \\\\ \\hline Cổ trướng & Không & Ít & Vừa/nhiều \\\\ \\hline Bilirubin (mg/dL) & \\leq 2 & 1 - 3 & > 3 \\\\ \\hline Bệnh não gan & Không & Độ 1-2 & Độ 3-4 \\\\
     \\hline Albumin (gm/L) & > 3.5 & 2.8 - 3.5 & < 2.8 \\\\ \\hline INR & < 1.7 & 1.8 - 2.3 & > 2.3 \\\\ \\hline \\end{array}`,
  };

  return (
    <section>
      <div className="container">
        <div className="box">
          <h2>1. Năm chỉ số phi xâm lấn</h2>
          <div className="row">
            <div
              className="list-item black"
              onClick={() => handleToggleFormula("APRI")}
            >
              <b>APRI:</b> {apri !== null ? `${apri.toFixed(3)}` : ""}
            </div>
            <div className="list-item blue">
              <b>AST/ALT:</b> {astAlt !== null ? `${astAlt}` : ""}
            </div>
            <div
              className="list-item red"
              onClick={() => handleToggleFormula("FIB4")}
            >
              <b>FIB-4:</b> {fib4 !== null ? `${fib4}` : "chưa có dữ liệu"}
            </div>
          </div>
          <div className="row">
            <div
              className="list-item blue"
              onClick={() => handleToggleFormula("NFS")}
            >
              <b>NFS:</b>{" "}
              {nfs !== null ? `${nfs.toFixed(3)}` : "chưa có dữ liệu"}
            </div>
            <div
              className="list-item red"
              onClick={() => handleToggleFormula("BARD")}
            >
              <b>BARD:</b> {bard !== null ? bard : ""}
            </div>
          </div>
        </div>
        <div className="box">
          <h2>2. Kết quả siêu âm</h2>
          <div className="column">
            <div className="list-item black">
              <b>Median:</b> {median !== null ? median : "chưa có dữ liệu"}
            </div>
            <div className="list-item black">
              <b>IQR/Med:</b> {IQRMed !== null ? IQRMed : "chưa có dữ liệu"}
            </div>
            <div className="list-item blue">
              <b>CAP:</b> {CAP !== null ? CAP : "chưa có dữ liệu"}
            </div>
          </div>
          <div className="large-text">
            {median === null ? (
              <div>Loading...</div>
            ) : (
              <div className="large-text">F1</div>
            )}
          </div>
        </div>
        <div className="box">
          <h2>3. Thang đo Child-Pugh</h2>
          <div className="row">
            <div className="list-item">
              <b>Cổ trướng:</b>{" "}
              {coTruong !== null
                ? coTruong === 0
                  ? "Không"
                  : coTruong === 1
                  ? "Ít"
                  : "Vừa/nhiều"
                : "chưa có dữ liệu"}
            </div>
            <div className="list-item">
              <b>Albumin:</b> {albumin !== null ? albumin : "chưa có dữ liệu"}
            </div>
            <div className="list-item">
              <b>INR:</b> {inr !== null ? inr : "chưa có dữ liệu"}
            </div>
          </div>
          <div className="row">
            <div className="list-item">
              <b>Bệnh não gan:</b>

              {benhNaoGan !== null
                ? benhNaoGan === 0
                  ? "Không"
                  : benhNaoGan === 1
                  ? "Độ 1-2"
                  : "Độ 3-4"
                : "chưa có dữ liệu"}
            </div>
            <div className="list-item red">
              <b>Bilirubin:</b> {bilirubinV2 !== null ? bilirubinV2 : ""}
            </div>
          </div>
          {childPugh !== null && (
            <div
              className="large-text"
              onClick={() => handleToggleFormula("ChildPugh")}
            >
              {childPugh > 4 && childPugh < 7 && <div className="green">A</div>}
              {childPugh >= 7 && childPugh < 10 && (
                <div className="yellow">B</div>
              )}
              {childPugh >= 10 && childPugh < 16 && (
                <div className="red">C</div>
              )}
            </div>
          )}
        </div>
        <div className="box">
          <h2>4. Kết quả sinh thiết</h2>
          <div className="column">
            <div className="list-item">
              <b>Khoảng cửa:</b>{" "}
              {khoangCua !== null ? khoangCua : "chưa có dữ liệu"}
            </div>
            <div className="list-item red">
              <b>Tiểu thùy:</b>{" "}
              {tieuThuy !== null ? tieuThuy : "chưa có dữ liệu"}
            </div>
            <div className="list-item red">
              <b>Giai đoạn Xơ gan:</b>{" "}
              {giaidoanXogan !== null ? giaidoanXogan : "chưa có dữ liệu"}
            </div>
          </div>
          <div className="large-text red">
            {khoangCua === null ? (
              <div>Loading...</div>
            ) : (
              <div className="large-text red">F4</div>
            )}
          </div>
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
      <Modal show={showFormula} onClose={() => setShowFormula(false)}>
        <MathFormula formula={formulas[formulaType]} />
      </Modal>
    </section>
  );
};

export default Xogan;
