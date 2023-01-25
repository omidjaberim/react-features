import { LoginFormResponse } from "model/services/login-form.model";

export interface IAuth {
  isLogin: boolean;
  isLogout: boolean;
  permissions: string[];
  token: LoginFormResponse;
  pkce: Pkce;
  pkceCount: number;
}
export interface Pkce {
  code_challenge: string;
  code_verifier: string;
}
