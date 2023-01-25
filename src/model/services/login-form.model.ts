export interface LoginFormModel {
  grant_type: string;
  code: string | undefined;
  redirect_uri: string;
  code_verifier: string;
}

export interface LoginFormResponse {
  access_token: string | null;
  expires_in: number | null;
  refresh_expires_in: number | null;
  refresh_token: string | null;
  token_type: string | null;
  session_state: string | null;
  scope: string | null;
  id_token: string | null;
}
