import "./styles/MainPage.css"
import logo from "@assets/logo.svg";
import codeIcon from "@assets/code.svg";
import usersIcon from "@assets/users.svg";
import trendingUpIcon from "@assets/trending-up.svg";
import calendarIcon from "@assets/calendar.svg";
import { RecruitButton } from "@components/RecruitButton.tsx";
import { Link } from "react-router-dom";
import { CONFIG } from "@utils/config.ts";

function MainPage() {
  return (
    <div className="main-page">

      <div className="recruit-time">
        <p className="recruit-title">
          <img src={calendarIcon} alt="면접" />면접 일정</p>
        <div className="recruit-time-box">
          <p>
            <span className="recruit-warning">지원마감</span><br />
            <span className="highlight">{CONFIG.YEAR}년 3월 16일 (월요일) 6교시</span><br/>
            장소: <span className="highlight">본관 4층 홈베이스</span><br/>
            준비물: <span className="highlight">스마트폰, 필기구</span><br/>
            합격자 확인일자: <span className="highlight">3월 17일 00시</span><br />
            <span className="recruit-warning">6교시 이전 참석</span>
          </p>
        </div>
      </div>

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
            <Link to="/test" target="_blank" rel="noreferrer" className="btn-ghost">문제 바로가기</Link>
          </div>
        </div>
      </section>

      <section className="pages about" id="about">
        <div className="about-inner">
          <span className="section-eyebrow">ABOUT US</span>
          <h2 className="section-title">우리는 이런 팀이에요</h2>
          <div className="about-cards">
            <div className="about-card">
              <img src={codeIcon} alt="개발" className="about-card__icon" />
              <h3>개발</h3>
              <p>웹, 앱, 서버 등 다양한 분야의 개발을 직접 경험해요.</p>
            </div>
            <div className="about-card">
              <img src={usersIcon} alt="협업" className="about-card__icon" />
              <h3>협업</h3>
              <p>팀 프로젝트를 통해 함께 문제를 해결하는 법을 배워요.</p>
            </div>
            <div className="about-card">
              <img src={trendingUpIcon} alt="성장" className="about-card__icon" />
              <h3>성장</h3>
              <p>코드 리뷰와 스터디를 통해 빠르게 성장할 수 있어요.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pages join" id="join">
        <div className="join-inner">
          <span className="section-eyebrow">RECRUITMENT {CONFIG.YEAR}</span>
          <h2 className="section-title">함께하고 싶나요?</h2>
          <p className="join-desc">
            Gongdori는 열정 있는 개발자를 기다리고 있어요.<br />
            언어나 경험에 상관없이 배우고자 하는 마음이면 충분해요.
          </p>
          <div className="join-actions">
            <RecruitButton />
            <Link to="/recruit/check" className="btn-ghost">합격 확인</Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default MainPage;