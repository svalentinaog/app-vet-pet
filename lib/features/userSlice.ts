import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { UserState, User } from "../../interfaces/types";

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
}


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null; 
      state.isAuthenticated = false;
    },
    updateProfile(state, action) {
      state.user = { ...state.user, ...action.payload }; // Actualizar solo los campos proporcionados
    },
  },
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
