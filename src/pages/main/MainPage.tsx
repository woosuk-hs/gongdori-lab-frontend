import "./styles/MainPage.css"
import logo from "@assets/logo.svg";
import {RecruitButton} from "@components/RecruitButton.tsx";

function MainPage() {
  return (
    <div className="main-page">

      <section className="pages home" id="home">
        <div className="home-left">
          <img src={logo} className="logo" alt="logo" />
        </div>
        <div className="home-right">
          <span className="home-eyebrow">우석고 SW 개발 동아리</span>
          <h1>Gongdori</h1>
          <p>미래를 만들어가는 개발자들의 공간</p>
          <div className="buttons">
            <RecruitButton />
            <a href="https://github.com/woosuk-hs" target="_blank" rel="noreferrer" className="btn-ghost">GitHub</a>
          </div>
        </div>
      </section>

      {/*<section className="pages about" id="about">*/}
      {/*  <h2>About</h2>*/}
      {/*</section>*/}

      {/*<section className="pages project">*/}
      {/*  <h2>Projects</h2>*/}
      {/*</section>*/}

      {/*<section className="pages join">*/}
      {/*  <h2>Join Us</h2>*/}
      {/*</section>*/}

    </div>
  );
}

export default MainPage;