import { api } from "@utils/api.ts";
import type { RecruitStatus } from "@type/recruit.ts";

export const STATUS_LABEL: Record<RecruitStatus, string> = {
  PENDING: "검토중",
  ACCEPTED: "합격",
  REJECTED: "불합격",
};

export const STATUS_NEXT: Record<RecruitStatus, RecruitStatus[]> = {
  PENDING: ["ACCEPTED", "REJECTED"],
  ACCEPTED: ["PENDING", "REJECTED"],
  REJECTED: ["PENDING", "ACCEPTED"],
};

export const STATUS_DESC: Record<RecruitStatus, string> = {
  PENDING: "아직 검토 중이에요. 조금만 기다려주세요.",
  ACCEPTED: "축하해요! Gongdori에 합격했어요.",
  REJECTED: "아쉽게도 이번에는 함께하지 못했어요.",
};

export interface RecruitDTO {
  studentId: string;
  name: string;
  languages: string[];
  motivation: string;
  github?: string;
  status?: RecruitStatus;
}

export interface RecruitResponseDTO {
  id: number;
  studentId: string;
  name: string;
  languages: string[];
  motivation: string;
  github?: string;
  status: RecruitStatus;
  inviteCode?: string;
}

export interface RecruitUpdateDTO {
  status: RecruitStatus;
}

export const recruitAPI = {
  join: async (dto: RecruitDTO): Promise<RecruitDTO> => {
    const res = await api.post<RecruitDTO>("/recruit", dto);
    return res.data;
  },

  findAll: async (): Promise<RecruitResponseDTO[]> => {
    const res = await api.get<RecruitResponseDTO[]>("/recruit");
    return res.data;
  },

  findByStudentId: async (studentId: string): Promise<RecruitResponseDTO> => {
    const res = await api.get<RecruitResponseDTO>(`/recruit/${studentId}`);
    return res.data;
  },

  updateStatus: async (studentId: string, status: RecruitStatus): Promise<RecruitResponseDTO> => {
    const res = await api.patch<RecruitResponseDTO>(`/recruit/${studentId}/status`, { status });
    return res.data;
  },

  delete: async (studentId: string): Promise<void> => {
    await api.delete(`/recruit/${studentId}`);
  },
};