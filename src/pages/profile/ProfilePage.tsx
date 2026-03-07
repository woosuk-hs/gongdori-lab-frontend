import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@utils/api.ts";
import { MemberTypeLabel } from "@utils/label/memberType.ts";
import type { MemberType } from "@type/member.ts";
import githubIcon from "@assets/github.svg";
import "./styles/ProfilePage.css";

interface MemberResponseDTO {
  id: number;
  username: string;
  name: string;
  role: string;
  type: MemberType;
  studentNumber: string;
  github?: string;
  createdAt: string;
  updatedAt: string;
}

function ProfilePage() {
  const [profile, setProfile] = useState<MemberResponseDTO | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get<MemberResponseDTO>("/members/me")
      .then((res) => setProfile(res.data))
      .catch(() => setError("프로필 정보를 불러올 수 없습니다."));
  }, []);

  if (error) return <div className="profile-error">{error}</div>;
  if (!profile) return <div className="profile-loading">불러오는 중...</div>;

  const avatarUrl = profile.github
    ? `https://avatars.githubusercontent.com/${profile.github}`
    : null;
  const initials = profile.name?.slice(0, 1) ?? "?";
  const isAdmin = profile.role === "ADMIN";

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {avatarUrl ? (
              <img src={avatarUrl} alt={profile.name} />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <div className="profile-header-info">
            <div className="profile-name-row">
              <h1 className="profile-name">{profile.name}</h1>
              <span className={`profile-role-badge ${isAdmin ? "admin" : ""}`}>
                {isAdmin ? "관리자" : "멤버"}
              </span>
            </div>
            <p className="profile-username">@{profile.username}</p>
            {profile.github && (
              <a
                className="profile-github-link"
                href={`https://github.com/${profile.github}`}
                target="_blank"
                rel="noreferrer"
              >
              <img src={githubIcon} alt="github" width={14} height={14} />
            {profile.github}
              </a>
              )}
          </div>
        </div>

        <div className="profile-divider" />

        <dl className="profile-details">
          <div className="profile-detail-row">
            <dt>구분</dt>
            <dd>{MemberTypeLabel[profile.type]}</dd>
          </div>
          {profile.studentNumber && (
            <div className="profile-detail-row">
              <dt>학번</dt>
              <dd>{profile.studentNumber}</dd>
            </div>
          )}
          <div className="profile-detail-row">
            <dt>가입일</dt>
            <dd>{new Date(profile.createdAt).toLocaleDateString("ko-KR", {
              year: "numeric", month: "long", day: "numeric"
            })}</dd>
          </div>
          <div className="profile-detail-row">
            <dt>최근 수정</dt>
            <dd>{new Date(profile.updatedAt).toLocaleDateString("ko-KR", {
              year: "numeric", month: "long", day: "numeric"
            })}</dd>
          </div>
        </dl>

        <button className="profile-edit-btn" onClick={() => navigate("/profile/edit")}>
          프로필 수정
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;