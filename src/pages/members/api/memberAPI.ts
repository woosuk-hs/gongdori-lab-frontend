import { api } from "@utils/api.ts";
import type {MemberRole, MemberType} from "@type/member.ts";

export interface MemberResponseDTO {
  id: number;
  username: string;
  studentId?: string;
  name: string;
  role: MemberRole;
  type: MemberType;
  github?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MemberUpdateDTO {
  username?: string;
  password?: string;
  github?: string;
  studentId?: string;
  name?: string;
  role?: MemberRole;
  type?: MemberType;
}

export const memberAPI = {
  findAll: async (): Promise<MemberResponseDTO[]> => {
    const res = await api.get<MemberResponseDTO[]>("/members");
    return res.data;
  },

  findById: async (id: number): Promise<MemberResponseDTO> => {
    const res = await api.get<MemberResponseDTO>(`/members/${id}`);
    return res.data;
  },

  update: async (id: number, dto: MemberUpdateDTO): Promise<MemberResponseDTO> => {
    const res = await api.patch<MemberResponseDTO>(`/members/${id}`, dto);
    return res.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/members/${id}`);
  },
};