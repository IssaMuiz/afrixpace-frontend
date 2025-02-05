import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import AdvertBar from "@/components/Advertbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adventurer app",
  description: "Share your adventure experience here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <Navbar />
        <div className="grid grid-rows-1 lg:grid-rows-[1fr_250px] xl:grid-rows-[250px_1fr_300px] gap-6 h-screen p-4">
          <Sidebar />

          <main className=" lg:mr-[250px] xl:mr-[300px]">{children}</main>
          <AdvertBar />
        </div>
      </body>
    </html>
  );
}
