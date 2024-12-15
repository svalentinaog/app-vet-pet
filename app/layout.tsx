import "../styles/main.scss";
import { Metadata } from "next";
import { Toaster } from "sonner";
import { Poppins } from "next/font/google";
import StoreProvider from "./StoreProvider";
import { ThemeProvider } from "@mui/system";
import { theme } from "@/styles/theme";

export const metadata: Metadata = {
  title: "VETPET",
};

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

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
            <Toaster position="top-center" richColors />
            {children}
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
