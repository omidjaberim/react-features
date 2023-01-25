import { END_POINTS } from "constants/enum/end-points.enum";
import {
  UserEntityBaseModel,
  UserEntityCreateModel,
  UserEntityUpdateModel,
} from "model/entity/user/user.model";
import { CrudService, ModeEntity } from "../crud.service";

export class UserServiceSM extends CrudService<
  UserEntityBaseModel,
  UserEntityCreateModel,
  UserEntityUpdateModel
> {
  entityBaseUrl = END_POINTS.USER_MANAGMENT;
  modeEntity: ModeEntity = END_POINTS.SM;
  entityName = END_POINTS.ENTITY_USER;

  enableDisableUser(payload: { enable: boolean; id: string }) {
    return this.axiosInstanceWithToken.patch(
      `/${this.entityBaseUrl}/${this.modeEntity}/${this.entityName}/${payload.id}/${payload.enable}`
    );
  }
}
