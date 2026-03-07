export interface TokenDTO {
  access: string;
  refresh: string;
}

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

function dispatchAuthChange() {
  window.dispatchEvent(new Event("auth:change"));
}

export const Auth = {
  saveTokens(tokens: TokenDTO, remember: boolean = false): void {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(ACCESS_TOKEN_KEY, tokens.access);
    storage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
    dispatchAuthChange();
  },

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
      ?? sessionStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
      ?? sessionStorage.getItem(REFRESH_TOKEN_KEY);
  },

  isLoggedIn(): boolean {
    return !!Auth.getAccessToken();
  },

  clear(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    dispatchAuthChange();
  },

  logout(): void {
    Auth.clear();
  },
};