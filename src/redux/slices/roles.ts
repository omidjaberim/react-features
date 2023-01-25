import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IRole } from "model/redux/roles";

export interface RoleState {
  roles: IRole[];
}

const initialState: RoleState = {
  roles: [],
};

export const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    rolesWasFetched: (state, action: PayloadAction<IRole[]>) => {
      state.roles = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { rolesWasFetched } = roleSlice.actions;

export default roleSlice.reducer;
