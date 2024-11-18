import { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.scss";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [miniganData, setMiniganData] = useState([]);

  // Fetch data from the backend on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8081/") // Backend API URL
      .then((res) => {
        const mappedData = res.data.map((record) => ({
          benh_an_id_v2: record.benh_an_id,
          chieu_cao_v2: record.chieu_cao_v2,
          cannang_v2: record.can_nang_v2,
          tieu_cau_v2: record.tieu_cau,
          gioi_tinh_v2: record.gioi_tinh_v2,
          alt_v2: record.ALT,
          tuoi_v2: record.tuoi_v2,
          ast_v2: record.AST,
          bil_toan_phan_v2: record.Bil_toan_phan,
          inr_v2: record.INR,
          albumin_v2: record.Albumin,
          tieu_duong: record.tieu_duong,
          co_truong: record.co_truong,
          benh_nao_gan: record.benh_nao_gan,
          triglyceride_v2: record.Triglyceride,
          hdlc_v2: record.HDL,
        }));
        console.log(mappedData); // Inspect the data structure
        setMiniganData(mappedData); // Save the fetched data
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  const fetchData = (value) => {
    if (!value.trim()) {
      setResults([]);
      setMessage("Hãy nhập để tìm kiếm");
      return;
    }

    // Filter records based on the input value
    const results = miniganData.filter((record) => {
      return (
        record &&
        record.benh_an_id_v2 &&
        record.benh_an_id_v2
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()) // Ensure benh_an_id is treated as a string for comparison
      );
    });

    if (results.length === 0) {
      setMessage("Mã nghiên cứu không tồn tại");
    } else {
      setMessage("");
    }

    setResults(results); // Send filtered results to the parent component
  };

  const handleChange = (value) => {
    setInput(value); // Update input state
  };

  const handleSearch = () => {
    fetchData(input); // Call fetchData with the input value
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search on 'Enter' key press
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
