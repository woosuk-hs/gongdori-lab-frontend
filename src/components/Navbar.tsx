import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthButton } from "./AuthButton";
import { RecruitButton } from "@components/RecruitButton";
import "@styles/navbar.css";

function Navbar() {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">

          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <img src="/images/logo.svg" alt="logo" />
          </Link>

          <div className={`nav-menu ${open ? "open" : ""}`}>
            <ul className="nav-list">
              <li><Link to="/" onClick={closeMenu}>ABOUT</Link></li>
              <li><Link to="/" onClick={closeMenu}>부원</Link></li>
              <li><Link to="/activity" onClick={closeMenu}>활동</Link></li>

              <li onClick={closeMenu}>
                <AuthButton />
              </li>
            </ul>

            <RecruitButton onClick={closeMenu}/>

          </div>

          <button
            className={`hamburger ${open ? "active" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="menu"
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </nav>

      {open && <div className="nav-overlay" onClick={closeMenu} />}
    </>
  );
}

export default Navbar;