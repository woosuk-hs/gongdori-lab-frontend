import { Link } from "react-router-dom";
import { CONFIG } from "@utils/config.ts"
import "@styles/navbar.css"

function Navbar() {

  return (
    <nav className="navbar">
      <ul className="container" id="nav-menu">
        <li><Link to="/">ABOUT</Link></li>
        <li><Link to="/members">부원</Link></li>
        <li><Link to="/activity">활동</Link></li>
        <li><Link to="/qna">QNA</Link></li>
      </ul>

      {CONFIG.RECRUIT && (
        <div className="nav-right-group">
          <Link id="right" to="/recruit">{CONFIG.RECRUIT_YEAR} 지원하기</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;