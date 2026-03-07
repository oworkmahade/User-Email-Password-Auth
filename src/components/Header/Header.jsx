import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";

const activeClass = ({ isActive }) =>
  isActive ? "text-green-600 border-2 border-green-600 p-1" : "text-gray-600";

const links = () => {
  return (
    <ul className="flex flex-row items-center justify-center gap-4 p-2">
      <li>
        <NavLink to="/" className={activeClass}>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/login" className={activeClass}>
          Login
        </NavLink>
      </li>

      <li>
        <NavLink to="/register" className={activeClass}>
          Register
        </NavLink>
      </li>
    </ul>
  );
};
const Header = () => {
  return (
    <div>
      <Helmet>
        <title>Header</title>
      </Helmet>
      <nav style={{ padding: "10px", background: "#f0f0f0" }}>{links()}</nav>
    </div>
  );
};

export default Header;
