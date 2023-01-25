import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "model/redux/user";
import { UserEntityUpdateModel } from "model/entity/user/user.model";

export interface UserState {
  usersList: IUser[];
  userById: UserEntityUpdateModel;
}

const initialState: UserState = {
  usersList: [],
  userById: {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    enabled: false,
    id: "",
    roles: [],
    attributes: {
      code: "",
      region: "",
      phone: "",
      nationalCode: "",
      gender: "",
      parentUsername: "",
      resources: [],
      userType: "",
    },
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state, action: PayloadAction<IUser[]>) => {
      state.usersList = action.payload;
    },
    getUserById: (state, action: PayloadAction<UserEntityUpdateModel>) => {
      state.userById = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUsers, getUserById } = usersSlice.actions;

export default usersSlice.reducer;
