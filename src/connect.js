const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Để phân tích các yêu cầu JSON

// Kết nối MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Baonb192708aA@", // Thay bằng mật khẩu thực của bạn
  database: "data_gan", // Thay bằng tên cơ sở dữ liệu của bạn
});

// Kết nối với MySQL
db.connect((err) => {
  if (err) {
    console.error("Lỗi kết nối với cơ sở dữ liệu:", err);
    return;
  }
  console.log("Kết nối thành công với cơ sở dữ liệu MySQL!");
});

// Route mới để tìm kiếm bệnh nhân theo `benh_an_id_v2`
app.get("/search", (req, res) => {
  const searchTerm = req.query.q; // Lấy tham số truy vấn (ví dụ: "/search?q=xxx")

  if (!searchTerm) {
    return res.status(400).json({ message: "Chưa cung cấp từ khóa tìm kiếm." });
  }

  const sqlQuery = `SELECT * FROM patients WHERE benh_an_id_v2 LIKE ?`;
  db.query(sqlQuery, [`%${searchTerm}%`], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Lỗi khi lấy dữ liệu từ cơ sở dữ liệu." });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy bản ghi phù hợp." });
    }

    res.json(results);
  });
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
