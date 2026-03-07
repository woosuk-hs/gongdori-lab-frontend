import { useState, type SyntheticEvent } from "react";
import {Link, useNavigate} from "react-router-dom";
import { recruitAPI, type RecruitDTO } from "./api/recruitAPI";
import "./styles/RecruitPage.css";
import {CONFIG} from "@utils/config.ts";

const LANGUAGE_OPTIONS = ["JavaScript", "TypeScript", "Python", "Java", "Kotlin", "C", "C++", "Go", "Rust", "Swift"];

function RecruitPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Omit<RecruitDTO, "status">>({
    studentId: "",
    name: "",
    languages: [],
    motivation: "",
    github: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleLanguage = (lang: string) => {
    setForm((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }));
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // if (form.languages.length === 0) {
    //   setError("사용 가능한 언어를 최소 1개 선택하세요.");
    //   return;
    // }

    setLoading(true);
    try {
      await recruitAPI.join(form);
      navigate("/recruit/done");
    } catch {
      setError("지원 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recruit-page">
      <div className="recruit-header">
        <span className="recruit-label">RECRUITMENT { CONFIG.YEAR }</span>
        <h1>Join Gongdori</h1>
        <p>함께 미래를 만들어갈 개발자를 기다립니다</p>
      </div>

      <form className="recruit-form" onSubmit={handleSubmit}>
        <div className="field-group">
          <label>학번</label>
          <input
            type="text"
            placeholder="10101"
            value={form.studentId}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 5);
              setForm((p) => ({ ...p, studentId: val }));
            }}
            maxLength={5}
            pattern="\d{5}"
            inputMode="numeric"
            required
          />
          {form.studentId.length > 0 && form.studentId.length < 5 && (
            <span className="field-hint error">학번은 5자리 숫자여야 합니다.</span>
          )}
        </div>

        <div className="field-group">
          <label>이름</label>
          <input
            type="text"
            placeholder="홍길동"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            required
          />
        </div>

        <div className="field-group">
          <label>사용 가능한 언어</label>
          <div className="lang-grid">
            {LANGUAGE_OPTIONS.map((lang) => (
              <button
                key={lang}
                type="button"
                className={`lang-chip ${form.languages.includes(lang) ? "selected" : ""}`}
                onClick={() => toggleLanguage(lang)}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <div className="field-group">
          <label>지원 동기</label>
          <textarea
            placeholder="Gongdori에 지원하는 이유를 적어주세요."
            value={form.motivation}
            onChange={(e) => setForm((p) => ({ ...p, motivation: e.target.value }))}
            rows={5}
            required
          />
        </div>

        <div className="field-group">
          <label>GitHub <span className="optional">(선택)</span></label>
          <input
            type="url"
            placeholder="https://github.com/username"
            value={form.github}
            onChange={(e) => setForm((p) => ({ ...p, github: e.target.value }))}
          />
        </div>

        {error && <p className="recruit-error">{error}</p>}

        <button type="submit" className="recruit-submit" disabled={loading}>
          {loading ? "제출 중..." : "지원하기 →"}
        </button>
        <Link to="/recruit/check" className="recruit-check-link">
          합격 확인하기
        </Link>
      </form>
    </div>
  );
}

export default RecruitPage;