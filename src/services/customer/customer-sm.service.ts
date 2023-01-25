import { CrudService, ModeEntity } from "../crud.service";
import { END_POINTS } from "constants/enum/end-points.enum";
import {
  CustomerEntityModel,
  CustomerEntityCreateModel,
  CustomerEntityUpdateModel,
} from "model/entity/customer/customer.model";

export class CustomerServiceSM extends CrudService<
  CustomerEntityModel,
  CustomerEntityCreateModel,
  CustomerEntityUpdateModel
> {
  entityBaseUrl = END_POINTS.CRM_MANAGMENT;
  modeEntity: ModeEntity = END_POINTS.SM;
  entityName = END_POINTS.ENTITY_CUSTOMERS;

  confirmOTP(payload: { code: string; id: string }) {
    return this.axiosInstanceWithToken.put(
      `/${this.entityBaseUrl}/${this.modeEntity}/${this.entityName}/${payload.id}/inquiries?inquiry=mobile`,
      { code: payload.code }
    );
  }
}
