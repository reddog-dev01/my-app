import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function SimpleBarChart() {
  const [pData, setPData] = useState([]);
  const [uData, setUData] = useState([]);
  const [astAltData, setAstAltData] = useState([]);
  const [astAltRatioData, setAstAltRatioData] = useState([]);
  const [nfsData, setNfsData] = useState([]);
  const [nfsCalculatedData, setNfsCalculatedData] = useState([]);
  const [xLabels, setXLabels] = useState([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data_gan.json`)
      .then((response) => response.json())
      .then((data) => {
        const parsedPData = data.map((item) => parseFloat(item.apri_v2 || 0));

        const parsedUData = data.map((item) => {
          const ast_v2 = parseFloat(item.ast_v2 || 0);
          const tieu_cau_v2 = parseFloat(item.tieu_cau_v2 || 1);
          const gioi_tinh_v2 = item.gioi_tinh_v2;

          if (gioi_tinh_v2 === "2") {
            return (ast_v2 / 35 / tieu_cau_v2) * 100;
          } else {
            return (ast_v2 / 40 / tieu_cau_v2) * 100;
          }
        });

        const parsedAstAltData = data.map((item) =>
          parseFloat(item.ast_alt_v2 || 0)
        );

        const parsedAstAltRatioData = data.map((item) => {
          const ast_v2 = parseFloat(item.ast_v2 || 0);
          const alt_v2 = parseFloat(item.alt_v2 || 1);
          return ast_v2 / alt_v2;
        });

        const parsedNfsData = data.map((item) => parseFloat(item.nfs_v2 || 0));

        const parsedNfsCalculatedData = data.map((item) => {
          const tuoi_v2 = parseFloat(item.tuoi_v2 || 0);
          const cannang_v2 = parseFloat(item.can_nang_v2 || 0);
          const chieu_cao_v2 = parseFloat(item.cao_v2 || 0);
          const ast_v2 = parseFloat(item.ast_v2 || 0);
          const alt_v2 = parseFloat(item.alt_v2 || 1);
          const tieu_cau_v2 = parseFloat(item.tieu_cau_v2 || 1);
          const albumin_v2 = parseFloat(item.albumin_v2 || 0);

          if (
            isNaN(tuoi_v2) ||
            isNaN(cannang_v2) ||
            isNaN(chieu_cao_v2) ||
            isNaN(ast_v2) ||
            isNaN(alt_v2) ||
            isNaN(tieu_cau_v2) ||
            isNaN(albumin_v2) ||
            chieu_cao_v2 === 0 ||
            alt_v2 === 0 ||
            tieu_cau_v2 === 0
          ) {
            return null;
          }

          const nfsCalculated =
            -1.675 +
            0.037 * tuoi_v2 +
            (0.094 * cannang_v2) / ((chieu_cao_v2 * chieu_cao_v2) / 10000) +
            1.13 * 0 +
            0.99 * (ast_v2 / alt_v2) -
            0.013 * tieu_cau_v2 -
            0.66 * albumin_v2;

          return nfsCalculated;
        });

        const labels = data.map((item) => item.benh_an_id_v2);

        console.log("Calculated NFS values:", parsedNfsCalculatedData);

        setPData(parsedPData);
        setUData(parsedUData);
        setAstAltData(parsedAstAltData);
        setAstAltRatioData(parsedAstAltRatioData);
        setNfsData(parsedNfsData);
        setNfsCalculatedData(parsedNfsCalculatedData.filter((v) => v !== null));
        setXLabels(labels);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "auto" }}>
      <div style={{ width: "100%", height: "400px" }}>
        <BarChart
          series={[
            { data: pData, label: "APRI đo", id: "apriId" },
            { data: uData, label: "APRI tính", id: "astAltId" },
          ]}
          xAxis={[{ data: xLabels, scaleType: "band" }]}
        />
      </div>

      <div style={{ width: "100%", height: "400px", marginTop: "20px" }}>
        <BarChart
          series={[
            { data: astAltData, label: "AST/ALT đo", id: "astAltId" },
            {
              data: astAltRatioData,
              label: "AST/ALT tính",
              id: "astAltRatioId",
            },
          ]}
          xAxis={[{ data: xLabels, scaleType: "band" }]}
        />
      </div>

      <div style={{ width: "100%", height: "400px", marginTop: "20px" }}>
        <BarChart
          series={[
            { data: nfsData, label: "NFS đo", id: "nfsId" },
            {
              data: nfsCalculatedData,
              label: "NFS tính",
              id: "nfsCalculatedId",
            },
          ]}
          xAxis={[{ data: xLabels, scaleType: "band" }]}
        />
      </div>
    </div>
  );
}
