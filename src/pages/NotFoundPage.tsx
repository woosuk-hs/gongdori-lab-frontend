import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404 - 페이지를 찾을 수 없습니다.</h1>
      <p>요청하신 페이지가 존재하지 않습니다.</p>
      <button onClick={() => navigate("/")}>홈으로 가기</button>
    </div>
  );
}

export default NotFoundPage;