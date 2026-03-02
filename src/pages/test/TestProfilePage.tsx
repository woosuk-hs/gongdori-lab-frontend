import { useEffect, useState } from "react";
import { api } from "@utils/api.ts";

interface MemberResponseDTO {
  id: number;
  username: string;
  name: string;
  role: string;
  type: string;
  studentNumber: string;
  createdAt: string;
  updatedAt: string;
}

function TestProfilePage() {
  const [profile, setProfile] = useState<MemberResponseDTO | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get<MemberResponseDTO>("/members/me");
        setProfile(res.data);
      } catch (err) {
        console.error(err);
        setError("프로필 정보를 불러올 수 없습니다.");
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p>{error}</p>;
  if (!profile) return <p>로딩중...</p>;

  return (
    <div className="profile-page">
      <h1>내 정보</h1>
      <ul>
        <li>ID: {profile.id}</li>
        <li>Username: {profile.username}</li>
        <li>Name: {profile.name}</li>
        <li>Role: {profile.role}</li>
        <li>Type: {profile.type}</li>
        <li>Student Number: {profile.studentNumber}</li>
        <li>Created At: {new Date(profile.createdAt).toLocaleString()}</li>
        <li>Updated At: {new Date(profile.updatedAt).toLocaleString()}</li>
      </ul>
    </div>
  );
}

export default TestProfilePage;