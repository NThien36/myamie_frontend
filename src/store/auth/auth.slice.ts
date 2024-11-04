import { AuthInfo, AuthPayload } from "@/models/auth.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthenticationState {
  isLogin?: boolean;
  user: AuthInfo;
  accessToken: string;
  refreshToken?: string;
}

const initialState: AuthenticationState = {
  isLogin: false,
  user: {
    id: -1,
  },
  accessToken: "",
};

export const authSlice = createSlice({
  name: "@auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthPayload>) => {
      state.isLogin = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = initialState.user;
      state.accessToken = initialState.accessToken;
      state.refreshToken = initialState.refreshToken;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
  },
});

export const { login, logout, setAccessToken, setRefreshToken } =
  authSlice.actions;

export default authSlice.reducer;
