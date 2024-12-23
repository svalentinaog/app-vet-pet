"use client";
import { useEffect } from "react";
import useUserAuthentication from "@/hooks/useUserAuthentication";

export default function AuthUserProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useUserAuthentication();

  useEffect(() => {
    console.log("Usuario autenticado:", isAuthenticated, user);
  }, [isAuthenticated]);

  return <>{children}</>;
}