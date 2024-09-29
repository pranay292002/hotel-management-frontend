

import type { Metadata } from "next";

import "./globals.css";
import Sidebar from "@/components/sidebar/Sidebar";
import UserState from "@/context/userContext/UserState";
import { ToastContainer } from "react-toastify";



export const metadata: Metadata = {
  title: "Hotel Management",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 

{
 

  return (
    <html lang="en">
      <body className={`antialiased laptop:flex`}>
        <UserState>
        <ToastContainer />
        <Sidebar/>
        { children }
        </UserState>
      </body>
    </html>
  );
}
