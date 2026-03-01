import { useState } from "react";
import { Link } from "react-router-dom";
import { CONFIG } from "@utils/config.ts"
import "@styles/navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="logo">
          <Link to="/"><img src="/images/logo.svg" alt="로고" /></Link>
        </div>

        <div className={`nav-links ${open ? "open" : ""}`}>
          <ul className="container" id="nav-menu">
            {/*<li><a href="#home">ABOUT</a></li>*/}
            <li><Link to="#home">ABOUT</Link></li>
            <li><Link to="#homea">부원</Link></li>
            <li><Link to="/activity">활동</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>

          {CONFIG.RECRUIT && (
            <div className="nav-right-group">
              <Link id="right" to="/recruit">{CONFIG.RECRUIT_YEAR} 지원하기</Link>
            </div>
          )}
        </div>

        <div
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
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