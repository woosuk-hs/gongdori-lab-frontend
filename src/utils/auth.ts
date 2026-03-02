// const ACCESS_TOKEN_KEY = "accessToken";
// const REFRESH_TOKEN_KEY = "refreshToken";
//
// type AuthChangeCallback = (loggedIn: boolean) => void;
//
// export const Auth = {
//   _onChange: null as AuthChangeCallback | null,
//
//   isLoggedIn(): boolean {
//     return !!localStorage.getItem(ACCESS_TOKEN_KEY);
//   },
//
//   login(accessToken: string, refreshToken: string) {
//     localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
//     localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
//     Auth._onChange?.(true);
//   },
//
//   logout() {
//     localStorage.removeItem(ACCESS_TOKEN_KEY);
//     localStorage.removeItem(REFRESH_TOKEN_KEY);
//     Auth._onChange?.(false);
//   },
//
//   subscribe(callback: AuthChangeCallback) {
//     Auth._onChange = callback;
//   },
//
//   getAccessToken() {
//     return localStorage.getItem(ACCESS_TOKEN_KEY);
//   },
//
//   getRefreshToken() {
//     return localStorage.getItem(REFRESH_TOKEN_KEY);
//   },
// };
const ACCESS_TOKEN_KEY = "accessToken";

export const Auth = {
  _onChange: null as ((loggedIn: boolean) => void) | null,

  login(accessToken: string, rememberMe: boolean) {
    if (rememberMe) {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    } else {
      sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    }
    Auth._onChange?.(true);
  },

  logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    Auth._onChange?.(false);
  },

  isLoggedIn(): boolean {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY) || !!sessionStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY);
  },

  subscribe(callback: (loggedIn: boolean) => void) {
    Auth._onChange = callback;
  },
};