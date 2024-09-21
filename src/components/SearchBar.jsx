import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.scss";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [miniganData, setMiniganData] = useState([]);

  useEffect(() => {
    // Sử dụng fetch để lấy dữ liệu từ file JSON trong public
    fetch("/data_gan.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Phản hồi mạng không thành công");
        }
        return response.json();
      })
      .then((data) => {
        setMiniganData(data);
      })
      .catch((error) => console.error("Lỗi khi tải dữ liệu:", error));
  }, []);

  const fetchData = (value) => {
    if (!value.trim()) {
      setResults([]);
      setMessage("Hãy nhập để tìm kiếm");
      return;
    }
    // Lọc bệnh nhân
    const results = miniganData.filter((record) => {
      return (
        record &&
        record.benh_an_id_v2 &&
        record.benh_an_id_v2.toLowerCase().includes(value.toLowerCase())
      );
    });

    if (results.length === 0) {
      setMessage("Mã nghiên cứu không tồn tại");
    } else {
      setMessage("");
    }

    setResults(results);
  };

  const handleChange = (value) => {
    setInput(value);
  };

  const handleSearch = () => {
    fetchData(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" onClick={handleSearch} />
      <input
        placeholder="Nhập mã nghiên cứu"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default SearchBar;
