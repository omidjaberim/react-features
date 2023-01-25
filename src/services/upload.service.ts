import { END_POINTS } from "constants/enum/end-points.enum";
import { ApiResponse } from "model/services/api-response.model";
import * as tus from "tus-js-client";
import { BaseService } from "./base.service";


 export class UploadServiceApi extends BaseService {
    uploadFilRestapi(payload?: any): Promise<ApiResponse<any>> {
      return this.axiosInstanceWithToken.post(
        "/upload",
        payload
      );
    }
}



