import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "@utils/auth";
import { api } from "@utils/api";
import * as React from "react";

export function AuthButton() {
  const [loggedIn, setLoggedIn] = useState(Auth.isLoggedIn());
  const navigate = useNavigate();

  useEffect(() => {
    Auth.subscribe(setLoggedIn);
  }, []);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("서버 로그아웃 실패", err);
    } finally {
      Auth.logout();
      navigate("/");
    }
  };

  return loggedIn ? (
    <Link to="/" onClick={handleLogout}>Logout</Link>
  ) : (
    <Link to="/login">Login</Link>
  );
}