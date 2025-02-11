import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${inter.className} min-h-screen bg-gray-100 dark:bg-gray-900 antialiased`}
    >
      {children}
    </div>
  );
}
