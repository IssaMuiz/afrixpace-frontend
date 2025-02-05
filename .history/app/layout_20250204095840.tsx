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
        <div className="grid grid-rows-1 md:grid-rows-[3fr_1fr] lg:grid-rows-[1fr_3fr_1fr] gap-6 mt-20">
          <div className="h-screen">
            <Sidebar />
          </div>
          <main className="p-4 mx-auto">{children}</main>
          <div className="h-screen">
            <AdvertBar />
          </div>
        </div>
      </body>
    </html>
  );
}
