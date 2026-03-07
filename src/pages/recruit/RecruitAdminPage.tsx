import { useEffect, useState, Fragment } from "react";
import {recruitAPI, type RecruitResponseDTO, STATUS_LABEL, STATUS_NEXT} from "./api/recruitAPI";
import "./styles/RecruitAdminPage.css";
import type {RecruitStatus} from "@type/recruit.ts";

function RecruitAdminPage() {
  const [list, setList] = useState<RecruitResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<RecruitStatus | "ALL">("ALL");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    recruitAPI.findAll().then(setList).finally(() => setLoading(false));
  }, []);

  // const handleStatusChange = async (id: number, status: RecruitStatus) => {
  //   const updated = await recruitAPI.updateStatus(String(id), status);
  //   setList((prev) => prev.map((r) => (r.id === id ? updated : r)));
  // };
  const handleStatusChange = async (studentId: string, status: RecruitStatus) => {
    const updated = await recruitAPI.updateStatus(studentId, status);
    setList((prev) => prev.map((r) => (r.studentId === studentId ? updated : r)));
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
          </tr>
          </thead>
          <tbody>
          {filtered.map((r) => (
            <Fragment key={r.id}>
              <tr className={`row-${r.status.toLowerCase()}`}>
                <td>{r.studentId}</td>
                <td>{r.name}</td>
                <td>
                  <div className="lang-tags">
                    {r.languages.map((l) => <span key={l}>{l}</span>)}
                  </div>
                </td>
                <td>{r.github ? <a href={r.github} target="_blank" rel="noreferrer">링크</a> : "—"}</td>
                <td>
                  <button
                    className={`motivation-btn ${expandedId === r.id ? "open" : ""}`}
                    onClick={() => toggleMotivation(r.id)}
                  >
                    {expandedId === r.id ? "접기 ▲" : "보기 ▼"}
                  </button>
                </td>
                <td>
                    <span className={`status-badge ${r.status.toLowerCase()}`}>
                      {STATUS_LABEL[r.status]}
                    </span>
                </td>
                <td>
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
              </tr>
              {expandedId === r.id && (
                <tr className="motivation-row">
                  <td colSpan={7}>
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
            <tr><td colSpan={7} className="empty">지원자가 없습니다.</td></tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecruitAdminPage;