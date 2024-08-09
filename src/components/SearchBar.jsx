import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.scss";
import miniganData from "../data_gan.json";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const fetchData = (value) => {
    if (!value.trim()) {
      setResults([]);
      setMessage("Hãy nhập để tìm kiếm");
      return;
    }
    // gọi bệnh nhân
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
