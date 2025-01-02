import { AuthInfo, AuthPayload } from "@/models/auth.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthenticationState {
  isLogin?: boolean;
  account: AuthInfo;
  accessToken: string;
  refreshToken?: string;
}

const initialState: AuthenticationState = {
  isLogin: false,
  account: {
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
      state.account = action.payload.account;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.isLogin = false;
      state.account = initialState.account;
      state.accessToken = initialState.accessToken;
      state.refreshToken = initialState.refreshToken;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    updateAvatar: (state, action: PayloadAction<string>) => {
      if (state.account) {
        state.account.avatar = action.payload; // Update the avatar field
      }
    },
  },
});

export const { login, logout, setAccessToken, setRefreshToken, updateAvatar } =
  authSlice.actions;

export default authSlice.reducer;
