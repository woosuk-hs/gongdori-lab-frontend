import { useEffect, useState } from "react";
import { memberAPI, type MemberResponseDTO } from "./api/memberAPI";
import "./styles/MembersPage.css";
import {TYPE_LABEL} from "@utils/label/memberType.ts";

function MembersPage() {
  const [list, setList] = useState<MemberResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    memberAPI.findAll().then(setList).finally(() => setLoading(false));
  }, []);

  const admins = list.filter((m) => m.role === "ADMIN");
  const members = list.filter((m) => m.role === "MEMBER");

  if (loading) return <div className="members-loading">불러오는 중...</div>;

  return (
    <div className="members-page">
      <div className="members-header">
        <span className="members-eyebrow">OUR TEAM</span>
        <h1 className="members-title">Members</h1>
        <p className="members-desc">Gongdori와 함께하는 멤버들을 소개합니다.</p>
      </div>

      {admins.length > 0 && (
        <section className="members-section">
          <h2 className="members-section-title">운영진</h2>
          <div className="members-grid">
            {admins.map((m) => <MemberCard key={m.id} member={m} />)}
          </div>
        </section>
      )}

      {members.length > 0 && (
        <section className="members-section">
          <h2 className="members-section-title">멤버</h2>
          <div className="members-grid">
            {members.map((m) => <MemberCard key={m.id} member={m} />)}
          </div>
        </section>
      )}
    </div>
  );
}

function MemberCard({ member }: { member: MemberResponseDTO }) {
  return (
    <div className="member-card">
      <div className="member-avatar">
        <span>{member.name.charAt(0)}</span>
      </div>
      <div className="member-info">
        <div className="member-name-row">
          <span className="member-name">{member.name}</span>
          <span className={`member-type-badge ${member.type.toLowerCase()}`}>
            {TYPE_LABEL[member.type]}
          </span>
        </div>
        {member.studentId && (
          <span className="member-student-id">{member.studentId}</span>
        )}
        {member.github && (
          <a
            className="member-github"
            href={member.github}
            target="_blank"
            rel="noreferrer"
          >
        {member.github.replace("https://github.com/", "@")}
          </a>
          )}
      </div>
    </div>
  );
}

export default MembersPage;