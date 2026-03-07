import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { recruitAPI, type RecruitResponseDTO, STATUS_LABEL, STATUS_NEXT } from "./api/recruitAPI";
import type { RecruitStatus } from "@type/recruit.ts";
import "./styles/RecruitDetailPage.css";

function RecruitDetailPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<RecruitResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!studentId) return;
    recruitAPI
      .findByStudentId(studentId)
      .then(setData)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [studentId]);

  const handleStatusChange = async (status: RecruitStatus) => {
    if (!data) return;
    const updated = await recruitAPI.updateStatus(data.studentId, status);
    setData(updated);
  };

  if (loading) return <div className="detail-loading">불러오는 중...</div>;
  if (notFound || !data) return <div className="detail-loading">지원자를 찾을 수 없습니다.</div>;

  return (
    <div className="detail-page">
      <button className="detail-back" onClick={() => navigate("/recruit/admin")}>← 목록으로</button>

      <div className="detail-card">
        <div className="detail-header">
          <div className="detail-name-wrap">
            <h1 className="detail-name">{data.name}</h1>
            <span className="detail-student-id">{data.studentId}</span>
          </div>
          <span className={`status-badge ${data.status.toLowerCase()}`}>
            {STATUS_LABEL[data.status]}
          </span>
        </div>

        <div className="detail-info">
          <div className="detail-row">
            <span className="detail-label">언어</span>
            <div className="lang-tags">
              {data.languages.map((l) => <span key={l}>{l}</span>)}
            </div>
          </div>
          <div className="detail-row">
            <span className="detail-label">GitHub</span>
            {data.github
              ? <a href={data.github} target="_blank" rel="noreferrer">{data.github}</a>
              : <span className="detail-empty">—</span>}
          </div>
        </div>

        <div className="detail-section">
          <span className="detail-section-label">지원동기</span>
          <p className="detail-motivation">{data.motivation}</p>
        </div>

        <div className="detail-actions">
          <span className="detail-section-label">상태 변경</span>
          <div className="status-actions">
            {STATUS_NEXT[data.status].map((s) => (
              <button
                key={s}
                className={`action-btn ${s.toLowerCase()}`}
                onClick={() => handleStatusChange(s)}
              >
                {STATUS_LABEL[s]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruitDetailPage;