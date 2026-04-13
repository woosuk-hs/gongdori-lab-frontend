import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthButton } from "./AuthButton";
import { RecruitButton } from "@components/RecruitButton";
import { useAuth } from "@hooks/useAuth";
import "@styles/navbar.css";
import profileIcon from "@assets/profile.svg";

function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const { isLoggedIn } = useAuth();

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

          <Link to="/" className="nav-brand" onClick={closeMenu}>
            <img src="/images/logo.svg" alt="Gongdori logo" />
            <span>Gongdori</span>
          </Link>

          <div className={`nav-menu ${open ? "open" : ""}`}>
            <ul className="nav-list">
              <li><Link to="/" onClick={closeMenu}>준비중</Link></li>
              <li><Link to="/" onClick={closeMenu}>준비중</Link></li>
              <li><Link to="/" onClick={closeMenu}>준비중</Link></li>
              <li onClick={closeMenu}>
                <AuthButton />
              </li>
            </ul>

            <div className="nav-right">
              <RecruitButton onClick={closeMenu} />
              {isLoggedIn && (
                <Link to="/profile" className="nav-profile" onClick={closeMenu}>
                  <img src={profileIcon} alt="profile" width={20} height={20} />
                </Link>
              )}
            </div>
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