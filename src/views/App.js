import React, { useState } from "react";
import "./App.scss";
import Nav from "../components/Nav/Nav";
import GanNhiemMo from "./Example/Gannhiemmo";
import Ungthugan from "./Example/Ungthugan";
import Xogan from "./Example/Xogan";
import Bieudo from "./Example/Bieudo";
import { SearchBar } from "../components/SearchBar";
import logo1 from "../assets/images/logo_vinif.png";
import logo2 from "../assets/images/logo_hust.png";
import logo3 from "../assets/images/logo_vietduc.jpg";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [results, setResults] = useState([]);

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <div className="slider">
            <div className="slide">
              <img
                src={logo1}
                style={{ width: "200px", height: "100px" }}
                alt="logo1"
              />
            </div>
            <div className="slide">
              <img
                src={logo2}
                style={{ width: "70px", height: "100px" }}
                alt="logo2"
              />
            </div>
            <div className="slide">
              <img
                src={logo3}
                style={{ width: "100px", height: "100px" }}
                alt="logo3"
              />
            </div>
          </div>
          <div className="search-bar-container">
            <SearchBar setResults={setResults} />
          </div>
          <Nav />
          <Routes>
            <Route path="/bieudo" element={<Bieudo />} />
            <Route path="/nhiemmo" element={<GanNhiemMo results={results} />} />
            <Route path="/xogan" element={<Xogan results={results} />} />
            <Route path="/ungthugan" element={<Ungthugan />} />
          </Routes>
          {/* hiển thị kết quả */}
          <div className="results">
            {results.map((result, index) => (
              <div key={index}>{result.benh_an_id_v2}</div>
            ))}
          </div>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
