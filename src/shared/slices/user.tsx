import { UserObjectType } from "@/shared/types/UserType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { user: UserObjectType | null } = {
  user: {} as UserObjectType,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: UserObjectType | null }>
    ) => {
      state.user = action.payload.user;
    },
  },
});

export const { actions, reducer } = userSlice;
