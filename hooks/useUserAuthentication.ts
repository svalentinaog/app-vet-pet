import { updateUserStateByKey, setUser } from "@/lib/features/userSlice";
import { UserKeys } from "@/lib/features/userState.types";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, signIn, signInWithGoogle, signUp } from "@/lib/firebase";
import type { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useUserAuthentication() {
  const dispatch = useDispatch();
  const navigation = useRouter();
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  // Verificar el estado de autenticación al cargar la aplicación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            user: {
              id: firebaseUser.uid || "",
              name: firebaseUser.displayName || "Nombre por default",
              email: firebaseUser.email || "",
              phone: firebaseUser.phoneNumber || "",
              password: "",
              confirmPassword: "",
              pets: [],
              profilePictureUrl: firebaseUser.photoURL || "",
              role: "user",
            },
            isAuthenticated: true,
          })
        );
      } else {
        dispatch(
          setUser({
            user: {
              id: "",
              name: "",
              email: "",
              phone: "",
              password: "",
              confirmPassword: "",
              pets: [],
              profilePictureUrl: "",
              role: undefined,
            },
            isAuthenticated: false,
          })
        );
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
      const loginData = await signIn({ email, password });
      const firebaseUser = loginData.user;

      if (firebaseUser) {
        dispatch(
          setUser({
            user: {
              id: firebaseUser.uid || "",
              name: firebaseUser.displayName || "Nombre por default",
              email: firebaseUser.email || "",
              phone: firebaseUser.phoneNumber || "",
              password: "",
              confirmPassword: "",
              pets: [],
              profilePictureUrl: firebaseUser.photoURL || "",
              role: "user",
            },
            isAuthenticated: true,
          })
        );
      }
      navigation.refresh();
      console.log("Inicio de sesión exitoso:", loginData);
      navigation.push("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Usuario autenticado con Google:", user);
      navigation.push("/");
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  const handleSignUpForm = async () => {
    const { name, phone, email, password } = user;

    try {
      const registerData = await signUp({
        name,
        phone,
        email,
        password,
      });
      const firebaseUser = registerData.user;

      dispatch(
        setUser({
          user: {
            id: firebaseUser.uid,
            name,

            phone,
            email: firebaseUser.email || email,
            password: "",
            confirmPassword: "",
            pets: [],
            profilePictureUrl: firebaseUser.photoURL || "",
            role: "user",
          },
          isAuthenticated: true,
        })
      );

      console.log("Registro exitoso:", registerData);
      navigation.push("/");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert(error);
    }
  };

  return {
    user,
    isAuthenticated,
    methods: {
      updateField,
      handleSignInForm,
      handleSignUpForm,
      handleGoogleSignIn,
    },
  };
}
