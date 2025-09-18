import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import {ToastContainer} from "react-toastify";
import AuthProvider from "@/app/providers/AuthProvider";

const nunito = Nunito({subsets: ["latin"]});

export const metadata: Metadata = {
  title: {
      default:"daily.dev | Where developers suffer together",
      template:"%s | daily.dev",
  },
  description: "daily.dev | Where developers suffer together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${nunito.variable}  antialiased`}
      >
        <ToastContainer/>
      <AuthProvider>
          {children}
      </AuthProvider>
      </body>
    </html>
  );
}
