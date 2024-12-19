import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/lib/store";
import { auth, signIn } from "@/lib/firebase";
import { updateUserStateByKey, setUser } from "@/lib/features/userSlice";
import { UserKeys } from "@/lib/features/userState.types";
import { onAuthStateChanged } from "firebase/auth";

export default function useUserAuthentication() {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  const updateField = (key: UserKeys) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      if (user) {
        // console.log("Actualizando campo:", key, "Valor:", event.target.value);
        dispatch(updateUserStateByKey({ key, value: event.target.value }));
      }
    };
  };
  
  const handleSignInForm = async () => {
    const { email, password } = user;
    try {
      const loginData = await signIn({ email, password });
      console.log("Inicio de sesión exitoso:", loginData);
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log("^=.=^", user)
        if (user) {
          dispatch(setUser({ 
            user: {
              email: user.email || "",
              name: user.displayName || "Nombre por default",
              phone: user.phoneNumber || "",
              password: "",
              pets: [],
              profilePictureUrl: user.photoURL || "",
              role: "user", // rol predeterminado
            },
            isAuthenticated: true, // Usuario autenticado
          }));
        } else {
          dispatch(setUser({
            user: {
              email: "",
              name: "",
              phone: "",
              password: "",
              pets: [],
              profilePictureUrl: "",
              role: undefined,
            },
            isAuthenticated: false, // Usuario no autenticado
          }));
        }
      });
    
      return () => unsubscribe(); 
      // window.location.href = "/"; // Redirige a la página protegida
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };
  
  return {
    user,
    isAuthenticated,
    methods: { updateField, handleSignInForm },
  };
}
