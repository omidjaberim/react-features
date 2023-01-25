// custom
import { ApiPayload } from "../model/services/api-payload.model";
import { ApiResponse } from "./../model/services/api-response.model";
import { BaseService } from "./base.service";

export type ModeEntity = "sm" | "gm" | "um";

export abstract class CrudService<
  EntityModel,
  EntityCreateModel,
  EntityUpdateModel
> extends BaseService {
  abstract entityBaseUrl: string;
  abstract modeEntity?: ModeEntity;
  abstract entityName?: string;

  create(payload: EntityCreateModel) {
    return this.axiosInstanceWithToken.post(
      `/${this.entityBaseUrl}/${this.modeEntity}/${this.entityName}`,
      payload
    );
  }

  update(payload: EntityUpdateModel, entityId: string) {
    return this.axiosInstanceWithToken.put(
      `/${this.entityBaseUrl}/${this.modeEntity}/${this.entityName}/${entityId}`,
      payload
    );
  }

  getList(payload?: ApiPayload): Promise<ApiResponse<Array<EntityModel>>> {
    return this.axiosInstanceWithToken.get(
      `/${this.entityBaseUrl}/${this.modeEntity}/${this.entityName}`,
      { params: payload }
    );
  }

  getById(entityId: string): Promise<ApiResponse<EntityModel>> {
    return this.axiosInstanceWithToken.get(
      `/${this.entityBaseUrl}/${this.modeEntity}/${this.entityName}/${entityId}`
    );
  }

  delete(entityId: string) {
    return this.axiosInstanceWithToken.delete(
      `/${this.entityBaseUrl}/${this.modeEntity}/${this.entityName}/${entityId}`
    );
  }
}
