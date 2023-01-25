import { END_POINTS } from "constants/enum/end-points.enum";
import {
  RoleEntityBaseModel,
  RoleEntityCreateModel,
  RoleEntityUpdateModel,
} from "model/entity/role/role.model";
import { CrudService, ModeEntity } from "../crud.service";

export class RoleServiceSM extends CrudService<
  RoleEntityBaseModel,
  RoleEntityCreateModel,
  RoleEntityUpdateModel
> {
  entityBaseUrl = END_POINTS.USER_MANAGMENT;
  modeEntity: ModeEntity = END_POINTS.SM;
  entityName = END_POINTS.ENTITY_ROLES;
}
