// custom
import { ApiResponse } from "model/services/api-response.model";
import {
  LoginFormModel,
  LoginFormResponse,
} from "model/services/login-form.model";
import { BaseService } from "./base.service";
import { store } from "redux/store";

export class LoginService extends BaseService {
  login(payload: LoginFormModel): Promise<ApiResponse<LoginFormResponse>> {
    return this.axiosInstanceWithTokenForLogin.post(
      "/realms/smartbss/protocol/openid-connect/token",
      payload
    );
  }
  refreshToken(): Promise<ApiResponse<LoginFormResponse>> {
    return this.axiosInstanceWithTokenForLogin.post(
      "/realms/smartbss/protocol/openid-connect/token",
      {
        grant_type: "refresh_token",
        refresh_token: store.getState().auth.token.refresh_token,
      }
    );
  }
}
