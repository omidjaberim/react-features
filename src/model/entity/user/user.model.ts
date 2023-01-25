import { BaseModel } from "../base.model";

export interface UserEntityBaseModel extends BaseModel {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  roles: Array<Roles>;
  attributes: Attributes;
}

export interface UserEntityCreateModel {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  roles: Array<Roles>;
  attributes: Attributes;
}

export interface UserEntityUpdateModel extends BaseModel {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  roles: Array<Roles>;
  attributes: Attributes;
}

interface Roles {
  id: string;
  name: string | undefined | null;
  description: string | null;
}

interface Attributes {
  code: string | null;
  region: string | null | number;
  phone: string | null;
  nationalCode: string | null;
  gender: string | null;
  parentUsername: string | null;
  resources?: number[];
  userType: string;
}
