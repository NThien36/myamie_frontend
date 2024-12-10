import { AppState } from "../store";

export const tokenSelector = (state: AppState) => state.auth.accessToken;
export const refreshTokenSelector = (state: AppState) =>
  state.auth.refreshToken;

export const accountSelector = (state: AppState) => state.auth.account;
export const isLoginSelector = (state: AppState) => state.auth.isLogin;
export const accountRoleSelector = (state: AppState) => state.auth.account.role;
export const accountIdSelector = (state: AppState) => state.auth.account.id;
