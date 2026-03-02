import { useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@utils/api.ts";
import { Auth } from "@utils/auth.ts";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("아이디와 비밀번호를 입력하세요.");
      return;
    }

    try {
      const res = await api.post("/auth/login", { username, password });
      Auth.login(res.data.access, res.data.refresh);
      navigate("/profile", { replace: true });
    } catch (err) {
      console.error(err);
      setError("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.currentTarget.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.currentTarget.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;