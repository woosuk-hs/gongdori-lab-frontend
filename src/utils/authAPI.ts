import {Auth, type TokenDTO} from "@utils/auth.ts";
import {api} from "@utils/api.ts";

export interface MemberLoginDTO {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface MemberCreateDTO {
  username: string;
  password: string;
  name: string;
  studentId?: string;
  inviteCode: string;
}

export const authAPI = {
  login: async (dto: MemberLoginDTO): Promise<TokenDTO> => {
    const res = await api.post<TokenDTO>("/auth/login", dto);
    return res.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
    Auth.clear();
  },

  refresh: async (): Promise<TokenDTO> => {
    const refreshToken = Auth.getRefreshToken();
    const res = await api.post<TokenDTO>("/auth/refresh", JSON.stringify(refreshToken), {
      headers: {"Content-Type": "application/json"},
    });
    Auth.saveTokens(res.data);
    return res.data;
  },

  join: async (dto: MemberCreateDTO): Promise<number> => {
    const res = await api.post<number>("/auth/join", dto);
    return res.data;
  },
};