import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";

// Configuración de la store
const store = configureStore({
  reducer: {
    user: userSlice, // Integración del slice `user`
  },
});

export default store;

// Inferencia de tipos para el estado raíz y el dispatch
export type RootState = ReturnType<typeof store.getState>; // Tipo del estado raíz
export type AppDispatch = typeof store.dispatch;          // Tipo del dispatch
