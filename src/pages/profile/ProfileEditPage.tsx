import { useEffect, useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@utils/api.ts";
import "./styles/ProfileEditPage.css";
import * as React from "react";

interface MemberUpdateDTO {
  password?: string;
  github?: string;
}

function ProfileEditPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    github: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get<{ github?: string }>("/members/me")
      .then((res) => setForm((p) => ({ ...p, github: res.data.github ?? "" })));
  }, []);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (form.password && form.password !== form.passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    const dto: MemberUpdateDTO = {};
    if (form.github !== undefined) dto.github = form.github || undefined;
    if (form.password) dto.password = form.password;

    setLoading(true);
    try {
      await api.patch("/members/me", dto);
      navigate("/profile");
    } catch {
      setError("저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-page">
      <div className="edit-card">
        <div className="edit-card__header">
          <span className="edit-card__eyebrow">MY ACCOUNT</span>
          <h1 className="edit-card__title">프로필 수정</h1>
        </div>

        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="edit-field">
            <label htmlFor="github">GitHub 사용자명</label>
            <div className="edit-input-prefix">
              <span>github.com/</span>
              <input
                id="github"
                type="text"
                placeholder="username"
                value={form.github}
                onChange={set("github")}
              />
            </div>
          </div>

          <div className="edit-divider" />

          <div className="edit-field">
            <label htmlFor="password">
              새 비밀번호 <span className="edit-optional">(변경 시에만)</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="새 비밀번호를 입력하세요"
              value={form.password}
              onChange={set("password")}
            />
          </div>

          <div className="edit-field">
            <label htmlFor="passwordConfirm">새 비밀번호 확인</label>
            <input
              id="passwordConfirm"
              type="password"
              placeholder="새 비밀번호를 다시 입력하세요"
              value={form.passwordConfirm}
              onChange={set("passwordConfirm")}
            />
            {form.passwordConfirm && form.password !== form.passwordConfirm && (
              <span className="edit-hint error">비밀번호가 일치하지 않습니다.</span>
            )}
            {form.passwordConfirm && form.password === form.passwordConfirm && (
              <span className="edit-hint success">비밀번호가 일치합니다.</span>
            )}
          </div>

          {error && <p className="edit-error">{error}</p>}

          <div className="edit-actions">
            <button
              type="button"
              className="edit-cancel"
              onClick={() => navigate("/profile")}
            >
              취소
            </button>
            <button type="submit" className="edit-submit" disabled={loading}>
              {loading ? "저장 중..." : "저장하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileEditPage;