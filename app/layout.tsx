import "./globals.css";
import { Metadata } from "next";
import { Toaster } from "sonner";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "VETPET",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" richColors />
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
