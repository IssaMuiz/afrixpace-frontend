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
        <div className="grid lg:grid-rows-2 xl:grid-rows-3 mt-20">
          <div className="h-screen">
            <Sidebar />
          </div>
          <main className="flex-1 max-w-3xl p-4 mx-auto">{children}</main>
          <div className="h-screen">
            <AdvertBar />
          </div>
        </div>
      </body>
    </html>
  );
}
