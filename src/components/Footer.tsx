import { Link } from "react-router-dom";
import "@styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <p className="copyright">
          Copyright ⓒ Gongdori All Rights Reserved.
        </p>

        <div className="footer-left">
          <p>
            <strong>우석고 SW 개발 동아리</strong><br />
            상상을 코드로 구현하는 개발팀입니다.
          </p>
        </div>
 
        <div className="footer-right">
          <div>
            <h4>동아리</h4>
            <Link to="/recruit">Join 2026</Link>
          </div>

          <div>
            <h4>정보</h4>
            <a href="https://school.jbedu.kr/woosuk" target="_blank">학교</a>
            <a href="https://github.com/woosuk-hs" target="_blank">GitHub</a>
          </div>
        </div>

      </div>

    </footer>
  );
}

export default Footer;