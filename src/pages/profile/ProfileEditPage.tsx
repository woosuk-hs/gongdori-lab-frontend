import { useEffect, useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@utils/api.ts";
import "./styles/ProfileEditPage.css";
import * as React from "react";
import {Helmet} from "react-helmet-async";

interface MemberResponseDTO {
  username: string;
  github?: string;
}

interface MemberUpdateDTO {
  username?: string;
  password?: string;
  github?: string;
}

function ProfileEditPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    github: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get<MemberResponseDTO>("/members/me").then((res) =>
      setForm((p) => ({
        ...p,
        username: res.data.username ?? "",
        github: res.data.github ?? "",
      }))
    );
  }, []);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const usernameValid = !form.username || /^[a-z0-9]+$/.test(form.username);
  const passwordValid = !form.password || form.password.length >= 8;

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (form.username && !usernameValid) {
      setError("아이디는 영어 소문자와 숫자만 입력 가능합니다.");
      return;
    }
    if (form.password && !passwordValid) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    if (form.password && form.password !== form.passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    const dto: MemberUpdateDTO = {};
    if (form.username) dto.username = form.username;
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
    <>
      <Helmet>
        <title>프로필 수정</title>
      </Helmet>

      <div className="edit-page">
        <div className="edit-card">
          <div className="edit-card__header">
            <span className="edit-card__eyebrow">MY ACCOUNT</span>
            <h1 className="edit-card__title">프로필 수정</h1>
          </div>

          <form className="edit-form" onSubmit={handleSubmit}>
            <div className="edit-field">
              <label htmlFor="username">아이디</label>
              <input
                id="username"
                type="text"
                placeholder="변경할 아이디를 입력하세요 (영어 소문자, 숫자)"
                value={form.username}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^a-z0-9]/g, "");
                  setForm((p) => ({...p, username: val}));
                }}/>
              {form.username && !usernameValid && (
                <span className="edit-hint error">영어 소문자와 숫자만 입력 가능합니다.</span>
              )}
            </div>

            <div className="edit-field">
              <label htmlFor="github">GitHub 사용자명</label>
              <div className="edit-input-prefix">
                <span>github.com/</span>
                <input
                  id="github"
                  type="text"
                  placeholder="username"
                  value={form.github}
                  onChange={set("github")}/>
              </div>
            </div>

            <div className="edit-divider"/>

            <div className="edit-field">
              <label htmlFor="password">
                새 비밀번호 <span className="edit-optional">(변경 시에만)</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="8자 이상 입력하세요"
                value={form.password}
                onChange={set("password")}/>
              {form.password && !passwordValid && (
                <span className="edit-hint error">비밀번호는 8자 이상이어야 합니다.</span>
              )}
            </div>

            <div className="edit-field">
              <label htmlFor="passwordConfirm">새 비밀번호 확인</label>
              <input
                id="passwordConfirm"
                type="password"
                placeholder="새 비밀번호를 다시 입력하세요"
                value={form.passwordConfirm}
                onChange={set("passwordConfirm")}/>
              {form.passwordConfirm && form.password !== form.passwordConfirm && (
                <span className="edit-hint error">비밀번호가 일치하지 않습니다.</span>
              )}
              {form.passwordConfirm && form.password === form.passwordConfirm && form.passwordConfirm && (
                <span className="edit-hint success">비밀번호가 일치합니다.</span>
              )}
            </div>

            {error && <p className="edit-error">{error}</p>}

            <div className="edit-actions">
              <button type="button" className="edit-cancel" onClick={() => navigate("/profile")}>
                취소
              </button>
              <button type="submit" className="edit-submit" disabled={loading}>
                {loading ? "저장 중..." : "저장하기"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProfileEditPage;