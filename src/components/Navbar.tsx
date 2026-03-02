import { useState } from "react";
import { Link } from "react-router-dom";
import { CONFIG } from "@utils/config.ts";
import { AuthButton } from "./AuthButton";
import "@styles/navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar noto-body-medium">

      <div className="navbar-inner">
        <div className="logo">
          <Link to="/"><img src="/images/logo.svg" alt="로고" /></Link>
        </div>

        <div className={`nav-links ${open ? "open" : ""}`}>
          <ul className="container">
            <li><Link to="#home">ABOUT</Link></li>
            <li><Link to="#homea">부원</Link></li>
            <li><Link to="/activity">활동</Link></li>
            <li><AuthButton /></li>
          </ul>

          {CONFIG.RECRUIT && (
            <div className="nav-right-group noto-body-bold">
              <Link id="right" to="/recruit">{CONFIG.RECRUIT_YEAR} 지원하기</Link>
            </div>
          )}
        </div>

        <div
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen(prev => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;