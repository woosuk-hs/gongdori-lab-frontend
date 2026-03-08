import { useEffect, useState, Fragment } from "react";
import { memberAPI, type MemberResponseDTO } from "./api/memberAPI";
import "./styles/MemberAdminPage.css";
import type {MemberRole, MemberType} from "@type/member.ts";
import {ROLE_LABEL, TYPE_LABEL} from "@utils/label/memberType.ts";

type RoleFilter = MemberRole | "ALL";
type TypeFilter = MemberType | "ALL";

function MemberAdminPage() {
  const [list, setList] = useState<MemberResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("ALL");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("ALL");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<{ role: MemberRole; type: MemberType } | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    memberAPI.findAll().then(setList).finally(() => setLoading(false));
  }, []);

  const filtered = list.filter((m) => {
    if (roleFilter !== "ALL" && m.role !== roleFilter) return false;
    if (typeFilter !== "ALL" && m.type !== typeFilter) return false;
    return true;
  });

  const startEdit = (m: MemberResponseDTO) => {
    setEditingId(m.id);
    setEditForm({ role: m.role, type: m.type });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleUpdate = async (id: number) => {
    if (!editForm) return;
    const updated = await memberAPI.update(id, editForm);
    setList((prev) => prev.map((m) => (m.id === id ? updated : m)));
    cancelEdit();
  };

  const handleDelete = async (id: number) => {
    try {
      await memberAPI.delete(id);
      setList((prev) => prev.filter((m) => m.id !== id));
      setDeletingId(null);
    } catch (e) {
      console.error("삭제 실패:", e);
      setDeletingId(null);
    }
  };

  if (loading) return <div className="admin-loading">불러오는 중...</div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>멤버 관리</h1>
        <span className="admin-count">{list.length}명</span>
      </div>

      <div className="admin-filters">
        {(["ALL", "ADMIN", "MEMBER"] as const).map((r) => (
          <button
            key={r}
            className={`filter-btn ${roleFilter === r ? "active" : ""}`}
            onClick={() => setRoleFilter(r)}
          >
            {r === "ALL" ? "전체 역할" : ROLE_LABEL[r]}
          </button>
        ))}
        <div className="filter-divider" />
        {(["ALL", "STUDENT", "TEACHER"] as const).map((t) => (
          <button
            key={t}
            className={`filter-btn ${typeFilter === t ? "active" : ""}`}
            onClick={() => setTypeFilter(t)}
          >
            {t === "ALL" ? "전체 유형" : TYPE_LABEL[t]}
          </button>
        ))}
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
          <tr>
            <th>학번</th>
            <th>이름</th>
            <th>아이디</th>
            <th>GitHub</th>
            <th>유형</th>
            <th>역할</th>
            <th>가입일</th>
            <th>관리</th>
          </tr>
          </thead>
          <tbody>
          {filtered.map((m) => (
            <Fragment key={m.id}>
              <tr className={`row-${m.role.toLowerCase()}`}>
                <td>{m.studentId ?? "—"}</td>
                <td>{m.name}</td>
                <td className="cell-username">{m.username}</td>
                <td>
                  {m.github
                    ? <a href={m.github} target="_blank" rel="noreferrer">링크</a>
                    : "—"}
                </td>
                <td><span className={`type-badge ${m.type.toLowerCase()}`}>{TYPE_LABEL[m.type]}</span></td>
                <td><span className={`role-badge ${m.role.toLowerCase()}`}>{ROLE_LABEL[m.role]}</span></td>
                <td className="cell-date">{m.createdAt.slice(0, 10)}</td>
                <td>
                  <div className="member-actions">
                    <button className="action-btn edit" onClick={() => startEdit(m)}>수정</button>
                    <button className="action-btn delete" onClick={() => setDeletingId(m.id)}>삭제</button>
                  </div>
                </td>
              </tr>
              {editingId === m.id && editForm && (
                <tr className="edit-row">
                  <td colSpan={8}>
                    <div className="edit-content">
                      <div className="edit-field">
                        <span className="edit-label">역할</span>
                        <div className="edit-options">
                          {(["ADMIN", "MEMBER"] as const).map((r) => (
                            <button
                              key={r}
                              className={`option-btn ${editForm.role === r ? "active" : ""}`}
                              onClick={() => setEditForm((p) => p ? { ...p, role: r } : p)}
                            >
                              {ROLE_LABEL[r]}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="edit-field">
                        <span className="edit-label">유형</span>
                        <div className="edit-options">
                          {(["STUDENT", "TEACHER"] as const).map((t) => (
                            <button
                              key={t}
                              className={`option-btn ${editForm.type === t ? "active" : ""}`}
                              onClick={() => setEditForm((p) => p ? { ...p, type: t } : p)}
                            >
                              {TYPE_LABEL[t]}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="edit-actions">
                        <button className="action-btn save" onClick={() => handleUpdate(m.id)}>저장</button>
                        <button className="action-btn cancel" onClick={cancelEdit}>취소</button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
          {filtered.length === 0 && (
            <tr><td colSpan={8} className="empty">멤버가 없습니다.</td></tr>
          )}
          </tbody>
        </table>
      </div>

      {deletingId !== null && (
        <div className="modal-overlay" onClick={() => setDeletingId(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p className="modal-text">정말 이 멤버를 삭제할까요?<br />이 작업은 되돌릴 수 없어요.</p>
            <div className="modal-actions">
              <button className="action-btn cancel" onClick={() => setDeletingId(null)}>취소</button>
              <button className="action-btn delete" onClick={() => handleDelete(deletingId)}>삭제</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberAdminPage;