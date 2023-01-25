import { PersonKindEnum } from "constants/enum/customer.enum";
import { BaseModel } from "../base.model";

export interface CustomerEntityModel extends BaseModel {
  kind?: PersonKindEnum;
  person: {
    firstname: string;
    lastname: string;
    fatherName: string;
    gender: string;
    birthDate: string;
    birthPlace: string;
    identification: Identification;
    nationality: string;
    mobile: string;
    inquiry: {
      description: string;
      status: string;
    };
  };
  company: string;
  address: string;
  referral: {
    identification: Identification;
    mobile: {
      value: string;
      status: string;
    };
    inquiry: {
      description: string;
      status: string;
    };
  };
  documents: string;
}

export interface CustomerEntityCreateModel {
  kind?: PersonKindEnum;
  referral?: {
    identification: Identification;
    mobile: {
      value: string;
    };
  };
  person?: {
    identification: Identification;
  };
}

export interface CustomerEntityUpdateModel extends BaseModel {
  person?: {
    firstname?: string;
    lastname?: string;
    fatherName?: string;
    gender?: string;
    birthDate?: string;
    birthPlace?: string;
    identification?: Identification;
    nationality?: string;
    mobile?: string;
    email?: string;
  };
  code?: string;
  kind?: string;
}

interface Identification {
  type: string;
  no: string;
}

export interface IRegisterPersonalInfo {
  kind: string;
  person: {
    firstname: string;
    lastname: string;
    fatherName: string;
    gender: string;
    birthDate: string;
    birthPlace: string;
    identification: {
      type: string;
      no: string;
    };
    nationality: string;
    mobile: string;
    email: string;
  };
}

export interface IRegisterAddress {
  region: number | null;
  address: string;
  postalCode: string;
  tel: string;
}
