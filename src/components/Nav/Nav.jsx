import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.scss";

const Nav = () => {
  const location = useLocation();

  return (
    <div className="topnav">
      <Link
        className={location.pathname === "/bieudo" ? "active" : ""}
        to="/bieudo"
      >
        Biểu đồ
      </Link>
      <Link
        className={location.pathname === "/nhiemmo" ? "active" : ""}
        to="/nhiemmo"
      >
        Gan nhiễm mỡ
      </Link>
      <Link
        className={location.pathname === "/xogan" ? "active" : ""}
        to="/xogan"
      >
        Xơ gan
      </Link>
      <Link
        className={location.pathname === "/ungthugan" ? "active" : ""}
        to="/ungthugan"
      >
        Ung thư gan
      </Link>
    </div>
  );
};

export default Nav;
