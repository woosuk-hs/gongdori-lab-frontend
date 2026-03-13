import { useState, type SyntheticEvent } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { LoginAPI } from "./api/loginAPI";
import "./styles/LoginPage.css";
import {Helmet} from "react-helmet-async";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const joined = (location.state as { joined?: boolean; from?: string })?.joined;
  const from = (location.state as { from?: string })?.from ?? "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await LoginAPI.login({ username, password, rememberMe });
      navigate(from, { replace: true });
    } catch {
      setError("아이디 또는 비밀번호가 틀렸습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="login-page">
        <div className="login-card">
          <div className="login-card__header">
            <span className="login-card__eyebrow">WELCOME BACK</span>
            <h1 className="login-card__title">로그인</h1>
          </div>

          {joined && (
            <p className="login-joined">가입이 완료되었습니다. 로그인해주세요.</p>
          )}

          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-field">
              <label htmlFor="username">아이디</label>
              <input
                id="username"
                type="text"
                placeholder="아이디를 입력하세요"
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
                required/>
            </div>

            <div className="login-field">
              <label htmlFor="password">비밀번호</label>
              <div className="login-password-wrap">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  required/>
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword((p) => !p)}
                  tabIndex={-1}
                >
                  {showPassword ? "숨기기" : "보기"}
                </button>
              </div>
            </div>

            <label className="login-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.currentTarget.checked)}/>
              로그인 상태 유지
            </label>

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </form>

          <p className="login-footer">
            계정이 없으신가요? <Link to="/join">회원가입</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;