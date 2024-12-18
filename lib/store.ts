import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  });
};

// Inferir el tipo de makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Inferir los tipos RootState y AppDispatch a partir del store en sí mismo
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
