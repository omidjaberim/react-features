// import {
//     QueryEntityCreateModel,
//     QueryEntityModel,
//     QueryEntityUpdateModel,
//   } from "./../model/entity/query.model";
import { CrudService, ModeEntity } from "../crud.service";
import { END_POINTS } from "constants/enum/end-points.enum";
import {
  UserEntityBaseModel,
  UserEntityCreateModel,
  UserEntityUpdateModel,
} from "model/entity/user/user.model";

export class UserServiceGM extends CrudService<
  UserEntityBaseModel,
  UserEntityCreateModel,
  UserEntityUpdateModel
> {
  entityBaseUrl = END_POINTS.USER_MANAGMENT;
  modeEntity: ModeEntity = END_POINTS.GM;
  entityName = END_POINTS.ENTITY_USER;
}
