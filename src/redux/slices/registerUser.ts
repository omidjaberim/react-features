import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  IAddress,
  ICustomer,
  IDocument,
  IPerson,
  IReferral,
} from "model/redux/customer";

import {
  GenderEnum,
  IdentificationTypeEnum,
  MediaNamesEnum,
  NationalityEnum,
  PersonKindEnum,
} from "constants/enum/customer.enum";

const initialState: ICustomer = {
  referralId: "",
  referral: {
    kind: PersonKindEnum.NATURAL,
    referral: {
      identification: {
        type: IdentificationTypeEnum.NATIONAL_CODE,
        no: "",
      },
      mobile: {
        value: "",
      },
    },
    person: {
      identification: {
        type: IdentificationTypeEnum.NATIONAL_CODE,
        no: "",
      },
    },
  },
  person: {
    firstname: "",
    lastname: "",
    fatherName: "",
    gender: GenderEnum.MAIL,
    birthDate: "",
    birthPlace: "",
    identification: {
      type: IdentificationTypeEnum.NATIONAL_CODE,
      no: "",
    },
    nationality: NationalityEnum.IRN,
    mobile: "",
    email: "",
  },
  address: {
    region: null,
    province: "",
    city: "",
    address: "",
    postalCode: "",
    tel: "",
  },
  documents: [
    {
      media: "",
      name: MediaNamesEnum.NATIONAL_CARD,
    },
  ],
};

const registerUserSlice = createSlice({
  name: "registerUser",
  initialState,
  reducers: {
    saveReferalId: (state, action: PayloadAction<string>) => {
      state.referralId = action.payload;
    },
    addReferral: (state, action: PayloadAction<IReferral>) => {
      state.referral = action.payload;
    },
    addNationality: (state, action: PayloadAction<NationalityEnum>) => {
      state.person.nationality = action.payload;
    },
    addPersonInfo: (state, action: PayloadAction<IPerson>) => {
      return { ...state, person: action.payload };
    },
    addAddress: (state, action: PayloadAction<IAddress>) => {
      state.address = action.payload;
    },
    addDocuments: (state, action: PayloadAction<IDocument[]>) => {
      state.documents = action.payload;
    },
  },
});

export default registerUserSlice.reducer;
export const {
  addAddress,
  addDocuments,
  addNationality,
  addPersonInfo,
  addReferral,
  saveReferalId,
} = registerUserSlice.actions;
