import { useState, type SyntheticEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "@utils/authAPI";
import "./styles/JoinPage.css";
import * as React from "react";

function JoinPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    name: "",
    studentId: "",
    inviteCode: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    try {
      await authAPI.join({
        username: form.username,
        password: form.password,
        name: form.name,
        studentId: form.studentId,
        inviteCode: form.inviteCode,
      });
      navigate("/login", { state: { joined: true } });
    } catch {
      setError("초대코드가 올바르지 않거나 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="join-page">
      <div className="join-card">
        <div className="join-card__header">
          <span className="join-card__eyebrow">CREATE ACCOUNT</span>
          <h1 className="join-card__title">회원가입</h1>
        </div>

        <form className="join-form" onSubmit={handleSubmit}>
          <div className="join-field">
            <label htmlFor="inviteCode">초대코드</label>
            <input
              id="inviteCode"
              type="text"
              placeholder="초대코드를 입력하세요"
              value={form.inviteCode}
              onChange={set("inviteCode")}
              required
            />
          </div>

          <div className="join-divider" />

          <div className="join-field">
            <label htmlFor="username">아이디</label>
            <input
              id="username"
              type="text"
              placeholder="사용할 아이디를 입력하세요"
              value={form.username}
              onChange={set("username")}
              required
            />
          </div>

          <div className="join-field">
            <label htmlFor="name">이름</label>
            <input
              id="name"
              type="text"
              placeholder="실명을 입력하세요"
              value={form.name}
              onChange={set("name")}
              required
            />
          </div>

          <div className="join-field">
            <label htmlFor="studentId">학번</label>
            <input
              id="studentId"
              type="text"
              placeholder="학번을 입력하세요"
              value={form.studentId}
              onChange={set("studentId")}
              required
            />
          </div>

          <div className="join-field">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={form.password}
              onChange={set("password")}
              required
            />
          </div>

          <div className="join-field">
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input
              id="passwordConfirm"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={form.passwordConfirm}
              onChange={set("passwordConfirm")}
              required
            />
            {form.passwordConfirm && form.password !== form.passwordConfirm && (
              <span className="join-field__hint error">비밀번호가 일치하지 않습니다.</span>
            )}
            {form.passwordConfirm && form.password === form.passwordConfirm && (
              <span className="join-field__hint success">비밀번호가 일치합니다.</span>
            )}
          </div>

          {error && <p className="join-error">{error}</p>}

          <button type="submit" className="join-submit" disabled={loading}>
            {loading ? "처리 중..." : "가입하기"}
          </button>
        </form>

        <p className="join-footer">
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </div>
    </div>
  );
}

export default JoinPage;