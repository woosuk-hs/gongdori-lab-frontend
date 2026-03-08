import type {MemberRole, MemberType} from "@type/member";

export const ROLE_LABEL: Record<MemberRole, string> = {
  ADMIN: "관리자",
  MEMBER: "멤버",
};

export const TYPE_LABEL: Record<MemberType, string> = {
  STUDENT: "학생",
  TEACHER: "선생님",
};