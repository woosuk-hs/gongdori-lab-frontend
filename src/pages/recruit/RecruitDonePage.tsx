import { Link } from "react-router-dom";
import "./styles/RecruitDonePage.css";
import {CONFIG} from "@utils/config.ts";

function RecruitDonePage() {
  return (
    <div className="done-page">
      <div className="done-card">
        <div className="done-icon">✓</div>
        <span className="done-eyebrow">RECRUITMENT { CONFIG.YEAR }</span>
        <h1 className="done-title">지원 완료!</h1>
        <p className="done-desc">
          지원서가 성공적으로 제출되었어요.<br />
          검토 후 결과를 확인해주세요.
        </p>
        <div className="done-actions">
          <Link to="/recruit/check" className="done-btn-primary">합격 확인하기</Link>
          <Link to="/" className="done-btn-ghost">메인으로</Link>
        </div>
      </div>
    </div>
  );
}

export default RecruitDonePage;