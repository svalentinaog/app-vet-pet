import "../styles/main.scss";
import { Metadata } from "next";
import { Toaster } from "sonner";
import { ThemeProvider } from "@mui/material/styles";
import StoreProvider from "./StoreProvider";
import AuthUserProvider from "./AuthUserProvider";
import { Poppins } from "next/font/google";
import { theme } from "@/styles/theme";

// Fuente Poppins
const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VETPET",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body className={poppins.className}>
        <ThemeProvider theme={theme}>
          <StoreProvider>
            <AuthUserProvider>
              <Toaster position="top-center" richColors />
              {children}
            </AuthUserProvider>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
