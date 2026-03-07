import { useState, useEffect, useCallback } from "react";
import { api } from "@utils/api";
import { Auth } from "@utils/auth";

export interface MemberResponseDTO {
  id: number;
  username: string;
  name: string;
  role: string;
  type: string;
  studentNumber: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  member: MemberResponseDTO | null;
  loading: boolean;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

export function useAuth(): AuthState {
  const [member, setMember] = useState<MemberResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    if (!Auth.isLoggedIn()) {
      setMember(null);
      setLoading(false);
      return;
    }
    try {
      const res = await api.get<MemberResponseDTO>("/members/me");
      setMember(res.data);
    } catch {
      Auth.clear();
      setMember(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMe();
    window.addEventListener("auth:change", fetchMe);
    return () => window.removeEventListener("auth:change", fetchMe);
  }, [fetchMe]);

  return {
    member,
    loading,
    isLoggedIn: !!member,
    isAdmin: member?.role === "ADMIN",
  };
}