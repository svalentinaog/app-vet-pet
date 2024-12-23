import { updateUserStateByKey, setUser } from "@/lib/features/userSlice";
import { UserKeys } from "@/lib/features/userState.types";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, signIn } from "@/lib/firebase";
import type { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useUserAuthentication() {
  const dispatch = useDispatch();
  const navigation = useRouter();
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  // Verificar el estado de autenticación al cargar la aplicación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({
          user: {
            email: firebaseUser.email || "",
            name: firebaseUser.displayName || "Nombre por default",
            phone: firebaseUser.phoneNumber || "",
            password: "",
            pets: [],
            profilePictureUrl: firebaseUser.photoURL || "",
            role: "user", // rol predeterminado
          },
          isAuthenticated: true,
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
          isAuthenticated: false,
        }));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const updateField = (key: UserKeys) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      if (user) {
        dispatch(updateUserStateByKey({ key, value: event.target.value }));
      }
    };
  };

  const handleSignInForm = async () => {
    const { email, password } = user;
    try {
      // Autenticación con Firebase
      const loginData = await signIn({ email, password });
      const firebaseUser = loginData.user;

      // Despachar los datos del usuario al estado global
      dispatch(setUser({
        user: {
          email: firebaseUser.email || "",
          name: firebaseUser.displayName || "Nombre por default",
          phone: firebaseUser.phoneNumber || "",
          password: "",
          pets: [],
          profilePictureUrl: firebaseUser.photoURL || "",
          role: "user", // rol predeterminado
        },
        isAuthenticated: true,
      }));

      console.log("Inicio de sesión exitoso:", loginData);
      navigation.push("/");
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