import { BaseModel } from "../base.model";

export interface RoleEntityBaseModel extends BaseModel {
  name: string;
  description: string | null;
}
export interface RoleEntityCreateModel {
  name: string;
  description: string | null;
}

export interface RoleEntityUpdateModel extends BaseModel {
  name: string;
  description: string | null;
}
