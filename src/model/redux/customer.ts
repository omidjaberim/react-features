import {
  GenderEnum,
  IdentificationTypeEnum,
  MediaNamesEnum,
  NationalityEnum,
  PersonKindEnum,
} from "constants/enum/customer.enum";

export interface IIdentification {
  type: IdentificationTypeEnum;
  no: string;
}

export interface IReferral {
  kind: PersonKindEnum;
  referral: {
    identification: IIdentification;
    mobile: {
      value: string;
    };
  };
  person: {
    identification?: IIdentification;
  };
}

export interface IPerson {
  firstname: string;
  lastname: string;
  fatherName: string;
  gender: GenderEnum;
  birthDate: string;
  birthPlace: string;
  identification: IIdentification;
  nationality: NationalityEnum;
  mobile: string;
  email: string;
}

export interface IAddress {
  region: number | null;
  address: string;
  postalCode: string;
  tel: string;
  province?: string;
  city?: string;
}

export interface IDocument {
  media: string;
  name: MediaNamesEnum;
}

export interface ICustomer {
  referralId: string;
  referral: IReferral;
  person: IPerson;
  address: IAddress;
  documents: IDocument[];
}
