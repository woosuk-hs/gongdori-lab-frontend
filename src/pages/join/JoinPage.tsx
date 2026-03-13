import { useState, type SyntheticEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "@utils/authAPI";
import "./styles/JoinPage.css";
import * as React from "react";
import {Helmet} from "react-helmet-async";

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

  const usernameValid = /^[a-z0-9]+$/.test(form.username);
  const nameValid = /^[가-힣]+$/.test(form.name);
  const studentIdValid = /^\d{5}$/.test(form.studentId);
  const passwordValid = form.password.length >= 8;

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!usernameValid) {
      setError("아이디는 영어 소문자와 숫자만 입력 가능합니다.");
      return;
    }
    if (!nameValid) {
      setError("이름은 한국어만 입력 가능합니다.");
      return;
    }
    if (!studentIdValid) {
      setError("학번은 숫자 5자리여야 합니다.");
      return;
    }
    if (!passwordValid) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
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
    <>
      <Helmet>
        <title>회원가입</title>
      </Helmet>

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
                required/>
            </div>

            <div className="join-divider"/>

            <div className="join-field">
              <label htmlFor="username">아이디</label>
              <input
                id="username"
                type="text"
                placeholder="영어 소문자, 숫자만 입력하세요"
                value={form.username}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^a-z0-9]/g, "");
                  setForm((p) => ({...p, username: val}));
                }}
                required/>
              {form.username && !usernameValid && (
                <span className="join-field__hint error">영어 소문자와 숫자만 입력 가능합니다.</span>
              )}
            </div>

            <div className="join-field">
              <label htmlFor="name">이름</label>
              <input
                id="name"
                type="text"
                placeholder="실명을 입력하세요 (한국어)"
                value={form.name}
                onChange={set("name")}
                required/>
              {form.name && !nameValid && (
                <span className="join-field__hint error">이름은 한국어만 입력 가능합니다.</span>
              )}
            </div>

            <div className="join-field">
              <label htmlFor="studentId">학번</label>
              <input
                id="studentId"
                type="text"
                placeholder="숫자 5자리"
                value={form.studentId}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 5);
                  setForm((p) => ({...p, studentId: val}));
                }}
                maxLength={5}
                inputMode="numeric"
                required/>
              {form.studentId && !studentIdValid && (
                <span className="join-field__hint error">학번은 숫자 5자리여야 합니다.</span>
              )}
            </div>

            <div className="join-field">
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                type="password"
                placeholder="8자 이상 입력하세요"
                value={form.password}
                onChange={set("password")}
                required/>
              {form.password && !passwordValid && (
                <span className="join-field__hint error">비밀번호는 8자 이상이어야 합니다.</span>
              )}
            </div>

            <div className="join-field">
              <label htmlFor="passwordConfirm">비밀번호 확인</label>
              <input
                id="passwordConfirm"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={form.passwordConfirm}
                onChange={set("passwordConfirm")}
                required/>
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
    </>
  );
}

export default JoinPage;