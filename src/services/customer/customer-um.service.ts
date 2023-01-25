import { CrudService, ModeEntity } from "../crud.service";
import { END_POINTS } from "constants/enum/end-points.enum";
import {
  CustomerEntityModel,
  CustomerEntityCreateModel,
  CustomerEntityUpdateModel,
  IRegisterPersonalInfo,
  IRegisterAddress,
} from "model/entity/customer/customer.model";

export class CustomerServiceUM extends CrudService<
  CustomerEntityModel,
  CustomerEntityCreateModel,
  CustomerEntityUpdateModel
> {
  entityBaseUrl = END_POINTS.CRM_MANAGMENT;
  modeEntity: ModeEntity = END_POINTS.UM;
  entityName = END_POINTS.ENTITY_CUSTOMERS;

  confirmOTP(payload: { code: string; id: string }) {
    return this.axiosInstanceWithToken.put(
      `/${this.entityBaseUrl}/${this.modeEntity}/${this.entityName}/${payload.id}/inquiries?inquiry=mobile`,
      { code: payload.code }
    );
  }

  registerPersonalInfo(payload: IRegisterPersonalInfo, id: string) {
    return this.axiosInstanceWithToken.patch(
      `/${this.entityBaseUrl}/${this.modeEntity}/${this.entityName}/${id}`,
      { payload }
    );
  }

  registerAddress(payload: IRegisterAddress, id: string) {
    return this.axiosInstanceWithToken.patch(
      `/${this.entityBaseUrl}/${this.modeEntity}/${this.entityName}/${id}`,
      { payload }
    );
  }
}
