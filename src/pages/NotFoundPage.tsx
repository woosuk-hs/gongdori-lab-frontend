import { useNavigate } from "react-router-dom";
import "@styles/NotFoundPage.css";
import {Helmet} from "react-helmet-async";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>404</title>
      </Helmet>

      <div className="notfound-page">
        <div className="notfound-card">
          <span className="notfound-code">404</span>
          <h1 className="notfound-title">페이지를 찾을 수 없어요</h1>
          <p className="notfound-desc">
            요청하신 페이지가 존재하지 않거나<br/>
            이동되었을 수 있어요.
          </p>
          <button className="notfound-btn" onClick={() => navigate("/")}>
            메인으로 돌아가기
          </button>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;