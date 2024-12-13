import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserState, { IUserState, UserStateUpdate } from "./userState.types";

const userSlice = createSlice({
  name: "user",
  initialState: UserState,
  reducers: {
    setAuthenticated: (state: IUserState, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state: IUserState, action: PayloadAction<IUserState["user"]>) => {
      state.user = action.payload;
    },
    updateUserStateByKey: (
      state: IUserState,
      action: PayloadAction<UserStateUpdate>
    ) => {
      if (state.user) {
        (state.user as any)[action.payload.key] = action.payload.value; // cambiar luego :D
      }
    },
  },
});

export const { updateUserStateByKey, setAuthenticated, setUser } =
  userSlice.actions;
export default userSlice.reducer;
