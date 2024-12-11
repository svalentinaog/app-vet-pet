import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";

//TODO Configuración de la store
const store = configureStore({
  reducer: {
    user: userSlice, 
  },
});

export default store;

//TODO Inferencia de tipos para el estado raíz y el dispatch
export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;          
