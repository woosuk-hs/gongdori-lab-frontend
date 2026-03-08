import { Link } from "react-router-dom";
import "@styles/footer.css";
import logo from "@assets/logo.svg";
import githubIcon from "@assets/github.svg";
import schoolIcon from "@assets/school.svg";
import mailIcon from "@assets/mail.svg";
import {CONFIG} from "@utils/config.ts";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <img src={logo} alt="Logo" className="footer-logo" />
          <p className="footer-brand">Gongdori</p>
          <p className="footer-desc">
            우석고 SW 개발 동아리<br />
            상상을 코드로 구현하는 개발팀
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>동아리</h4>
            <Link to="/recruit">Join {CONFIG.YEAR}</Link>
            <Link to="/members">Members</Link>
          </div>
          <div className="footer-col">
            <h4>정보</h4>
            <a href="https://school.jbedu.kr/woosuk" target="_blank" rel="noreferrer">
              <img src={schoolIcon} alt="School" className="footer-icon" />
              학교 홈페이지
            </a>
            <a href="https://github.com/woosuk-hs" target="_blank" rel="noreferrer">
              <img src={githubIcon} alt="GitHub" className="footer-icon" />
              GitHub
            </a>
            <a href="mailto:hello@gongdori.site">
              <img src={mailIcon} alt="Email" className="footer-icon" />
              hello@gongdori.site
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">Copyright ⓒ {CONFIG.YEAR} Gongdori. All Rights Reserved.</p>
        <p className="footer-disclaimer">이 사이트는 우석고등학교 홈페이지와 무관하며, 우석고등학교로부터 승인이나 지원을 받지 않고 있습니다.</p>
      </div>
    </footer>
  );
}

export default Footer;