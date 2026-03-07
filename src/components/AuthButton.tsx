import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "@utils/auth";
import { authAPI } from "@utils/authAPI";
import * as React from "react";

export function AuthButton() {
  const [loggedIn, setLoggedIn] = useState(Auth.isLoggedIn());
  const navigate = useNavigate();

  useEffect(() => {
    const sync = () => setLoggedIn(Auth.isLoggedIn());
    window.addEventListener("auth:change", sync); // 같은 탭 (로그인/로그아웃)
    window.addEventListener("storage", sync);     // 다른 탭
    return () => {
      window.removeEventListener("auth:change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await authAPI.logout(); // 서버 로그아웃 + Auth.clear() → auth:change 발행
    } catch {
      Auth.clear(); // 서버 실패해도 클라이언트 정리 → auth:change 발행
    } finally {
      navigate("/");
    }
  };

  return loggedIn ? (
    <Link to="/" onClick={handleLogout}>Logout</Link>
  ) : (
    <Link to="/login">Login</Link>
  );
}