import { useState, type SyntheticEvent } from "react";
import {recruitAPI, type RecruitResponseDTO, STATUS_DESC, STATUS_LABEL} from "./api/recruitAPI";
import "./styles/RecruitCheckPage.css";
import {CONFIG} from "@utils/config.ts";

function RecruitCheckPage() {
  const [studentId, setStudentId] = useState("");
  const [result, setResult] = useState<RecruitResponseDTO | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const data = await recruitAPI.findByStudentId(studentId);
      setResult(data);
    } catch {
      setError("해당 학번으로 지원 내역을 찾을 수 없어요.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result?.inviteCode) return;
    navigator.clipboard.writeText(result.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="check-page">
      <div className="check-card">
        <div className="check-header">
          <span className="check-eyebrow">RECRUITMENT { CONFIG.YEAR }</span>
          <h1 className="check-title">합격 확인</h1>
          <p className="check-desc">학번을 입력해 지원 결과를 확인하세요.</p>
        </div>

        <form className="check-form" onSubmit={handleSubmit}>
          <div className="check-field">
            <input
              type="text"
              placeholder="학번 5자리"
              value={studentId}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 5);
                setStudentId(val);
              }}
              maxLength={5}
              inputMode="numeric"
              required
            />
            <button type="submit" className="check-btn" disabled={loading || studentId.length !== 5}>
              {loading ? "조회 중..." : "확인"}
            </button>
          </div>
          {error && <p className="check-error">{error}</p>}
        </form>

        {result && (
          <div className={`check-result ${result.status.toLowerCase()}`}>
            <div className="check-result__top">
              <span className="check-result__name">{result.name}</span>
              <span className={`check-result__badge ${result.status.toLowerCase()}`}>
                {STATUS_LABEL[result.status]}
              </span>
            </div>
            <p className="check-result__desc">{STATUS_DESC[result.status]}</p>
            <div className="check-result__info">
              <span>학번 {result.studentId}</span>
              {result.languages.length > 0 && (
                <div className="check-result__langs">
                  {result.languages.map((l) => <span key={l}>{l}</span>)}
                </div>
              )}
            </div>

            {result.status === "ACCEPTED" && result.inviteCode && (
              <div className="check-invite">
                <p className="check-invite__label">초대코드</p>
                <div className="check-invite__code-wrap">
                  <span className="check-invite__code">{result.inviteCode}</span>
                  <button type="button" className="check-invite__copy" onClick={handleCopy}>
                    {copied ? "복사됨 ✓" : "복사"}
                  </button>
                </div>
                <p className="check-invite__notice">회원가입 시 사용하세요. 24시간 안에 가입해주세요.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecruitCheckPage;