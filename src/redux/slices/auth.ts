import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { LoginFormResponse } from "model/services/login-form.model";
import type { IPkce } from "model/redux/pkce";

export interface AuthState {
  isLogin: boolean;
  isLogout: boolean;
  permissions: string[];
  token: LoginFormResponse;
  pkce: {
    code_challenge: string;
    code_verifier: string;
  };
  pkceCount: number;
}

const initialState: AuthState = {
  isLogin: false,
  isLogout: false,
  pkceCount: 0,
  permissions: [],
  token: {
    access_token: "",
    id_token: "",
    expires_in: 0,
    refresh_expires_in: 0,
    refresh_token: "",
    token_type: "",
    session_state: "",
    scope: "",
  },
  pkce: {
    code_challenge: "", //// pkce state
    code_verifier: "", //// pkce state
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.isLogin = true;
      state.isLogout = false;
      state.permissions = action.payload.permissions;
      state.token.access_token = action.payload.token.access_token;
      state.token.expires_in = action.payload.token.expires_in;
      state.token.refresh_expires_in = action.payload.token.refresh_expires_in;
      state.token.refresh_token = action.payload.token.refresh_token;
      state.token.token_type = action.payload.token.token_type;
      state.token.session_state = action.payload.token.session_state;
      state.token.scope = action.payload.token.scope;
      state.token.id_token = action.payload.token.id_token;
    },
    logOut: (state) => {
      state.isLogin = false;
      state.isLogout = true;
      state.permissions = [];
      state.token.access_token = null;
      state.token.expires_in = null;
      state.token.refresh_expires_in = null;
      state.token.refresh_token = null;
      state.token.token_type = null;
      state.token.session_state = null;
      state.token.scope = null;
      state.token.id_token = null;
    },
    pkceState: (state, action: PayloadAction<IPkce>) => {
      state.pkce = action.payload;
      state.pkceCount = state.pkceCount + 1;
    },
    getRefreshToken: (state, action: PayloadAction<LoginFormResponse>) => {
      state.token.access_token = action.payload.access_token;
      state.token.refresh_token = action.payload.refresh_token;
      state.token.id_token = action.payload.id_token;
      state.token.session_state = action.payload.session_state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logOut, pkceState, getRefreshToken } = authSlice.actions;

export default authSlice.reducer;
