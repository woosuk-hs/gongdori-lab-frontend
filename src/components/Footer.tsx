import { Link } from "react-router-dom";
import "@styles/footer.css";
import logo from "@assets/logo.svg";
import githubIcon from "@assets/github.svg";
import schoolIcon from "@assets/school.svg";
import mailIcon from "@assets/mail.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-left">
          <img src={logo} alt="Logo" className="footer-logo" />
          <p>
            <strong>우석고 SW 개발 동아리</strong><br />
            상상을 코드로 구현하는 개발팀입니다.
          </p>
        </div>

        <div className="footer-center">
          <div>
            <h4>동아리</h4>
            <Link to="/recruit">Join 2026</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/members">Members</Link>
          </div>

          <div>
            <h4>정보</h4>
            <a href="https://school.jbedu.kr/woosuk" target="_blank">
              <img src={schoolIcon} alt="School" className="footer-icon" /> 학교
            </a>
            <a href="https://github.com/woosuk-hs" target="_blank">
              <img src={githubIcon} alt="GitHub" className="footer-icon" /> GitHub
            </a>
            <a href="mailto:contact@woosuk-hs.kr">
              <img src={mailIcon} alt="Email" className="footer-icon" /> Email
            </a>
          </div>
        </div>

        <p className="copyright">
          Copyright ⓒ Gongdori All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;