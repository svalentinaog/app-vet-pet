import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/lib/store";
import { signIn } from "@/lib/firebase";
import { updateUserStateByKey, setUser } from "@/lib/features/userSlice";
import { UserKeys } from "@/lib/features/userState.types";

export default function useUserAuthentication() {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);

  // Actualizar entrada de texto
  const updateField = (key: UserKeys) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      if (user) {
        console.log("Actualizando campo:", key, "Valor:", event.target.value);
        dispatch(updateUserStateByKey({ key, value: event.target.value }));
      }
    };
  };

  const handleSignInForm = async () => {
    const { email, password } = user;
    const loginData = await signIn({ email, password })
    console.log(loginData)
  }

  // Registro
  const handleSignUpForm = async () => {
    if (user) {
      const { name, email, phone, password } = user;

      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, password }),
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(setUser(data));
        } else {
          console.error("Error al registrar el usuario");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };

  return {
    user,
    methods: { updateField, handleSignUpForm, handleSignInForm },
  };
}
