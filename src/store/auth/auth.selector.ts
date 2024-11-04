import { AppState } from "../store";

export const tokenSelector = (state: AppState) => state.auth.accessToken;
export const refreshTokenSelector = (state: AppState) =>
  state.auth.refreshToken;

export const userSelector = (state: AppState) => state.auth.user;
export const isLoginSelector = (state: AppState) => state.auth.isLogin;
export const userRoleSelector = (state: AppState) => state.auth.user.role;
