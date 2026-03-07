import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";

const links = () => {
  return (
    <ul className="flex flex-row items-center justify-center gap-4">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/about">About</NavLink>
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
