import { useEffect, useState, Fragment } from "react";
import {recruitAPI, type RecruitResponseDTO, STATUS_LABEL, STATUS_NEXT} from "./api/recruitAPI";
import "./styles/RecruitAdminPage.css";
import type {RecruitStatus} from "@type/recruit.ts";

function RecruitAdminPage() {
  const [list, setList] = useState<RecruitResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<RecruitStatus | "ALL">("ALL");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [deletingStudentId, setDeletingStudentId] = useState<string | null>(null);

  useEffect(() => {
    recruitAPI.findAll().then(setList).finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (studentId: string, status: RecruitStatus) => {
    const updated = await recruitAPI.updateStatus(studentId, status);
    setList((prev) => prev.map((r) => (r.studentId === studentId ? updated : r)));
  };

  const handleDelete = async (studentId: string) => {
    try {
      await recruitAPI.delete(studentId);
      setList((prev) => prev.filter((r) => r.studentId !== studentId));
      setDeletingStudentId(null);
    } catch (e) {
      console.error("삭제 실패:", e);
      setDeletingStudentId(null);
    }
  };

  const toggleMotivation = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filtered = filter === "ALL" ? list : list.filter((r) => r.status === filter);

  if (loading) return <div className="admin-loading">불러오는 중...</div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>지원자 관리</h1>
        <span className="admin-count">{list.length}명 지원</span>
      </div>

      <div className="admin-filters">
        {(["ALL", "PENDING", "ACCEPTED", "REJECTED"] as const).map((s) => (
          <button
            key={s}
            className={`filter-btn ${filter === s ? "active" : ""}`}
            onClick={() => setFilter(s)}
          >
            {s === "ALL" ? "전체" : STATUS_LABEL[s]}
          </button>
        ))}
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
          <tr>
            <th>학번</th>
            <th>이름</th>
            <th>언어</th>
            <th>GitHub</th>
            <th>지원동기</th>
            <th>상태</th>
            <th>변경</th>
            <th>삭제</th>
          </tr>
          </thead>
          <tbody>
          {filtered.map((r) => (
            <Fragment key={r.id}>
              <tr className={`row-${r.status.toLowerCase()}`}>
                <td data-label="학번">{r.studentId}</td>
                <td data-label="이름">{r.name}</td>
                <td data-label="언어">
                  <div className="lang-tags">
                    {r.languages.map((l) => <span key={l}>{l}</span>)}
                  </div>
                </td>
                <td data-label="GitHub">{r.github ? <a href={r.github} target="_blank" rel="noreferrer">링크</a> : "—"}</td>
                <td data-label="지원동기">
                  <button
                    className={`motivation-btn ${expandedId === r.id ? "open" : ""}`}
                    onClick={() => toggleMotivation(r.id)}
                  >
                    {expandedId === r.id ? "접기 ▲" : "보기 ▼"}
                  </button>
                </td>
                <td data-label="상태">
                    <span className={`status-badge ${r.status.toLowerCase()}`}>
                      {STATUS_LABEL[r.status]}
                    </span>
                </td>
                <td data-label="변경">
                  <div className="status-actions">
                    {STATUS_NEXT[r.status].map((s) => (
                      <button
                        key={s}
                        className={`action-btn ${s.toLowerCase()}`}
                        onClick={() => handleStatusChange(r.studentId, s)}
                      >
                        {STATUS_LABEL[s]}
                      </button>
                    ))}
                  </div>
                </td>
                <td data-label="삭제">
                  <button
                    className="action-btn delete"
                    onClick={() => setDeletingStudentId(r.studentId)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
              {expandedId === r.id && (
                <tr className="motivation-row">
                  <td colSpan={8}>
                    <div className="motivation-content">
                      <span className="motivation-label">지원동기</span>
                      <p>{r.motivation}</p>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
          {filtered.length === 0 && (
            <tr><td colSpan={8} className="empty">지원자가 없습니다.</td></tr>
          )}
          </tbody>
        </table>
      </div>

      {deletingStudentId !== null && (
        <div className="modal-overlay" onClick={() => setDeletingStudentId(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p className="modal-text">정말 이 지원자를 삭제할까요?<br />이 작업은 되돌릴 수 없어요.</p>
            <div className="modal-actions">
              <button className="action-btn cancel" onClick={() => setDeletingStudentId(null)}>취소</button>
              <button className="action-btn delete" onClick={() => handleDelete(deletingStudentId)}>삭제</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecruitAdminPage;