// import {
//     QueryEntityCreateModel,
//     QueryEntityModel,
//     QueryEntityUpdateModel,
//   } from "./../model/entity/query.model";
import {
  UserEntityBaseModel,
  UserEntityCreateModel,
  UserEntityUpdateModel,
} from "model/entity/user/user.model";
import { END_POINTS } from "constants/enum/end-points.enum";
import { CrudService, ModeEntity } from "../crud.service";

export class UserServiceUM extends CrudService<
  UserEntityBaseModel,
  UserEntityCreateModel,
  UserEntityUpdateModel
> {
  entityBaseUrl = END_POINTS.USER_MANAGMENT;
  modeEntity: ModeEntity = END_POINTS.UM;
  entityName = END_POINTS.ENTITY_USER;
}
