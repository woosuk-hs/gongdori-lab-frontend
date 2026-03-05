import "./styles/MainPage.css"
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div className="main-page">

      <section className="pages home" id="home">

        <img src="/images/logo.svg" className="logo" />

        <h1>Gongdori Lab</h1>

        <p>Developers who build the future</p>

        <div className="buttons">
          <Link to="/recruit" className="btn-primary">
            지원하기
          </Link>

          <a href="/#about" className="btn-ghost">
            더 알아보기
          </a>
        </div>

      </section>

      <section className="pages about" id="about">
        <h2>About</h2>
      </section>

      <section className="pages project">
        <h2>Projects</h2>
      </section>

      <section className="pages join">
        <h2>Join Us</h2>
      </section>

    </div>
  );
}

export default MainPage;