import "../styles/main.scss";
import { Metadata } from "next";
import { Toaster } from "sonner";
import { Poppins } from "next/font/google";
import StoreProvider from "./StoreProvider";
import BaseLayout from "@/components/layout/BaseLayout";
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
    <ThemeProvider theme={theme}>
      <html lang="en" className={poppins.className}>
        <body className={poppins.className}>
          <BaseLayout>
            <Toaster position="top-center" richColors />
            <StoreProvider>{children}</StoreProvider>
          </BaseLayout>
        </body>
      </html>
    </ThemeProvider>
  );
}
