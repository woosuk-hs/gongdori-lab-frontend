import { authAPI, type MemberLoginDTO } from "@utils/authAPI.ts";
import { Auth } from "@utils/auth.ts";

export type LoginParams = MemberLoginDTO;

export const LoginAPI = {
  login: async ({ username, password, rememberMe }: LoginParams): Promise<void> => {
    const tokens = await authAPI.login({ username, password, rememberMe });
    Auth.saveTokens(tokens, rememberMe);
  },
};