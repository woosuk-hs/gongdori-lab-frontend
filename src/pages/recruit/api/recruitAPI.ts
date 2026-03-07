import { api } from "@utils/api.ts";

export type RecruitStatus = "PENDING" | "APPROVED" | "REJECTED";

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

  updateStatus: async (id: string, status: RecruitStatus): Promise<RecruitResponseDTO> => {
    const res = await api.patch<RecruitResponseDTO>(`/recruit/${id}/status`, { status });
    return res.data;
  },
};