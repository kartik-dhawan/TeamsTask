import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  return (
    <nav className="teamsNavbar">
      <div className="navHead">
        <MenuIcon className="navMenu" />
        <div className="navTitle">
          <span id="navMainTitle1">Teams</span>
          <span id="navMainTitle2">Task</span>
          <span id="navTitleIcon">TT</span>
        </div>
      </div>
      <div className="navLogout">Logout</div>
    </nav>
  );
};

export default Navbar;
